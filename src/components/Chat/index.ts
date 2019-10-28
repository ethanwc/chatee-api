import ChatService from "./service";
import { HttpError } from "../../config/error";
import { IChatModel } from "./model";
import { NextFunction, Request, Response } from "express";

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
    const chat: IChatModel = await ChatService.findOne(req.params.id);

    res.status(200).json(chat);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * Finds all Chats that a user is in.
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chats: IChatModel[] = await ChatService.findAll(req.body);

    res.status(200).json(chats);
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
    const chat: IChatModel = await ChatService.insert(req.body);

    res.status(200).json(chat);
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
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.remove(req.body);

    res.status(200).json(chat);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
