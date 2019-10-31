import { Router } from "express";
import { MessageComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/api/message
 * @swagger
 * /message:
 *  post:
 *    tags: ["message"]
 *    summary: "Create a new message"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json" 
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Message info to create a new message."
 *      required: true
 *      example:
 *        id: chatid_1233123
 *        type: message
 *        message: hi there.
 *        author: author_id_1233
 *    responses:
 *      201:
 *        description: Message successfully created.
 *        content:
 *          application/json:
 *            example:
 *              _id: messageid_1233
 *              type: message
 *              message: asdfg message
 *              author: authorid_1234
 *      400:
 *        description: Message creation failed.
 */
router.post("/", MessageComponent.create);

/**
 * PATCH method route
 * @example http://localhost:PORT/api/message
 * @swagger
 * /message:
 *  patch:
 *    tags: ["message"]
 *    summary: "Edit a message"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json" 
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Message info to modify a message."
 *      required: true
 *      example:
 *        id: messageid_12354
 *        message: bye there.
 *    responses:
 *      200:
 *        description: Message successfully modified.
 *        content:
 *          application/json:
 *            example:
 *              _id: messageid_12354
 *              type: message
 *              message: bye there.
 *              author: authorid_1234
 *      400:
 *        description: Message creation failed.
 */
router.patch("/", MessageComponent.edit);

/**
 * DELETE method route
 * @example http://localhost:PORT/api/message
 * @swagger
 * /message/{id}:
 *  delete:
 *    tags: ["message"]
 *    summary: "Delete a message by id"
 *    produces: 
 *    - "application/json" 
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      required: true
 *    responses:
 *      200:
 *        description: Message successfully removed.
 *        content:
 *          application/json:
 *            example:
 *              _id: messageid_12354
 *              type: message
 *              message: bye there.
 *              author: authorid_1234
 *      400:
 *        description: Failed to delete message.
 */
router.delete("/:id", MessageComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
