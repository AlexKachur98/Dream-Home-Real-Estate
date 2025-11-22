
import express from 'express';
import UserModel from '../models/user.model.js';
import UserApprovalModel from '../models/userApproval.model.js';

export default {

  /**
   * Approve a user
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  approveUser: async (req, res) => {
    try {
      const
        { user_id } = req.params,
        approved_by = req.user.user_id,
        approvalData = {
          user_id,
          approved_by,
        },
        newApproval = await UserApprovalModel.create(approvalData);

      await UserModel.update(
        { user_id },
        { is_approved: 1, is_active: 1 }
      );

      return res.status(200).json({
        message: 'User approved successfully',
        approval: newApproval
      });

    }
    catch (error) {
      console.error('Error approving user:', error);
      return res.status(500).json({
        message: 'Error approving user',
        error: error.message
      });
    };
  },

  /**
   * Get approval records for a user
   * @param {express.Request} req - Express request object
   * @param {express.Response} res - Express response object
   */
  getUserApprovals: async (req, res) => {
    try {
      const { user_id } = req.params;
      const approvals = await UserApprovalModel.find({ where: { user_id } });
      return res.status(200).json(approvals);
    }
    catch (error) {
      console.error('Error fetching approvals:', error);
      return res.status(500).json({
        message: 'Error fetching approvals',
        error: error.message
      });
    };
  },

  /**
   * Get all approval records
   * @param {express.Request} _ - Express request object (not used)
   * @param {express.Response} res - Express response object
   */
  getAllApprovals: async (_, res) => {
    try {
      const approvals = await UserApprovalModel.find();
      return res.status(200).json(approvals);
    }
    catch (error) {
      console.error('Error fetching approvals:', error);
      return res.status(500).json({
        message: 'Error fetching approvals',
        error: error.message
      });
    };
  }


};

