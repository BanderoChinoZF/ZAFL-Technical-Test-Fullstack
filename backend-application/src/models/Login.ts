import { Schema, model, Document } from 'mongoose';

export interface ILogin extends Document {
    username: string;
    password: string; // hashed password
}

const LoginSchema = new Schema<ILogin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // store hashed password
});

export default model<ILogin>('Login', LoginSchema);