import { Router } from "express";
import { ChatComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();


/**
 * GET method route
 * @example http://localhost:PORT/v1/chats/:chatid
 *
 * @swagger
 * /v1/chats/:chatid:
 *  get:
 *    description: Get chat info
 *    tags: ["chats"]
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned chat info
 *        content:
 *          application/json:
 *            example:
 *              messages: []
 *              completeMessages: []
 *              members: []
 *              membersTyping: []
 *              creator: "ethan"
 *              createdDate: "1-2-3"
 */
router.get("/:chatid", ChatComponent.getOne);


/**
 * POST method route
 * @example  http://localhost:PORT/v1/chats
 *
 * @swagger
 * /v1/chats:
 *  post:
 *    description: Create a new chat
 *    tags: ["chats"]
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned new chat
 *        content:
 *          application/json:
 *            example:
 *              messages: []
 *              members: ["jake@mail.com"]
 *              membersTyping: []
 *              _id: awlkjdaolkwdjawio9du90
 *              creator: jake@mail.com
 *              createdDate: 2019-11-02T00:23:12.000Z
 */


router.post("/", ChatComponent.create);
/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/chats
 *
 * @swagger
 * /v1/chats/:
 *  delete:
 *    description: Delete chat
 *    tags: ["chats"]
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned new chat
 *        content:
 *          application/json:
 *            example:
 *              messages: []
 *              members: ["jake@mail.com"]
 *              membersTyping: []
 *              _id: awlkjdaolkwdjawio9du90
 *              creator: jake@mail.com
 *              createdDate: 2019-11-02T00:23:12.000Z
 */

router.delete("/", ChatComponent.deleteChat);

/**
 * POST method route
 * @example  http://localhost:PORT/v1/chats/invite
 *
 * @swagger
 * /v1/chats/invite:
 *  post:
 *    description: Invite a member to a chat
 *    tags: ["chats"]
 *    requestBody:
 *      description: Chat invite body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChatSchema'
 *          example:
 *            newuser: stevejobs@apple.com
 *            chatid: chatabcd
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: User invited to chat
 */
router.post("/invite", ChatComponent.invite);

/**
 * POST method route
 * @example  http://localhost:PORT/v1/chats/handleInvite
 *
 * @swagger
 * /v1/chats/handleInvite:
 *  post:
 *    description: Handle response to chat invite
 *    tags: ["chats"]
 *    requestBody:
 *      description: Chat invite request body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChatSchema'
 *          example:
 *            accept: true
 *            chatid: 1234chatabcd
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned updated user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSchema'
 *            example:
 *              chats: ["1234chatabcd"]
 *              chatRequests: []
 *              friends: []
 *              incomingFriendRequests: []
 *              outgoingFriendRequests: ["jake@mail.com"]
 *              email: example@mail.com
 *              profile: []
 */

router.post("/handleInvite", ChatComponent.handleInvite);

/**
 * POST method route
 * @example  http://localhost:PORT/v1/chats/remove
 *
 * @swagger
 * /v1/chats/remove:
 *  post:
 *    description: Remove a member from a chat
 *    tags: ["chats"]
 *    requestBody:
 *      description: Chat remove body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChatSchema'
 *          example:
 *            removeuser: stevejobs@apple.com
 *            chatid: chatabcd
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: User removed from chat
 */
router.post("/remove", ChatComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
