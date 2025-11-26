
import { Router } from 'express';
import propertyController from '../controllers/property.controller.js';
import isAuthorized from '../middlewares/auth.js';

const router = Router();

// Get all properties
router.get('/', propertyController.getAllProperties);

// Get a single property
router.get('/:propertyId', propertyController.getPropertyById);

// Create a new property (admin/agent only)
router.post('/', isAuthorized, propertyController.createProperty);

// Update a property (admin/agent only)
router.patch('/:propertyId', isAuthorized, propertyController.updateProperty);

export default router;
