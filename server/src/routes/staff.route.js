
import { Router } from 'express';
import staffController from '../controllers/staff.controller.js';
import isAuthorized from '../middlewares/auth.js';

const router = Router();

// Get all staff records
router.get('/', isAuthorized, staffController.getAllStaff);

// Create a new staff member
router.post('/', isAuthorized, staffController.createStaff);

// Update a staff member
router.patch('/:staff_id', isAuthorized, staffController.updateStaff);

// Get a single staff member
router.get('/:staff_id', isAuthorized, staffController.getStaffById);

export default router;
