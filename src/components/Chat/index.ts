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
