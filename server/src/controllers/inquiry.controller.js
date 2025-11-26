import InquiryModel from '../models/inquiry.model.js';
import PropertyModel from '../models/property.model.js';

export default {
  /**
   * Send an inquiry
   */
  sendInquiry: async (req, res) => {
    try {
      const { propertyId, question, name, email, phone } = req.body;
      const userId = req.user?.user_id; // From auth middleware

      // Check if property exists
      const propertyModel = await PropertyModel;
      const property = await propertyModel.findOne({ property_id: propertyId });
      if (!property) {
        return res.status(404).json({ message: 'Property not found.' });
      }

      // Create inquiry record
      const inquiryModel = await InquiryModel;
      const inquiryData = {
        property_id: propertyId,
        user_id: userId,
        inquirer_name: userId ? null : name,
        inquirer_email: userId ? null : email,
        inquirer_phone: userId ? null : phone,
        question: question,
        status: 'open'
      };

      const newInquiry = await inquiryModel.create(inquiryData);

      return res.status(201).json({
        success: true,
        message: 'Inquiry sent successfully',
        inquiry: newInquiry
      });
    } catch (error) {
      console.error('Error sending inquiry:', error);
      return res.status(500).json({
        message: 'Error sending inquiry',
        error: error.message
      });
    }
  },

  /**
   * Get inquiries for a property
   */
  getInquiriesByProperty: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const inquiryModel = await InquiryModel;

      // Check if user is admin or the property's agent
      const propertyModel = await PropertyModel;
      const property = await propertyModel.findOne({ property_id: propertyId });
      if (!property) {
        return res.status(404).json({ message: 'Property not found.' });
      }

      // For non-admins, check if the user is the agent for this property
      if (req.user.role !== 'admin' && req.user.user_id !== property.agent_id) {
        return res.status(403).json({ message: 'Unauthorized: You are not the agent for this property.' });
      }

      const inquiries = await inquiryModel.find({
        where: { property_id: propertyId },
        orderBy: 'created_at DESC'
      });
      return res.status(200).json(inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      return res.status(500).json({
        message: 'Error fetching inquiries',
        error: error.message
      });
    }
  },

  /**
   * Respond to an inquiry
   */
  respondToInquiry: async (req, res) => {
    try {
      const { inquiryId } = req.params;
      const { response } = req.body;
      const inquiryModel = await InquiryModel;

      // Check if user is admin or the property's agent
      const inquiry = await inquiryModel.findOne({ inquiry_id: inquiryId });
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found.' });
      }

      const propertyModel = await PropertyModel;
      const property = await propertyModel.findOne({ property_id: inquiry.property_id });

      if (req.user.role !== 'admin' && req.user.user_id !== property.agent_id) {
        return res.status(403).json({ message: 'Unauthorized: You are not the agent for this property.' });
      }

      const updateData = {
        response: response,
        status: 'answered'
      };

      const result = await inquiryModel.update({ inquiry_id: inquiryId }, updateData);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Inquiry not found.' });
      }

      const updatedInquiry = await inquiryModel.findOne({ inquiry_id: inquiryId });
      return res.status(200).json({
        message: 'Response sent successfully',
        inquiry: updatedInquiry
      });
    } catch (error) {
      console.error('Error responding to inquiry:', error);
      return res.status(500).json({
        message: 'Error responding to inquiry',
        error: error.message
      });
    }
  },

  /**
   * Get inquiries for a user
   */
  getInquiriesByUser: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const inquiryModel = await InquiryModel;

      const inquiries = await inquiryModel.find({
        where: { user_id: userId },
        orderBy: 'created_at DESC'
      });

      return res.status(200).json(inquiries);
    } catch (error) {
      console.error('Error fetching user inquiries:', error);
      return res.status(500).json({
        message: 'Error fetching user inquiries',
        error: error.message
      });
    }
  }
};
