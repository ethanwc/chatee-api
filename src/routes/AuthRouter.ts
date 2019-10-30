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
 *    tags: ["auth"]
 *    summary: "Sign up a user"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json" 
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User info required to create an account."
 *      required: true
 *      example:
 *        email: stevejobs@apple.com
 *        password: ilovemicrosoft
 *    responses:
 *      201:
 *        description: User succesfully registered.
 *        userid: 1234
 *        token: jadw9d0aw8d9a8d0ajdo2kjalkjsd
 *        logged: true
 *      400:
 *        description: Sign up failed, email already associated with an account.
 */
router.post("/signup", AuthComponent.signup);

/**
 * POST method route
 * @example http://localhost:PORT/login
 * @swagger
 * /auth/login/:
 *  post:
 *    tags: ["auth"]
 *    summary: "Sign in a user"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json" 
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User info required to create an account."
 *      required: true
 *      example:
 *        email: stevejobs@apple.com
 *        password: ilovemicrosoft
 *    responses:
 *      200:
 *        description: User succesfully signed in.
 *        userid: 1234
 *        token: jadw9d0aw8d9a8d0ajdo2kjalkjsd
 *        logged: true
 *      400:
 *        description: Invalid email or password.
 */
router.post("/login", AuthComponent.login);

/**
 * @export {express.Router}
 */
export default router;
