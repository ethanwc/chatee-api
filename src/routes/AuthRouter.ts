import { AuthComponent } from "../components";
import { Router } from "express";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/signup
 * @swagger
 * /auth/signup/:
 *  post:
 *    description: Sign up user for the application
 *    tags: ["auth"]
 *    requestBody:
 *      description: Sign up body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *            password: test_test
 *    responses:
 *      200:
 *        description: User has been signed up
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *              message: Sign up successfull
 *      400:
 *        description: Sign up failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: Email already exists
 */
router.post("/signup", AuthComponent.signup);

/**
 * POST method route
 * @example http://localhost:PORT/login
 *
 * @swagger
 * /auth/login/:
 *  post:
 *    description: Login user to the application
 *    tags: ["auth"]
 *    requestBody:
 *      description: login body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *            password: test_test
 *    responses:
 *      200:
 *        description: User has been logged in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *              message: Login successfull
 *      401:
 *        description: Not logged, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid credentials
 */
router.post("/login", AuthComponent.login);

/**
 * @export {express.Router}
 */
export default router;
