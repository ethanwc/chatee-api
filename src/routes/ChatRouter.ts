import { Router } from "express";
import { ChatComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/chat
 *
 * @swagger
 * /v1/chat:
 *   get:
 *     description: Get all chats that a user is in
 *     tags: ["chat"]
 *     security:
 *      - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: An array of chats
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/chat'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get("/", ChatComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/chat
 *
 * @swagger
 * /v1/chat:
 *   post:
 *      description: Create new chat
 *      tags: ["chat"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: chat creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ChatSchema'
 *            example:
 *              members: ["test.user@mail.com", "stevejobs@apple.com"]
 *      responses:
 *        201:
 *          description: return created chat
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/ChatSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", ChatComponent.insert);

/**
 * GET method route
 * @example http://localhost:PORT/v1/chat/:id
 *
 * @swagger
 * /v1/chat/{id}:
 *  get:
 *    description: Get chat by chatId
 *    tags: ["chat"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique chatId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return chat by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/ChatSchema'
 */
router.get("/:id", ChatComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/chat/:id
 *
 * @swagger
 * /v1/chat/{id}:
 *  delete:
 *    description: Delete chat by chatId
 *    tags: ["chat"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique chatId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted chat
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/ChatSchema'
 */
router.delete("/:id", ChatComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
