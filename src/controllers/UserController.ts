import { Request, Response } from "express";
import { UserModel } from "../database/models/UserModel";
const createError = require("http-errors");

class UserController {
  async findAll(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();

      return users.length > 0
        ? res.status(200).json(users)
        : res.status(204).send();
    } catch (error) {}
  }

  async findOne(req: Request, res: Response) {
    try {
      const { userID } = req.params;
      const user = await UserModel.findOne({
        where: {
          id: userID,
        },
      });

      if (!user) throw createError(404, `User not found`);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }

  async create(req: Request, res: Response) {
    const { email, name, age } = req.body;

    try {
      const user = await UserModel.create({
        email,
        name,
        age,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}

export default new UserController();
