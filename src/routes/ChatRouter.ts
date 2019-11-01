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
 *    responses:
 *      201:
 *        description: Chat successfully created.
 *        content:
 *          application/json:
 *            example:
 *              messages: []
 *              members: ["stevejobs@apple.com"]
 *              creator: stevejobs@apple.com
 *              membersTyping: []
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
 *              members: ["stevejobs@apple.com"]
 *              creator: stevejobs@apple.com
 *              membersTyping: ["stevejobs@apple.com"]
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
 *              members: ["stevejobs@apple.com", "billnye@science.net"]
 *              creator: stevejobs@apple.com
 *              membersTyping: ["stevejobs@apple.com"]
 *              _id: 1329038120938
 *      400:
 *        description: Failed to delete chat.
 */
router.delete("/:id", ChatComponent.removeChat);

/**
 * POST method route
 * @example http://localhost:PORT/api/chat/invite
 * @swagger
 * /chat/invite:
 *  post:
 *    tags: ["chat"]
 *    summary: "Invite user to a chat"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User and chat info to invite user to chat."
 *      required: true
 *      example:
 *        userid: "jake123@mail.com"
 *        chatid: 5dba16978f73153ba8930431
 *    responses:
 *      200:
 *        description: User successfully invited to new chat.
 *      400:
 *        description: Inviting failed.
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
 *        chatid: 5dba16978f73153ba8930431
 *        accept: true
 *        
 *    responses:
 *      200:
 *        description: User decision successfully handled.
 *        content:
 *          application/json:
 *            example:
 *              email: stevejobs@apple.com
 *              chats: ["5dba16978f73153ba8930431"]
 *              chatRequests: []
 *              friends: []
 *              friendRequests: []
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
 *        chatid: 5dba16978f73153ba8930431
 *    responses:
 *      200:
 *        description: User successfully removed from chat.
 *        content:
 *          application/json:
 *            example:
 *              email: stevejobs@apple.com
 *              chats: []
 *              chatRequests: []
 *              friends: []
 *              friendRequests: []
 *      400:
 *        description: Removing failed.
 */
router.post("/remove", ChatComponent.removeChat);

/**
 * @export {express.Router}
 */
export default router;
