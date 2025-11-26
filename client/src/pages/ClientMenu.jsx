/**
 * @file ClientMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Manages client onboarding and maintenance.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import PageSection from '../components/PageSection.jsx';

export default function ClientMenu() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    client_id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: '',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: formData.client_id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: formData.contactMethod,
          notes: formData.notes
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setClients(prev => [...prev, result.client]);
        // Reset form
        setFormData({
          client_id: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          contactMethod: '',
          notes: ''
        });
        alert('Client registered successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating client:', error);
      alert('An error occurred while registering the client.');
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.client_id);
    setFormData({
      client_id: client.client_id,
      firstName: client.first_name,
      lastName: client.last_name,
      email: client.email,
      phone: client.phone || '',
      contactMethod: client.preferred_contact,
      notes: client.notes || ''
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/clients/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: formData.contactMethod,
          notes: formData.notes
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setClients(prev =>
          prev.map(client =>
            client.client_id === editingId ? result.client : client
          )
        );
        setEditingId(null);
        // Reset form
        setFormData({
          client_id: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          contactMethod: '',
          notes: ''
        });
        alert('Client updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating client:', error);
      alert('An error occurred while updating the client.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    // Reset form
    setFormData({
      client_id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      contactMethod: '',
      notes: ''
    });
  };

  return (
    <div className="page page--stacked">
      <header className="page__header">
        <h2>Client Services</h2>
        <p>
          {user?.role === 'admin' ?
            'Register prospective buyers and keep their contact preferences current.' :
            'View client information (contact an admin for changes).'}
        </p>
      </header>

      {user?.role === 'admin' && (
        <PageSection
          title={editingId ? "Update Existing Client" : "Register New Client"}
          description={editingId ?
            "Update the details for the selected client." :
            "Capture the core client details for registration."}
        >
          <form className="form-grid" onSubmit={editingId ? handleUpdate : handleSubmit}>
            {!editingId && (
              <label>
                Client ID
                <input
                  type="text"
                  name="client_id"
                  placeholder="CL105"
                  value={formData.client_id}
                  onChange={handleInputChange}
                  required
                />
              </label>
            )}
            <label>
              First Name
              <input
                type="text"
                name="firstName"
                placeholder="Taylor"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                name="lastName"
                placeholder="Morgan"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="taylor@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                name="phone"
                placeholder="905-555-2233"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-grid__full">
              Preferred Contact Method
              <select
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select method</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="sms">SMS</option>
              </select>
            </label>
            <label className="form-grid__full">
              Notes
              <textarea
                name="notes"
                rows="3"
                placeholder="Add preferences or budget notes..."
                value={formData.notes}
                onChange={handleInputChange}
              />
            </label>
            <div className="form-actions">
              <button type="submit">
                {editingId ? 'Update Client' : 'Register Client'}
              </button>
              {(editingId || formData.client_id) && (
                <button
                  type="button"
                  className="button--ghost"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </PageSection>
      )}

      <PageSection
        title="Client Directory"
        description="View and manage client contact information."
      >
        {isLoading ? (
          <p>Loading client records...</p>
        ) : (
          <>
            {clients.length === 0 ? (
              <p>No client records found.</p>
            ) : (
              <div role="table" className="table-placeholder">
                <div role="row" className="table-placeholder__row table-placeholder__row--head">
                  <span>ID</span>
                  <span>Name</span>
                  <span>Phone</span>
                  <span>Email</span>
                  <span>Preferred Contact</span>
                  {user?.role === 'admin' && <span>Actions</span>}
                </div>
                {clients.map((client) => (
                  <div role="row" className="table-placeholder__row" key={client.client_id}>
                    <span>{client.client_id}</span>
                    <span>{client.first_name} {client.last_name}</span>
                    <span>{client.phone || 'N/A'}</span>
                    <span>{client.email}</span>
                    <span>{client.preferred_contact.charAt(0).toUpperCase() + client.preferred_contact.slice(1)}</span>
                    {user?.role === 'admin' && (
                      <span>
                        <button
                          type="button"
                          className="button--ghost"
                          onClick={() => handleEdit(client)}
                        >
                          Edit
                        </button>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </PageSection>
    </div>
  );
};
