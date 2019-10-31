import { Router } from "express";
import { ChatComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();


/**
 * POST method route
 * @example http://localhost:PORT/api/chat
 * @swagger
 * /chat:
 *  post:
 *    tags: ["chat"]
 *    summary: "Create a new chat"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json" 
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      required: true
 *      example:
 *        id: 1234809412
 *    responses:
 *      201:
 *        description: Chat successfully created.
 *        content:
 *          application/json:
 *            example:
 *              messages: []
 *              members: ["1234809412"]
 *              membersTyping: []
 *              _id: 1329038120938
 *      400:
 *        description: Chat creation failed.
 */
router.post("/", ChatComponent.insert);

/**
 * GET method route
 * @example http://localhost:PORT/api/chat
 * @swagger
 * /chat/{id}:
 *  get:
 *    tags: ["chat"]
 *    summary: "Get a chat by id"
 *    produces: 
 *    - "application/json" 
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      required: true
 *    responses:
 *      200:
 *        description: Chat successfully found.
 *        content:
 *          application/json:
 *            example:
 *              messages: ["123132", "132133", "1231233"]
 *              members: ["1234124", "41424142", "1442142"]
 *              membersTyping: ["1234124"]
 *              _id: 1329038120938
 *      400:
 *        description: Get chat failed.
 */
router.get("/:id", ChatComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/api/chat
 * @swagger
 * /chat/{id}:
 *  delete:
 *    tags: ["chat"]
 *    summary: "Delete a chat by id"
 *    produces: 
 *    - "application/json" 
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      required: true
 *    responses:
 *      200:
 *        description: Chat successfully removed.
 *        content:
 *          application/json:
 *            example:
 *              messages: ["123132", "132133", "1231233"]
 *              members: ["1234124", "41424142", "1442142"]
 *              membersTyping: ["1234124"]
 *              _id: 1329038120938
 *      400:
 *        description: Failed to delete chat.
 */
router.delete("/:id", ChatComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
