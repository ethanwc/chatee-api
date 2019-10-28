import ChatService from "./service";
import { HttpError } from "../../config/error";
import { IChatModel } from "./model";
import { NextFunction, Request, Response } from "express";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function createChat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const chat: IChatModel = await ChatService.createChat(req.body);

    res.status(200).json(chat);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
