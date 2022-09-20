import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import Logging from "../library/Logging";
import { ICommand } from "../models/Command";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    command: {
        create: Joi.object<ICommand>({
            name: Joi.string().required(),
            params: Joi.string(),
            description: Joi.string().required()
        }),
        update: Joi.object<ICommand>({
            name: Joi.string().required(),
            params: Joi.string(),
            description: Joi.string().required()
        })
    }
};
