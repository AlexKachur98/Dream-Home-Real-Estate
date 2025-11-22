
import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import isAdmin from '../middlewares/isAdmin.js';
import isAuthorized from '../middlewares/auth.js';


export default Router()

  .get('/:userId', isAuthorized, userController.getUserById)
  .post('/create', userController.createUser)
  .put('/:userId', userController.updateUser)
  .get('/active', userController.getActiveUsers)
  .get('', userController.getUsersPaginated)
  .get('/count', userController.countUsers)
  .delete('/:userId', isAdmin, userController.deleteUser);
