import ChatService from "./service";
import { HttpError } from "../../config/error";
import { IChatModel } from "./model";
import { NextFunction, Request, Response } from "express";
import { IUserModel } from "../User/model";
import UserService from "../User/service";

/**
 * Finds a specific chat based on id.
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
    const chat: IChatModel = await ChatService.findOne(req.params.id, req.body.user);

    res.status(200).json(chat);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * Creates a new Chat between two or more users.
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function insert(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.insert(req.body.user);

    res.status(201).json(chat);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * Removes a chat on id.
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function deleteChat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.delete(req.params.id, req.body.user);

    res.status(200).json(chat);
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
export async function addChat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await ChatService.invite(
      req.body.chatid,
      req.body.userid,
      req.body.user
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
export async function handleInvite(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await ChatService.handleInvite(
      req.body.chatid,
      req.body.accept,
      req.body.user
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
export async function removeChat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await ChatService.remove(
      req.body.chatid,
      req.body.user
    );

    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
