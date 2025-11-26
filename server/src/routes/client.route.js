
import { Router } from 'express';
import clientController from '../controllers/client.controller.js';
import isAuthorized from '../middlewares/auth.js';

const router = Router();

// Get all clients
router.get('/', isAuthorized, clientController.getAllClients);

// Get a single client
router.get('/:client_id', isAuthorized, clientController.getClientById);

// Create a new client
router.post('/', isAuthorized, clientController.createClient);

// Update a client
router.patch('/:client_id', isAuthorized, clientController.updateClient);

export default router;
