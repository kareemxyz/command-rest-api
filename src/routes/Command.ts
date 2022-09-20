import express from "express";
import controller from "../controllers/Command";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/create", ValidateSchema(Schemas.command.create), controller.createCommand);
router.get("/get/:commandId", controller.readCommand);
router.get("/get/", controller.readAll);
router.patch("/update/:commandId", ValidateSchema(Schemas.command.update), controller.updateCommand);
router.delete("/delete/:commandId", controller.deleteCommand);

export = router;
