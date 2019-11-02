import { Router } from "express";
import { UserComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/users/:id
 *
 * @swagger
 * /v1/users/{id}:
 *  get:
 *    description: Get user by userId
 *    tags: ["users"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Returned user
 *        content:
 *          application/json:
 *            example:
 *              friends: ["steve@mail.com"]
 *              email: jake123@mail.com
 *              profile: [profileData]
 */
router.get("/:id", UserComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/users/:id
 *
 * @swagger
 * /v1/users/:
 *  delete:
 *    description: Delete user
 *    tags: ["users"]
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned deleted user
 *        content:
 *          application/json:
 *            example:
 *              chats: []
 *              chatRequests: []
 *              friends: []
 *              incomingFriendRequests: []
 *              outgoingFriendRequests: []
 *              email: example@mail.com
 *              profile: []
 */

router.delete("/", UserComponent.deleteUser);

/**
 * POST method route
 * @example  http://localhost:PORT/v1/users/friendRequest
 *
 * @swagger
 * /v1/users/friendRequest:
 *  post:
 *    description: Send a friend request to another user
 *    tags: ["users"]
 *    requestBody:
 *      description: Friend request body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            potentialFriend: jake@mail.com
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned updated user
 *        content:
 *          application/json:
 *            example:
 *              chats: []
 *              chatRequests: []
 *              friends: []
 *              incomingFriendRequests: []
 *              outgoingFriendRequests: ["jake@mail.com"]
 *              email: example@mail.com
 *              profile: []
 */
router.post("/friendRequest", UserComponent.friendRequest);

/**
 * POST method route
 * @example  http://localhost:PORT/v1/users/handleFriend
 *
 * @swagger
 * /v1/users/handleFriend:
 *  post:
 *    description: Handle a friend request from another user
 *    tags: ["users"]
 *    requestBody:
 *      description: Handle friend request body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            potentialFriend: example@mail.com
 *            accept: true
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned updated user
 *        content:
 *          application/json:
 *            example:
 *              chats: []
 *              chatRequests: []
 *              friends: ["example@mail.com"]
 *              incomingFriendRequests: []
 *              outgoingFriendRequests: []
 *              email: steve@mail.com
 *              profile: []
 */
router.post("/handleFriend", UserComponent.handleFriend);

/**
 * POST method route
 * @example  http://localhost:PORT/v1/users/removeFriend
 *
 * @swagger
 * /v1/users/removeFriend:
 *  post:
 *    description: Handle removing a friend
 *    tags: ["users"]
 *    requestBody:
 *      description: Remove friend request body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            friend:  example@mail.com
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Returned updated user
 *        content:
 *          application/json:
 *            example:
 *              chats: []
 *              chatRequests: []
 *              friends: []
 *              incomingFriendRequests: []
 *              outgoingFriendRequests: []
 *              email: steve@mail.com
 *              profile: []
 */
router.post("/removeFriend", UserComponent.removeFriend);

/**
 * POST method route
 * @example  http://localhost:PORT/v1/users/updateProfile
 *
 * @swagger
 * /v1/users/updateProfile:
 *  post:
 *    description: Handle updating a profile
 *    tags: ["users"]
 *    requestBody:
 *      description: Update profile request body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            profile:  ["profileData"]
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: Updated user
 *        content:
 *          application/json:
 *            example:
 *              chats: []
 *              chatRequests: []
 *              friends: []
 *              incomingFriendRequests: []
 *              outgoingFriendRequests: []
 *              email: steve@mail.com
 *              profile: ["new and exciting"]
 */
router.patch("/updateProfile", UserComponent.updateProfile);

/**
 * @export {express.Router}
 */
export default router;
