
import { Request, Response } from "express";

export class User {
  static async info(req: Request, res: Response): Promise<void> {

    res.json({
      resultCode: 200,
      message: "success",
      data: {
        role: ["admin"]
      }
    })
  }
}