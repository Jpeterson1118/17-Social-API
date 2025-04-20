import { Router } from "express";

const router = Router()

import { getOneUser,updateUser, deleteUser } from "../../controlers/userController.js";

import friendRoutes from "./friendRoutes.js";

router.use('/friends', friendRoutes);

router
    .route('/')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

export default router