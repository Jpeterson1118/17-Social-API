import { Router } from 'express';

const router = Router();

import { getThoughts, createThought, getOneThought, updateThought, headEmpty } from '../../controlers/thoughtController.js';

import { createReaction, deleteReaction } from "../../controlers/reactionController.js";

router
    .route('/')
    .get(getThoughts)
    .post(createThought);

router
    .route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(headEmpty);

router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

export default router
