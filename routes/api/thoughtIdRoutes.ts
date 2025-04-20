import { Router } from "express";

const router = Router();

import reactionRoutes from "./reactionRoutes"

import { getOneThought, updateThought, headEmpty } from "../../controlers/thoughtController";

router.use('/reactions', reactionRoutes)

router
    .route('/')
    .get(getOneThought)
    .put(updateThought)
    .delete(headEmpty);

export default router