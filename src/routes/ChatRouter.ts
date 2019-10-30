import { Router } from "express";
import { ChatComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();


router.post("/", ChatComponent.insert);


router.get("/:id", ChatComponent.findOne);


router.delete("/:id", ChatComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
