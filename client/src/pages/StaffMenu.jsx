/**
 * @file StaffMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Presents workflows for hiring and updating staff members.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import PageSection from '../components/PageSection.jsx';

export default function StaffMenu() {
  const [staffRecords, setStaffRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    staff_id: '',
    firstName: '',
    lastName: '',
    position: '',
    branchNo: '',
    dob: '',
    salary: '',
    telephone: '',
    mobile: '',
    email: ''
  });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  // Fetch staff records
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('/api/staff', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setStaffRecords(data);
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          staff_id: formData.staff_id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          position: formData.position,
          branch_no: formData.branchNo,
          date_of_birth: formData.dob,
          salary: parseFloat(formData.salary),
          telephone: formData.telephone,
          mobile: formData.mobile,
          email: formData.email
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setStaffRecords(prev => [...prev, result.staff]);
        // Reset form
        setFormData({
          staff_id: '',
          firstName: '',
          lastName: '',
          position: '',
          branchNo: '',
          dob: '',
          salary: '',
          telephone: '',
          mobile: '',
          email: ''
        });
        alert('Staff member added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('An error occurred while creating the staff member.');
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.staff_id);
    setFormData({
      staff_id: staff.staff_id,
      firstName: staff.first_name,
      lastName: staff.last_name,
      position: staff.position,
      branchNo: staff.branch_no,
      dob: staff.date_of_birth ? staff.date_of_birth.split('T')[0] : '',
      salary: staff.salary,
      telephone: staff.telephone,
      mobile: staff.mobile,
      email: staff.email
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/staff/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          position: formData.position,
          branch_no: formData.branchNo,
          date_of_birth: formData.dob,
          salary: parseFloat(formData.salary),
          telephone: formData.telephone,
          mobile: formData.mobile,
          email: formData.email
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setStaffRecords(prev =>
          prev.map(staff =>
            staff.staff_id === editingId ? result.staff : staff
          )
        );
        setEditingId(null);
        // Reset form
        setFormData({
          staff_id: '',
          firstName: '',
          lastName: '',
          position: '',
          branchNo: '',
          dob: '',
          salary: '',
          telephone: '',
          mobile: '',
          email: ''
        });
        alert('Staff member updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('An error occurred while updating the staff member.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    // Reset form
    setFormData({
      staff_id: '',
      firstName: '',
      lastName: '',
      position: '',
      branchNo: '',
      dob: '',
      salary: '',
      telephone: '',
      mobile: '',
      email: ''
    });
  };

  return (
    <div className="page page--stacked">
      <header className="page__header">
        <h2>Staff Administration</h2>
        <p>
          {user?.role === 'admin' ?
            'Manage team members and keep records current.' :
            'View team members (contact an admin for changes).'}
        </p>
      </header>
      {user?.role === 'admin' && (
        <PageSection
          title={editingId ? "Update Staff Member" : "Hire Staff"}
          description={editingId ?
            "Update the details for the selected staff member." :
            "Collect the required onboarding details for new team members."}
        >
          <form className="form-grid" onSubmit={editingId ? handleUpdate : handleSubmit}>
            <label>
              Staff ID
              <input
                type="text"
                name="staff_id"
                placeholder="DH104"
                value={formData.staff_id}
                onChange={handleInputChange}
                required
                readOnly={!!editingId}
              />
            </label>
            <label>
              First Name
              <input
                type="text"
                name="firstName"
                placeholder="Alex"
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
                placeholder="Kachur"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Position
              <input
                type="text"
                name="position"
                placeholder="Sales Associate"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Branch Number
              <input
                type="text"
                name="branchNo"
                placeholder="B001"
                value={formData.branchNo}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Date of Birth
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Salary
              <input
                type="number"
                name="salary"
                min="0"
                step="0.01"
                placeholder="55000"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Telephone
              <input
                type="tel"
                name="telephone"
                placeholder="416-555-1234"
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Mobile
              <input
                type="tel"
                name="mobile"
                placeholder="437-555-9876"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-grid__full">
              Email
              <input
                type="email"
                name="email"
                placeholder="alex.kachur@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit">
                {editingId ? 'Update Staff' : 'Schedule Hire'}
              </button>
              {(editingId || formData.staff_id) && (
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
        title="Staff Directory"
        description="View and manage staff contact information."
      >
        {isLoading ? (
          <p>Loading staff records...</p>
        ) : (
          <>
            {staffRecords.length === 0 ? (
              <p>No staff records found.</p>
            ) : (
              <div role="table" className="table-placeholder">
                <div role="row" className="table-placeholder__row table-placeholder__row--head">
                  <span>ID</span>
                  <span>Name</span>
                  <span>Position</span>
                  <span>Salary</span>
                  <span>Phone</span>
                  <span>Email</span>
                  {user?.role === 'admin' && <span>Actions</span>}
                </div>
                {staffRecords.map((staff) => (
                  <div role="row" className="table-placeholder__row" key={staff.staff_id}>
                    <span>{staff.staff_id}</span>
                    <span>{staff.first_name} {staff.last_name}</span>
                    <span>{staff.position}</span>
                    <span>${staff.salary.toLocaleString()}</span>
                    <span>{staff.telephone || 'N/A'}</span>
                    <span>{staff.email}</span>
                    {user?.role === 'admin' && (
                      <span>
                        <button
                          type="button"
                          className="button--ghost"
                          onClick={() => handleEdit(staff)}
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
}
