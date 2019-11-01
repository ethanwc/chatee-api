import AuthService from "./service";
import HttpError from "../../config/error";
import { IUserModel } from "../User/model";
import { NextFunction, Request, Response } from "express";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.json({
      status: 201,
      logged: true,
      message: "User succesfully registered."
    });
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await AuthService.getUser(req.body);
   
    res.json({
      status: 200,
      logged: true,
      token: user.token,
      message: "Sign in successfull",
      id: user.id
    });
    //user id not passed here?

  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }

    res.json({
      status: 400,
      message: error.message
    });
  }
}
