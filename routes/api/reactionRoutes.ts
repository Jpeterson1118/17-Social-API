import { Router } from "express";

const router = Router();

import { createReaction, deleteReaction } from "../../controlers/reactionController.js";

router 
    .route('/')
    .post(createReaction)
    .delete(deleteReaction);

export default router;
