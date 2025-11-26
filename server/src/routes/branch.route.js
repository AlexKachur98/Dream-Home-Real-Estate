
import { Router } from 'express';
import branchController from '../controllers/branch.controller.js';
import isAuthorized from '../middlewares/auth.js';

const router = Router();

// Get all branches
router.get('/', isAuthorized, branchController.getAllBranches);

// Get a single branch
router.get('/:branch_no', isAuthorized, branchController.getBranchById);

// Create a new branch
router.post('/', isAuthorized, branchController.createBranch);

// Update a branch
router.patch('/:branch_no', isAuthorized, branchController.updateBranch);

export default router;
