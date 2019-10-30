import { Router } from "express";
import { ChatComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

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
 *            example:
 *              members: ["test.user@mail"]
 *      responses:
 *        201:
 *          description: return created chat
 *          content:
 *            application/json:
 *              example:
 *                  status: 201
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
