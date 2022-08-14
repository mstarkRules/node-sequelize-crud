import express from "express";
import UserController from "./controllers/UserController";

const router = express.Router();

router.post("/users", UserController.create);

router.get("/users", UserController.findAll);

router.get("/users/:userID", UserController.findOne);

router.put("/users/:userID", UserController.update);

router.delete("/users/:userID", UserController.delete);

export { router };
