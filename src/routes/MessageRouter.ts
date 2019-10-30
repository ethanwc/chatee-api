import { Router } from "express";
import { MessageComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/v1/message
 *
 * @swagger
 * /v1/message:
 *   post:
 *      description: Create new message
 *      tags: ["message"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: message creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageSchema'
 *            example:
 *              type: "msg"
 *              message: "test123"
 *              author: "author_id"
 *      responses:
 *        201:
 *          description: returns created message
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/MessageSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", MessageComponent.create);

/**
 *  PATCH method route
 * @example http://localhost:PORT/v1/message
 *
 * @swagger
 * /v1/message:
 *   patch:
 *      description: Edit existing message
 *      tags: ["message"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: message creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageSchema'
 *            example:
 *              messageid: "12345678"
 *              type: "msg"
 *              message: "test123"
 *              author: "author_id"
 *      responses:
 *        200:
 *          description: returns modified message
 *          content:
 *            application/json:
 *              example:
 *                status: 20
 *                logged: true
 *                message: Message edited!
 *
 *
 */
// router.patch("/", MessageComponent.edit);

/**
 * DELETE method route
 * @example http://localhost:PORT/v1/message/:id
 *
 * @swagger
 * /v1/message/{id}:
 *   delete:
 *      description: Delete a message
 *      tags: ["message"]
 *      security:
 *       - ApiKeyAuth: []
 *   parameters:
 *      - in: path
 *        name: id
 *        description: the unique chatId
 *        required: true
 *        schema:
 *          type: string
 *   responses:
 *      200:
 *        description: returns deleted message
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/MessageSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
// router.delete("/", MessageComponent.remove);
