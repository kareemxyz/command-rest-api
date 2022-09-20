import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Command from "../models/Command";

const createCommand = (req: Request, res: Response, next: NextFunction) => {
    const { name, params, description } = req.body;

    const command = new Command({
        _id: new mongoose.Types.ObjectId(),
        name,
        params,
        description
    });

    return command
        .save()
        .then((command) => res.status(201).json({ command }))
        .catch((error) => res.status(500).json({ error }));
};
const readCommand = (req: Request, res: Response, next: NextFunction) => {
    const commandId = req.params.commandId;

    return Command.findById(commandId)
        .then((command) => (command ? res.status(200).json({ command }) : res.status(404).json({ message: "Not Found" })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Command.find()
        .then((commands) => res.status(200).json({ commands }))
        .catch((error) => res.status(500).json({ error }));
};
const updateCommand = (req: Request, res: Response, next: NextFunction) => {
    const commandId = req.params.commandId;

    return Command.findById(commandId)
        .then((command) => {
            if (command) {
                command.set(req.body);

                return command
                    .save()
                    .then((command) => res.status(201).json({ command }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: "Not Found" });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteCommand = (req: Request, res: Response, next: NextFunction) => {
    const commandId = req.params.commandId;
    return Command.findByIdAndDelete(commandId)
        .then((command) => (command ? res.status(201).json({ message: "Successfully Deleted" }) : res.status(404).json({ message: "Not Found" })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCommand, readCommand, readAll, updateCommand, deleteCommand };
