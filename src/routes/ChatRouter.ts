import { Router } from "express";
import { ChatComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post("/", ChatComponent.create);

/**
 * @export {express.Router}
 */
export default router;
