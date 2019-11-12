import ChatService from "./service";
import { HttpError } from "../../config/error";
import { IChatModel } from "./model";
import { NextFunction, Request, Response } from "express";
import { IUserModel } from "../User/model";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function getInfo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chats: IChatModel[] = await ChatService.getAllChatsInfo(
      req.body.user.email,
    );

    res.status(200).json(chats);
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
export async function getOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.getChat(
      req.body.user.email,
      req.params.chatid
    );

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
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.create(req.body.user.email);

    res.status(201).json(chat);
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
export async function deleteChat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.deleteChat(
      req.body.user.email,
      req.body.chatid
    );

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
export async function invite(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await ChatService.invite(
      req.body.user.email,
      req.body.newuser,
      req.body.chatid
    );

    res.status(200).json({});
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < IUserModel >}
 */
export async function handleInvite(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await ChatService.handleInvite(
      req.body.user.email,
      req.body.chatid,
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
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.removeUser(
      req.body.user.email,
      req.body.removeuser,
      req.body.chatid
    );

    res.status(200).json(chat);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
