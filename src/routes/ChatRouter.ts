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
router.delete("/:id", ChatComponent.removeChat);

/**
 * POST method route
 * @example http://localhost:PORT/api/chat/addChat
 * @swagger
 * /chat/addChat:
 *  post:
 *    tags: ["chat"]
 *    summary: "Add user to a chat"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User and chat info to add user to chat."
 *      required: true
 *      example:
 *        userid: 5dba164e8f73153ba8930430
 *        chatid: 5dba16978f73153ba8930431
 *    responses:
 *      200:
 *        description: User successfully added to new chat.
 *        content:
 *          application/json:
 *            example:
 *              _id: userid_1233
 *              email: stevejobs@apple.com
 *              chats: ["5dba16978f73153ba8930431"]
 *              chatRequests: []
 *              friends: []
 *              friendRequests: []
 *              tokens: []
 *      400:
 *        description: Adding failed.
 */
router.post("/invite", ChatComponent.addChat);

/**
 * POST method route
 * @example http://localhost:PORT/api/chat/handleInvite
 * @swagger
 * /chat/handleInvite:
 *  post:
 *    tags: ["chat"]
 *    summary: "Handle an invite to a chat"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Handles an invite to a chat."
 *      required: true
 *      example:
 *        userid: 5dba164e8f73153ba8930430
 *        chatid: 5dba16978f73153ba8930431
 *        accept: true
 *        
 *    responses:
 *      200:
 *        description: User decision successfully handled.
 *        content:
 *          application/json:
 *            example:
 *              _id: userid_1233
 *              email: stevejobs@apple.com
 *              chats: ["5dba16978f73153ba8930431"]
 *              chatRequests: []
 *              friends: []
 *              friendRequests: []
 *              tokens: []
 *      400:
 *        description: Handling failed.
 */
router.post("handleInvite", ChatComponent.handleInvite);

/**
 * POST method route
 * @example http://localhost:PORT/api/chat/removeChat
 * @swagger
 * /chat/removeChat:
 *  post:
 *    tags: ["chat"]
 *    summary: "Remove user from a chat"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User and chat info to remove user from chat."
 *      required: true
 *      example:
 *        userid: 5dba164e8f73153ba8930430
 *        chatid: 5dba16978f73153ba8930431
 *    responses:
 *      200:
 *        description: User successfully removed from chat.
 *        content:
 *          application/json:
 *            example:
 *              _id: userid_1233
 *              email: stevejobs@apple.com
 *              chats: []
 *              chatRequests: []
 *              friends: []
 *              friendRequests: []
 *              tokens: []
 *      400:
 *        description: Removing failed.
 */
router.post("/remove", ChatComponent.removeChat);

/**
 * @export {express.Router}
 */
export default router;
