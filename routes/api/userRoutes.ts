import { Router } from "express";

const router = Router();

import { getAllUsers, createUser } from "../../controlers/userController.js";

import userIdRoutes from "./userIdRoutes.js"

router.use('/:uerId', userIdRoutes)

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

export default router;