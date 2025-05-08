import { User } from "../models/index.js";
import { Request, Response } from "express";

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        res.json(user);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
};

export const betrayal = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        res.json(user);
        return;
    } catch (err){
        console.error(err);
        res.status(500).json(err);
        return;
    };
};