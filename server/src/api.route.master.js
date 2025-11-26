
import express from 'express';

import authRouter from './routes/auth.route.js';

import userRouter from './routes/users.route.js';
import profileRouter from './routes/userProfile.route.js';
import clientRouter from './routes/client.route.js';
import staffRouter from './routes/staff.route.js';
import branchRouter from './routes/branch.route.js';
import propertiesRouter from './routes/property.route.js';
import showingRouter from './routes/showing.route.js';
import inquiryRouter from './routes/inquiry.route.js';


import userApprovalRoutes from './routes/userApproval.route.js';


/**
 * Master Router for all API routes
 * @param {express.Express} app
 */
export default (app) => {
  app
    .use('/api/auth', authRouter)

    .use('/api/users', userRouter)
    .use('/api/profiles', profileRouter)
    .use('/api/clients', clientRouter)
    .use('/api/staff', staffRouter)
    .use('/api/branches', branchRouter)
    .use('/api/approvals', userApprovalRoutes)
    .use('/api/properties', propertiesRouter)
    .use('/api/showings', showingRouter)
    .use('/api/inquiries', inquiryRouter)

    .get('/api/health', (_, res) => {
      res.status(200).json({ status: 'OK' });
    });

};
