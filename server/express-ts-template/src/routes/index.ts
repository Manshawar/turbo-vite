import { Router } from "express";
import { uploadRouter } from "./modules/upload";
import { userRouter } from "./modules/user"
export const index = Router();
index.use("/user", userRouter);
index.use("/upload", uploadRouter)
