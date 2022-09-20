import mongoose, { Document, Schema } from "mongoose";

export interface ICommand {
    name: string;
    params: string;
    description: string;
}

export interface ICommandModel extends ICommand, Document {}

const CommandSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        params: { type: String, required: false },
        description: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ICommandModel>("Command", CommandSchema);
