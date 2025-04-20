import { Thought, User } from "../models/index.js";
import { Request, Response } from "express";

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

export const getThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__V');

        if (!thought) {
            res.status(404).json({ message: 'Head empty, thought not found' })
        };

        res.json(thought);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);

        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id} },
            { new: true }
        );

        if(!user) {
            return res.status(404).json({ message: "I've heard of a thinker without a thought, but never a thought without a thinker..." });
        };

        res.json('Thought had');
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    }
};

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { runValidators: true, new: true },
        );

        if (!thought) {
            res.status(404).json({ message: 'Head empty, thought not found.' });
        };

        res.json(thought);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
};

export const headEmpty = async (req: Request, res: Response) => {
    try {
        const thought = Thought.findOneAndDelete({ _id: req.params.thoughtId});

        if(!thought) {
            return res.status(404).json({ message: 'Head empty, no thought found.' });
        };

        res.json({ message: 'Thought deleted'});
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    };
}