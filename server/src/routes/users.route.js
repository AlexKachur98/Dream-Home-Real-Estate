
import { Router } from 'express';
import userController from '../controllers/user.controller.js';


export default Router()

  .get('/:userId', userController.getUserById)
  .post('/create', userController.createUser)
  .put('/:userId', userController.updateUser)
  .get('/active', userController.getActiveUsers)
  .get('', userController.getUsersPaginated)
  .get('/count', userController.countUsers)
  .delete('/:userId', userController.deleteUser);
