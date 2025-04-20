import { Thought, User } from "../models/index.js";
import { Request, Response } from 'express';

export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: { reactions: req.body } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(403).json({ message: 'Head empty, thought not found.' });
        };

        res.json(thought);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
};

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            {runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'Head empty, thought not found' });
        };

        res.json(thought);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
        return;
    };
};