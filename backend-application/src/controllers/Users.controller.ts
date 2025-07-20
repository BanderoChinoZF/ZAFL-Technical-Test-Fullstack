import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/Users';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      status,
      search,
    } = req.query as {
      page?: string;
      limit?: string;
      role?: string;
      status?: string;
      search?: string;
    };

    const query: any = {};

    if (role) {
      query.role = role;
    }
    if (status) {
      query.status = status;
    }
    if (search !== null && search !== undefined) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find(query)
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({
      results: users,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Usuario creado exitosamente', user: savedUser });

  } catch (error: any) {
    console.error('Error saving user:', error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        message: `El ${field} ya está registrado. Por favor, elige otro.`,
        field: field,
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: 'Error de validación', errors: messages });
    }

    res.status(500).json({ message: 'Error interno del servidor al guardar el usuario', error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Not Found User' });
    }
    //Return updated user object
    res.json({ message: 'Update User Correctly', user: updatedUser });

  } catch (error: any) {

    console.error('Error updating user:', error); 
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        message: `Property ${field} already exist. Please choose another one.`,
        field: field,
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: 'Error try to validation', errors: messages });
    }
    res.status(500).json({ message: 'Server Error try tu Update User Information', error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Not Found User' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser });

  } catch (error) {
    console.error('Error deleting user:', error);

    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ message: 'Server Error try to delete User Information', error: errorMessage });
  }
};