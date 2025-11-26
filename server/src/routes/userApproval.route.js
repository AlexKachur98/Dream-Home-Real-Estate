
import { Router } from 'express';
import Controller from '../controllers/userApproval.controller.js';
import isAuthorized from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js'; // Optional: Middleware to check if the user is an admin

export default Router()

  .patch(
    '/:user_id/approve',
    isAuthorized,
    isAdmin, // Ensure only admins can approve users
    Controller.approveUser
  )

  .get(
    '/:user_id/approvals',
    isAuthorized,
    isAdmin,
    Controller.getUserApprovals
  )

  .get(
    '/approved',
    isAuthorized,
    isAdmin,
    Controller.getAllApprovals
  );



