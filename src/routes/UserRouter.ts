import { Router } from "express";
import { UserComponent } from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post("/", UserComponent.create);

router.get("/:id", UserComponent.findOne);

router.delete("/:id", UserComponent.remove);

router.post("/addChat", UserComponent.addChat);

router.post("/removeChat", UserComponent.removeChat);


/**
 * @export {express.Router}
 */
export default router;
