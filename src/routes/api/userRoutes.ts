import { Router } from "express";

const router = Router();

import { getAllUsers, createUser, getOneUser, updateUser, deleteUser } from "../../controlers/userController.js";

import { addFriend, betrayal } from "../../controlers/friendController.js";

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(betrayal);

export default router;