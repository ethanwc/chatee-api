import UserService from "./service";
import { HttpError } from "../../config/error";
import { IUserModel } from "./model";
import { NextFunction, Request, Response } from "express";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await UserService.findOne(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await UserService.delete(req.body.user.email);

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function friendRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await UserService.friendRequest(
      req.body.user.email,
      req.body.potentialFriend
    );

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function handleFriend(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await UserService.handleFriend(
      req.body.user.email,
      req.body.potentialFriend,
      req.body.accept
    );

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function removeFriend(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await UserService.removeFriend(
      req.body.user.email,
      req.body.friend
    );

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await UserService.updateProfile(
      req.body.user.email,
      req.body.profile
    );

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
