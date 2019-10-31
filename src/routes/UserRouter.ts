import { Router } from "express";
import { UserComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/api/users
 * @swagger
 * /users:
 *  post:
 *    tags: ["user"]
 *    summary: "Create a new user"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User info to create a new user."
 *      required: true
 *      example:
 *        name: superloser
 *        email: stevejobs@apple.com
 *    responses:
 *      201:
 *        description: User successfully created.
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
 *        description: User creation failed.
 */
router.post("/", UserComponent.create);

/**
 * GET method route
 * @example http://localhost:PORT/api/users
 * @swagger
 * /users/{id}:
 *  get:
 *    tags: ["user"]
 *    summary: "Get a user by id"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      required: true
 *    responses:
 *      200:
 *        description: User successfully found.
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
 *        description: Get user failed.
 */
router.get("/:id", UserComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/api/users
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags: ["user"]
 *    summary: "Delete a user by id"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      required: true
 *    responses:
 *      200:
 *        description: User successfully removed.
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
 *        description: Failed to delete user.
 */
router.delete("/:id", UserComponent.remove);

/**
 * POST method route
 * @example http://localhost:PORT/api/users/addFriend
 * @swagger
 * /users/addFriend:
 *  post:
 *    tags: ["user"]
 *    summary: "Add a friend"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User sends friend request to specified user."
 *      required: true
 *      example:
 *        id: userid_1234
 *        friendid: friendid_112345
 *    responses:
 *      200:
 *        description: Friend request sent.
 *      400:
 *        description: Friend request failed.
 */

router.post("/addFriend", UserComponent.addFriend);

/**
 * POST method route
 * @example http://localhost:PORT/api/users/handleFriend
 * @swagger
 * /users/handleFriend:
 *  post:
 *    tags: ["user"]
 *    summary: "Handle friend request"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Handle users response to friend request."
 *      required: true
 *      example:
 *        id: userid_1234
 *        friendid: friendid_112345
 *        accept: true
 *    responses:
 *      200:
 *        description: Handled request.
 *        content:
 *          application/json:
 *            example:
 *              _id: userid_1233
 *              email: stevejobs@apple.com
 *              chats: []
 *              chatRequests: []
 *              friends: ["friendid_112345"]
 *              friendRequests: []
 *              tokens: []
 * 
 *      400:
 *        description: Handling request failed.
 */

router.post("/handleFriend", UserComponent.handleFriend);


/**
 * POST method route
 * @example http://localhost:PORT/api/users/removeFriend
 * @swagger
 * /users/removeFriend:
 *  post:
 *    tags: ["user"]
 *    summary: "Remove a friend"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User sends request to server to remove a friend."
 *      required: true
 *      example:
 *        id: userid_1234
 *        friendid: friendid_112345
 *    responses:
 *      200:
 *        description: Friend removed.
 *      400:
 *        description: Friend removal failed.
 */

router.post("/removeFriend", UserComponent.removeFriend);

/**
 * POST method route
 * @example http://localhost:PORT/api/users/profile
 * @swagger
 * /users/profile:
 *  post:
 *    tags: ["user"]
 *    summary: "Modify the user's profile information."
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Update user profile info."
 *      required: true
 *      example:
 *        id: 5dba164e8f73153ba8930430 *
 *        profile:
 *          name: steve jobless
 *          location: Seattle, WA
 *          about: Harnessing the power of my grave!
 *          picture: cloudinary.com/jldkasjlkdwjklwda
 *    responses:
 *      200:
 *        description: User profile information successfully modified.
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
 *              profile: []
 *      400:
 *        description: Modifying profile failed.
 */
router.post("/profile", UserComponent.editProfile);

/**
 * @export {express.Router}
 */
export default router;
