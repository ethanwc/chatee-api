import { Router } from "express";
import { MessageComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/messages
 * @swagger
 * /v1/messages/:
 *  post:
 *    description: Create a new message
 *    tags: ["messages"]
 *    requestBody:
 *      description: Message body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MessageSchema'
 *          example:
 *            message:
 *              type: text
 *              message: asdf hi 
 *            chatid: 1234chatid
 *    responses:
 *      200:
 *        description: Message created
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              _id: messageid1234
 *              author: steve@apple.com
 *              type: text
 *              message: asdf hi
 *              createdDate: 2019-11-02T02:22:25.000Z
 *              editDate: 2019-11-02T02:22:25.000Z
 */
router.post("/", MessageComponent.create);

/**
 * PATCH method route
 * @example http://localhost:PORT/messages
 * @swagger
 * /v1/messages/:
 *  patch:
 *    description: Edit a message
 *    tags: ["messages"]
 *    requestBody:
 *      description: Message body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MessageSchema'
 *          example:
 *            message:
 *              type: text
 *              message: asdf hi 
 *            messageid: messageid1234
 *    responses:
 *      200:
 *        description: Message modified
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              _id: messageid1234
 *              author: steve@apple.com
 *              type: text
 *              message: asdf hi
 *              createdDate: 2019-11-02T02:22:25.000Z
 *              editDate: 2019-11-02T02:22:25.000Z
 */
router.patch("/", MessageComponent.edit);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/messages/:id
 *
 * @swagger
 * /v1/messages/{id}:
 *  delete:
 *    description: Delete a message
 *    tags: ["messages"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique messageid
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Message modified
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              _id: messageid1234
 *              author: steve@apple.com
 *              type: text
 *              message: asdf hi
 *              createdDate: 2019-11-02T02:22:25.000Z
 *              editDate: 2019-11-02T02:22:25.000Z
 */
router.delete("/", MessageComponent.deleteMessage);

/**
 * @export {express.Router}
 */
export default router;
