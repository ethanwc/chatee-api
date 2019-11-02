import MessageService from "./service";
import { HttpError } from "../../config/error";
import { NextFunction, Request, Response } from "express";
import { IMessageModel } from "./model";

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
    const message: IMessageModel = await MessageService.create(
      req.body.user.email,
      req.body.message,
      req.body.chatid
    );

    res.status(201).json(message);
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
export async function edit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const message: IMessageModel = await MessageService.edit(
        req.body.user.email,
        req.body.messageid,
        req.body.message,
      );
  
      res.status(200).json(message);
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
export async function deleteMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const message: IMessageModel = await MessageService.deleteMessage(
        req.body.user.email,
        req.body.messageid,
        req.body.chatid
      );
  
      res.status(200).json(message);
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }
  