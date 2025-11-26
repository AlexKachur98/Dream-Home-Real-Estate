
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import PageSection from './PageSection.jsx';

export default function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseText, setResponseText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        // For admins, fetch all inquiries
        // For agents, fetch only inquiries for their properties
        let url = '/api/inquiries/user';
        if (user.role === 'admin') {
          // Admin can see all inquiries (would need additional endpoint)
          // For now, we'll just show the user's inquiries
        }

        const response = await fetch(url, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setInquiries(data);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, [user.role]);

  const handleRespond = async (inquiryId) => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}/respond`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          response: responseText
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setInquiries(prev =>
          prev.map(inquiry =>
            inquiry.inquiry_id === inquiryId ? result.inquiry : inquiry
          )
        );
        setSelectedInquiry(null);
        setResponseText('');
        alert('Response sent successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error responding to inquiry:', error);
      alert('An error occurred while sending your response.');
    }
  };

  return (
    <div className="page page--stacked">
      <header className="page__header">
        <h2>Inquiry Management</h2>
        <p>View and respond to property inquiries.</p>
      </header>

      <PageSection title="Your Inquiries" description="View and respond to property inquiries.">
        {isLoading ? (
          <p>Loading inquiries...</p>
        ) : inquiries.length === 0 ? (
          <p>No inquiries found.</p>
        ) : (
          <>
            <div role="table" className="table-placeholder">
              <div role="row" className="table-placeholder__row table-placeholder__row--head">
                <span>Property</span>
                <span>Date</span>
                <span>Client</span>
                <span>Question</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {inquiries.map((inquiry) => (
                <div role="row" className="table-placeholder__row" key={inquiry.inquiry_id}>
                  <span>{inquiry.property_id}</span>
                  <span>{new Date(inquiry.created_at).toLocaleString()}</span>
                  <span>
                    {inquiry.user_id ? 'Registered User' : `${inquiry.inquirer_name || 'Anonymous'}`}
                  </span>
                  <span>{inquiry.question.substring(0, 30)}{inquiry.question.length > 30 ? '...' : ''}</span>
                  <span>{inquiry.status}</span>
                  <span>
                    {inquiry.status === 'open' && (
                      <button
                        type="button"
                        className="button--ghost"
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setResponseText('');
                        }}
                      >
                        Respond
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {selectedInquiry && (
              <div className="inquiry-response">
                <h3>Respond to Inquiry</h3>
                <p><strong>Question:</strong> {selectedInquiry.question}</p>
                <p><strong>From:</strong> {selectedInquiry.user_id ? 'Registered User' : selectedInquiry.inquirer_name}</p>

                <label>
                  Your Response
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows="5"
                    required
                  />
                </label>

                <div className="form-actions">
                  <button type="button" onClick={() => handleRespond(selectedInquiry.inquiry_id)}>
                    Send Response
                  </button>
                  <button
                    type="button"
                    className="button--ghost"
                    onClick={() => {
                      setSelectedInquiry(null);
                      setResponseText('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </PageSection>
    </div>
  );
};
