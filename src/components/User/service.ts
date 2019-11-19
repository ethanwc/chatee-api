import * as Joi from "joi";
import UserModel, { IUserModel } from "./model";
import UserValidation from "./validation";
import { IUserService } from "./interface";
import { Types } from "mongoose";

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * @param {string} user
   * @returns {Promise < IUserModel >[]}
   * @memberof UserService
   */
  async findAll(user: string): Promise<IUserModel[]> {
    try {
      //return all users
      //filter most information for security, semi-public route
      return await UserModel.find().select("-password -_id");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  /**
   * @param {string} user
   * @param {string} userid
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async findOne(user: string, userid: string): Promise<IUserModel> {
    try {
      //return the requested user
      //filter most information for security, semi-public route

      const validate: Joi.ValidationResult<{
        userid: string;
      }> = UserValidation.userid({
        userid
      });

      if (validate.error) throw new Error(validate.error.message);

      let res: IUserModel = await UserModel.findOne({
        email: userid
      });

      if (res) {
        if (user === userid)
          return await UserModel.findOne({
            email: userid
          }).select("-password -_id");
        else
          return await UserModel.findOne({
            email: userid
          }).select(
            "-password -_id -chats -chatRequests -incomingFriendRequests -outgoingFriendRequests"
          );
      } else throw new Error("User does not exist");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async delete(user: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
      }> = UserValidation.user({
        user
      });

      if (validate.error) throw new Error(validate.error.message);

      //delete user and return them
      return await UserModel.findOneAndDelete({
        email: user
      }).select("-password -_id");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} potentialFriend
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async friendRequest(
    user: string,
    potentialFriend: string
  ): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        potentialFriend: string;
      }> = UserValidation.friend({
        user,
        potentialFriend
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks:
      //potentialFriend is a valid user
      //potentialFriend is not already friends

      let friend: IUserModel = await UserModel.findOne({
        email: potentialFriend
      });

      if (friend && !friend.friends.includes(user)) {
        //friend sets incoming
        await UserModel.findOneAndUpdate(
          { email: potentialFriend },
          { $addToSet: { incomingFriendRequests: user } }
        );
        //user sets outgoing
        await UserModel.findOneAndUpdate(
          { email: user },
          { $addToSet: { outgoingFriendRequests: potentialFriend } }
        );

        //todo: pushy to potential friend

        //return user
        return await UserModel.findOne({
          email: user
        }).select("-password -_id");
      } else throw new Error("Friend request server error.");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} potentialFriend
   * @param {boolean} accept
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async handleFriend(
    user: string,
    potentialFriend: string,
    accept: boolean
  ): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        potentialFriend: string;
        accept: boolean;
      }> = UserValidation.handleFriend({
        user,
        potentialFriend,
        accept
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks:
      //potentialFriend is real
      //user has a friend request from potentialFriend

      let friend: IUserModel = await UserModel.findOne({
        email: potentialFriend
      });

      if (friend && friend.outgoingFriendRequests.includes(user)) {
        //friend removes user from outgoing requests
        await UserModel.findOneAndUpdate(
          { email: potentialFriend },
          { $pull: { outgoingFriendRequests: user } }
        );
        //user removes friend from incoming requests
        await UserModel.findOneAndUpdate(
          { email: user },
          { $pull: { incomingFriendRequests: potentialFriend } }
        );

        //accept
        if (accept) {
          //friend adds user to friends
          await UserModel.findOneAndUpdate(
            { email: potentialFriend },
            { $addToSet: { friends: user } }
          );
          //user adds friend to friends
          await UserModel.findOneAndUpdate(
            { email: user },
            { $addToSet: { friends: potentialFriend } }
          );
        }

        //decline
        //do nothing

        //todo: pushy to notify of friend accept

        //return user
        return await UserModel.findOne({
          email: user
        }).select("-password -_id");
      } else throw new Error("Friend handle server error.");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} potentialFriend
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async removeFriend(
    user: string,
    potentialFriend: string
  ): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        potentialFriend: string;
      }> = UserValidation.friend({
        user,
        potentialFriend
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks:
      //potentialFriend is real

      let friend: IUserModel = await UserModel.findOne({
        email: potentialFriend
      });

      if (friend && friend.friends.includes(user)) {
        //friend removes user from friends
        await UserModel.findOneAndUpdate(
          { email: potentialFriend },
          { $pull: { friends: user } }
        );
        //user removes friend from friends
        await UserModel.findOneAndUpdate(
          { email: user },
          { $pull: { friends: potentialFriend } }
        );

        //todo: pushy to notify of friend removal... best feature ever

        //return user
        return await UserModel.findOne({
          email: user
        }).select("-password -_id");
      } else throw new Error("Friend removal server error.");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {JSON} profile
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async updateProfile(user: string, profile: JSON): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
      }> = UserValidation.user({
        user
      });

      if (validate.error) throw new Error(validate.error.message);

      //neccesary checks:
      //none???

      //update user profile information
      await UserModel.findOneAndUpdate(
        { email: user },
        { $set: { profile: profile } }
      );

      //return user
      return await UserModel.findOne({
        email: user
      }).select("-password -_id");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} user
   * @param {string} device
   * @returns {Promise < IUserModel >}
   * @memberof UserService
   */
  async device(user: string, device: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<{
        user: string;
        device: string;
      }> = UserValidation.device({
        user,
        device
      });

      if (validate.error) throw new Error(validate.error.message);

      return await UserModel.findOneAndUpdate(
        { email: user },
        { $set: { token: device } }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default UserService;
