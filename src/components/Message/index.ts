import MessageService from "./service";
import { HttpError } from "../../config/error";
import { IMessageModel } from "./model";
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
      const user: IMessageModel = await MessageService.insert(req.body);
  
      res.status(201).json(user);
    } catch (error) {
      next(new HttpError(error.message.status, error.message));
    }
  }