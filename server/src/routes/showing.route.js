
import { Router } from 'express';
import showingController from '../controllers/showing.controller.js';
import isAuthorized from '../middlewares/auth.js';

const router = Router();

// Request a showing
router.post('/', showingController.requestShowing);

// Get showings for a property (admin/agent only)
router.get('/property/:propertyId', isAuthorized, showingController.getShowingsByProperty);

// Update showing status (admin/agent only)
router.patch('/:showingId', isAuthorized, showingController.updateShowingStatus);

// Get showings for a user
router.get('/user', isAuthorized, showingController.getShowingsByUser);

export default router;
