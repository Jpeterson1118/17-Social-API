import { Router } from 'express';

const router = Router();

import thoughtIdRoutes from './thoughtIdRoutes.js'

import { getThoughts, createThought, } from '../../controlers/thoughtController.js';

router.use('/:thoughtId', thoughtIdRoutes)

router
    .route('/')
    .get(getThoughts)
    .post(createThought);

export default router
