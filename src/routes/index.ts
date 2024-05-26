import { Router } from "express";
import userRouter from "./userRoutes";
import bookRouter from "./bookRoutes";
import saleRouter from "./saleRouter";

const router = Router()

router.use(userRouter)
router.use(bookRouter)
router.use(saleRouter)

export default router;