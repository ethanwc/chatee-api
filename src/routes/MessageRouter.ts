import { Router } from "express";
import { MessageComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post("/", MessageComponent.create);


router.patch("/", MessageComponent.edit);

router.delete("/:id", MessageComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
