
import ClientModel from '../models/client.model.js';

export default {
  /**
   * Get all client records
   */
  getAllClients: async (req, res) => {
    try {
      const clientModel = await ClientModel;
      const clients = await clientModel.find({ orderBy: 'last_name ASC' });
      return res.status(200).json(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      return res.status(500).json({
        message: 'Error fetching clients',
        error: error.message
      });
    }
  },

  /**
   * Get a single client by client_id
   */
  getClientById: async (req, res) => {
    try {
      const clientModel = await ClientModel;
      const { client_id } = req.params;

      const client = await clientModel.findOne({ client_id });
      if (!client) {
        return res.status(404).json({ message: 'Client not found.' });
      }

      return res.status(200).json(client);
    } catch (error) {
      console.error('Error fetching client:', error);
      return res.status(500).json({
        message: 'Error fetching client',
        error: error.message
      });
    }
  },

  /**
   * Create a new client
   */
  createClient: async (req, res) => {
    try {
      const clientModel = await ClientModel;
      const clientData = req.body;

      // Validate required fields
      if (!clientData.client_id || !clientData.first_name || !clientData.last_name || !clientData.email || !clientData.preferred_contact) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }

      // Check if client with this email already exists
      const existingClient = await clientModel.findOne({ email: clientData.email });
      if (existingClient) {
        return res.status(400).json({ message: 'A client with this email already exists.' });
      }

      const newClient = await clientModel.create(clientData);
      return res.status(201).json({
        message: 'Client registered successfully',
        client: newClient
      });
    } catch (error) {
      console.error('Error creating client:', error);
      return res.status(500).json({
        message: 'Error creating client',
        error: error.message
      });
    }
  },

  /**
   * Update a client
   */
  updateClient: async (req, res) => {
    try {
      const clientModel = await ClientModel;
      const { client_id } = req.params;
      const updates = req.body;

      // Prevent client_id from being updated
      if (updates.client_id) {
        delete updates.client_id;
      }

      const result = await clientModel.update({ client_id }, updates);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Client not found.' });
      }

      // Fetch the updated client record
      const updatedClient = await clientModel.findOne({ client_id });
      return res.status(200).json({
        message: 'Client updated successfully',
        client: updatedClient
      });
    } catch (error) {
      console.error('Error updating client:', error);
      return res.status(500).json({
        message: 'Error updating client',
        error: error.message
      });
    }
  }
};

