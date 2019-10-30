import { Router } from "express";
import { UserComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post("/", UserComponent.create);

router.get("/:id", UserComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/users/:id
 *
 * @swagger
 * /v1/users/{id}:
 *  delete:
 *    description: Delete user by userId
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
 *        description: return deleted user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.delete("/:id", UserComponent.remove);

router.post("/addChat", UserComponent.addChat);

router.post("/removeChat", UserComponent.removeChat);

//todo: friend reqs -> accept/decline
//todo: setProfileInfo xyz {}

/**
 * @export {express.Router}
 */
export default router;
