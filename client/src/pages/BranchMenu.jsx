/**
 * @file BranchMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Manages branch lookup, updates, and creation.
 */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import PageSection from '../components/PageSection.jsx';

export default function BranchMenu() {
  const [branchRecords, setBranchRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    branch_no: '',
    street: '',
    city: '',
    postcode: ''
  });
  const [lookupResult, setLookupResult] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  // Fetch branch records
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('/api/branches', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setBranchRecords(data);
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLookup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/branches/${formData.branch_no}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const branch = await response.json();
        setLookupResult(branch);
      } else {
        const error = await response.json();
        setLookupResult(null);
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error looking up branch:', error);
      setLookupResult(null);
      alert('An error occurred while looking up the branch.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/branches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setBranchRecords(prev => [...prev, result.branch]);
        // Reset form
        setFormData({
          branch_no: '',
          street: '',
          city: '',
          postcode: ''
        });
        alert('Branch created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating branch:', error);
      alert('An error occurred while creating the branch.');
    }
  };

  const handleEdit = (branch) => {
    setEditingId(branch.branch_no);
    setFormData({
      branch_no: branch.branch_no,
      street: branch.street,
      city: branch.city,
      postcode: branch.postcode
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/branches/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          street: formData.street,
          city: formData.city,
          postcode: formData.postcode
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setBranchRecords(prev =>
          prev.map(branch =>
            branch.branch_no === editingId ? result.branch : branch
          )
        );
        setEditingId(null);
        // Reset form
        setFormData({
          branch_no: '',
          street: '',
          city: '',
          postcode: ''
        });
        alert('Branch updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating branch:', error);
      alert('An error occurred while updating the branch.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    // Reset form
    setFormData({
      branch_no: '',
      street: '',
      city: '',
      postcode: ''
    });
  };

  return (
    <div className="page page--stacked">
      <header className="page__header">
        <h2>Branch Operations</h2>
        <p>
          {user?.role === 'admin' ?
            'Manage branch locations and keep addresses accurate.' :
            'View branch locations (contact an admin for changes).'}
        </p>
      </header>

      <PageSection
        title="Identify Branch Address"
        description="Enter a branch number to retrieve the street and city details."
      >
        <form className="form-inline" onSubmit={handleLookup} aria-label="Branch lookup form">
          <label>
            Branch Number
            <input
              type="text"
              name="branch_no"
              placeholder="B002"
              value={formData.branch_no}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Find Address</button>
        </form>
        <div className="lookup-result" aria-live="polite">
          {lookupResult ? (
            <div>
              <p><strong>Branch {lookupResult.branch_no}:</strong></p>
              <p>{lookupResult.street}, {lookupResult.city}, {lookupResult.postcode}</p>
            </div>
          ) : (
            <p>Enter a branch number to see address details.</p>
          )}
        </div>
      </PageSection>

      <PageSection
        title="Branch Directory"
        description="View and manage branch locations."
      >
        {isLoading ? (
          <p>Loading branch records...</p>
        ) : (
          <>
            {branchRecords.length === 0 ? (
              <p>No branch records found.</p>
            ) : (
              <div role="table" className="table-placeholder">
                <div role="row" className="table-placeholder__row table-placeholder__row--head">
                  <span>Branch</span>
                  <span>Street</span>
                  <span>City</span>
                  <span>Post Code</span>
                  {user?.role === 'admin' && <span>Actions</span>}
                </div>
                {branchRecords.map((branch) => (
                  <div role="row" className="table-placeholder__row" key={branch.branch_no}>
                    <span>{branch.branch_no}</span>
                    <span>{branch.street}</span>
                    <span>{branch.city}</span>
                    <span>{branch.postcode}</span>
                    {user?.role === 'admin' && (
                      <span>
                        <button
                          type="button"
                          className="button--ghost"
                          onClick={() => handleEdit(branch)}
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

      {user?.role === 'admin' && (
        <PageSection
          title={editingId ? "Update Branch Details" : "Open a New Branch"}
          description={editingId ?
            "Update the details for the selected branch." :
            "Enter details for a new branch location."}
        >
          <form className="form-grid" onSubmit={editingId ? handleUpdate : handleSubmit}>
            {!editingId && (
              <label>
                Branch Number
                <input
                  type="text"
                  name="branch_no"
                  placeholder="B010"
                  value={formData.branch_no}
                  onChange={handleInputChange}
                  required
                />
              </label>
            )}
            <label>
              Street
              <input
                type="text"
                name="street"
                placeholder="35 Raven Street"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              City
              <input
                type="text"
                name="city"
                placeholder="London"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Post Code
              <input
                type="text"
                name="postcode"
                placeholder="N5Y 3K7"
                value={formData.postcode}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit">
                {editingId ? 'Update Branch' : 'Create Branch'}
              </button>
              {(editingId || formData.branch_no) && (
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
    </div>
  );
};
