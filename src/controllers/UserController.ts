import { Request, Response } from "express";
import { UserModel } from "../database/models/UserModel";
const createError = require("http-errors");

class UserController {
  //return all users
  async findAll(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();

      if (!(users.length > 0)) throw createError(204, "No content!!");

      return res.status(200).json(users);
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }

  //return an user by id
  async findOne(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserModel.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) throw createError(404, `User not found`);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }

  //creates an user
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

  //updates an user by id
  async update(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      //updates user
      await UserModel.update(req.body, {
        where: {
          id: userId,
        },
      });

      //returns the edited user
      const user = await UserModel.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) throw createError(404, `User not found`);

      return res.status(200).send(user);
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }

  //removes an user by id
  async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const deleted = await UserModel.destroy({
        where: {
          id: userId,
        },
      });

      if (!(deleted > 0)) throw createError(404, "User not found!!");
      return res.status(204).send();
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }
}

export default new UserController();
