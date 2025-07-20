import { Schema, model, Document } from 'mongoose';

export interface IUsers extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string; //Optional
  role: 'Admin' | 'User';
  status: 'Active' | 'Inactive';
  address: {
    street: string;
    number: string;
    city: string;
    postalCode: string;
  };
  profilePicture?: string; //Optional
}

const UsersSchema = new Schema<IUsers>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, usa un correo electrónico válido.'],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    required: true,
    default: 'User',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
    default: 'Active',
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  profilePicture: {
    type: String,
    trim: true,
  }
});

//Export the model
const Users = model<IUsers>('Users', UsersSchema);

export default Users;