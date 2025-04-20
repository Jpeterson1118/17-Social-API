import { Router } from "express";

const router = Router();

import { addFriend, betrayal } from "../../controlers/friendController.js";

router
    .route('/:friendId')
    .post(addFriend)
    .delete(betrayal);

export default router