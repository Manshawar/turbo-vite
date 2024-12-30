
import { Router } from "express";
import { User } from "../../controllers/user";
const userRouter = Router();
userRouter.get("/userInfo", User.info)
export { userRouter }