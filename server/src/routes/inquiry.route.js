
import { Router } from 'express';
import inquiryController from '../controllers/inquiry.controller.js';
import isAuthorized from '../middlewares/auth.js';

const router = Router();

// Send an inquiry
router.post('/', inquiryController.sendInquiry);

// Get inquiries for a property (admin/agent only)
router.get('/property/:propertyId', isAuthorized, inquiryController.getInquiriesByProperty);

// Respond to an inquiry (admin/agent only)
router.patch('/:inquiryId/respond', isAuthorized, inquiryController.respondToInquiry);

// Get inquiries for a user
router.get('/user', isAuthorized, inquiryController.getInquiriesByUser);

export default router;
