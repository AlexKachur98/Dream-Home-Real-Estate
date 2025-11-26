
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import PageSection from './PageSection.jsx';

export default function ShowingsAdmin() {
  const [showings, setShowings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchShowings = async () => {
      try {
        // For admins, fetch all showings
        // For agents, fetch only showings for their properties
        let url = '/api/showings/user';
        if (user.role === 'admin') {
          // Admin can see all showings (would need additional endpoint)
          // For now, we'll just show the user's showings
        }

        const response = await fetch(url, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setShowings(data);
        }
      } catch (error) {
        console.error('Error fetching showings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowings();
  }, [user.role]);

  const handleStatusUpdate = async (showingId, newStatus) => {
    try {
      const response = await fetch(`/api/showings/${showingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setShowings(prev =>
          prev.map(showing =>
            showing.showing_id === showingId ? result.showing : showing
          )
        );
        alert('Showing status updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating showing status:', error);
      alert('An error occurred while updating the showing status.');
    }
  };

  return (
    <div className="page page--stacked">
      <header className="page__header">
        <h2>Showing Management</h2>
        <p>View and manage property showing requests.</p>
      </header>

      <PageSection title="Your Showings" description="View and manage your scheduled property showings.">
        {isLoading ? (
          <p>Loading showings...</p>
        ) : showings.length === 0 ? (
          <p>No showings found.</p>
        ) : (
          <div role="table" className="table-placeholder">
            <div role="row" className="table-placeholder__row table-placeholder__row--head">
              <span>Property</span>
              <span>Requested Time</span>
              <span>Client</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {showings.map((showing) => (
              <div role="row" className="table-placeholder__row" key={showing.showing_id}>
                <span>{showing.property_id}</span>
                <span>{new Date(showing.requested_time).toLocaleString()}</span>
                <span>
                  {showing.user_id ? 'Registered User' : `${showing.requested_by_name || 'Anonymous'}`}
                </span>
                <span>{showing.status}</span>
                <span>
                  {showing.status !== 'completed' && showing.status !== 'cancelled' && (
                    <>
                      <select
                        value={showing.status}
                        onChange={(e) => handleStatusUpdate(showing.showing_id, e.target.value)}
                      >
                        <option value="requested">Requested</option>
                        <option value="confirmed">Confirm</option>
                        <option value="completed">Complete</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </PageSection>
    </div>
  );
};

