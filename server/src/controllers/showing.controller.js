
import ShowingModel from '../models/showing.model.js';
import PropertyModel from '../models/property.model.js';

export default {
  /**
   * Request a showing
   */
  requestShowing: async (req, res) => {
    try {
      const { propertyId, requestedTime, name, email, phone } = req.body;
      const userId = req.user?.user_id; // From auth middleware

      // Check if property exists
      const propertyModel = await PropertyModel;
      const property = await propertyModel.findOne({ property_id: propertyId });
      if (!property) {
        return res.status(404).json({ message: 'Property not found.' });
      }

      // Create showing record
      const showingModel = await ShowingModel;
      const showingData = {
        property_id: propertyId,
        user_id: userId,
        requested_by_name: userId ? null : name,
        requested_by_email: userId ? null : email,
        requested_by_phone: userId ? null : phone,
        requested_time: requestedTime,
        status: 'requested'
      };

      const newShowing = await showingModel.create(showingData);

      return res.status(201).json({
        success: true,
        message: 'Showing requested successfully',
        showing: newShowing
      });
    } catch (error) {
      console.error('Error requesting showing:', error);
      return res.status(500).json({
        message: 'Error requesting showing',
        error: error.message
      });
    }
  },

  /**
   * Get showings for a property
   */
  getShowingsByProperty: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const showingModel = await ShowingModel;

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

      const showings = await showingModel.find({ where: { property_id: propertyId }, orderBy: 'requested_time ASC' });
      return res.status(200).json(showings);
    } catch (error) {
      console.error('Error fetching showings:', error);
      return res.status(500).json({
        message: 'Error fetching showings',
        error: error.message
      });
    }
  },

  /**
   * Update showing status
   */
  updateShowingStatus: async (req, res) => {
    try {
      const { showingId } = req.params;
      const { status, notes } = req.body;
      const showingModel = await ShowingModel;

      // Check if user is admin or the property's agent
      const showing = await showingModel.findOne({ showing_id: showingId });
      if (!showing) {
        return res.status(404).json({ message: 'Showing not found.' });
      }

      const propertyModel = await PropertyModel;
      const property = await propertyModel.findOne({ property_id: showing.property_id });

      if (req.user.role !== 'admin' && req.user.user_id !== property.agent_id) {
        return res.status(403).json({ message: 'Unauthorized: You are not the agent for this property.' });
      }

      const updateData = { status };
      if (notes) updateData.notes = notes;

      const result = await showingModel.update({ showing_id: showingId }, updateData);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Showing not found.' });
      }

      const updatedShowing = await showingModel.findOne({ showing_id: showingId });
      return res.status(200).json({
        message: 'Showing status updated successfully',
        showing: updatedShowing
      });
    } catch (error) {
      console.error('Error updating showing status:', error);
      return res.status(500).json({
        message: 'Error updating showing status',
        error: error.message
      });
    }
  },

  /**
   * Get showings for a user
   */
  getShowingsByUser: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const showingModel = await ShowingModel;

      const showings = await showingModel.find({
        where: { user_id: userId },
        orderBy: 'requested_time DESC'
      });

      return res.status(200).json(showings);
    } catch (error) {
      console.error('Error fetching user showings:', error);
      return res.status(500).json({
        message: 'Error fetching user showings',
        error: error.message
      });
    }
  }
};
