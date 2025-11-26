

import BranchModel from '../models/branch.model.js';

export default {
  /**
   * Get all branch records
   */
  getAllBranches: async (req, res) => {
    try {
      const branchModel = await BranchModel;
      const branches = await branchModel.find({ orderBy: 'branch_no ASC' });
      return res.status(200).json(branches);
    } catch (error) {
      console.error('Error fetching branches:', error);
      return res.status(500).json({
        message: 'Error fetching branches',
        error: error.message
      });
    }
  },

  /**
   * Get a single branch by branch_no
   */
  getBranchById: async (req, res) => {
    try {
      const branchModel = await BranchModel;
      const { branch_no } = req.params;

      const branch = await branchModel.findOne({ branch_no });
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found.' });
      }

      return res.status(200).json(branch);
    } catch (error) {
      console.error('Error fetching branch:', error);
      return res.status(500).json({
        message: 'Error fetching branch',
        error: error.message
      });
    }
  },

  /**
   * Create a new branch
   */
  createBranch: async (req, res) => {
    try {
      const branchModel = await BranchModel;
      const branchData = req.body;

      // Validate required fields
      if (!branchData.branch_no || !branchData.street || !branchData.city || !branchData.postcode) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }

      const newBranch = await branchModel.create(branchData);
      return res.status(201).json({
        message: 'Branch created successfully',
        branch: newBranch
      });
    } catch (error) {
      console.error('Error creating branch:', error);
      return res.status(500).json({
        message: 'Error creating branch',
        error: error.message
      });
    }
  },

  /**
   * Update a branch
   */
  updateBranch: async (req, res) => {
    try {
      const branchModel = await BranchModel;
      const { branch_no } = req.params;
      const updates = req.body;

      // Prevent branch_no from being updated
      if (updates.branch_no) {
        delete updates.branch_no;
      }

      const result = await branchModel.update({ branch_no }, updates);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Branch not found.' });
      }

      // Fetch the updated branch record
      const updatedBranch = await branchModel.findOne({ branch_no });
      return res.status(200).json({
        message: 'Branch updated successfully',
        branch: updatedBranch
      });
    } catch (error) {
      console.error('Error updating branch:', error);
      return res.status(500).json({
        message: 'Error updating branch',
        error: error.message
      });
    }
  }
};
