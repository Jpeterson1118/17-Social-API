import { User, Thought } from "../models/index.js";
import { Request, Response } from "express";

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        res.json(user);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
            new: true
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        };

        res.json(user);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        await Thought.deleteMany({ _id: { $in: user.thoughts } });

        res.json({ message: 'User and associated thoughts deleted!' });
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
};