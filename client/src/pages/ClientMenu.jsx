/**
 * @file ClientMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Introduces client onboarding and maintenance placeholders for the UI.
 */
import React from 'react';
import PageSection from '../components/PageSection.jsx';

export default function ClientMenu() {
    return (
        <div className="page page--stacked">
            <header className="page__header">
                <h2>Client Services</h2>
                <p>
                    Register prospective buyers and keep their contact preferences fresh ahead of property
                    matchmaking.
                </p>
            </header>

            <PageSection
                title="Register New Client"
                description="Capture the core client details before persisting them to DH_CLIENT."
            >
                <form className="form-grid" aria-label="Client registration form">
                    <label>
                        First Name
                        <input type="text" name="firstName" placeholder="Taylor" />
                    </label>
                    <label>
                        Last Name
                        <input type="text" name="lastName" placeholder="Morgan" />
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" placeholder="taylor@example.com" />
                    </label>
                    <label>
                        Phone
                        <input type="tel" name="phone" placeholder="905-555-2233" />
                    </label>
                    <label className="form-grid__full">
                        Preferred Contact Method
                        <select name="contactMethod" defaultValue="">
                            <option value="" disabled>Select method</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="sms">SMS</option>
                        </select>
                    </label>
                    <label className="form-grid__full">
                        Notes
                        <textarea name="notes" rows="3" placeholder="Add preferences or budget notes..." />
                    </label>
                    <div className="form-actions">
                        <button type="submit">Register Client</button>
                        <button type="reset" className="button--ghost">Reset</button>
                    </div>
                </form>
            </PageSection>

            <PageSection
                title="Update Existing Client"
                description="Select a client to adjust their contact details."
            >
                <div role="table" className="table-placeholder">
                    <div role="row" className="table-placeholder__row table-placeholder__row--head">
                        <span>ID</span>
                        <span>Name</span>
                        <span>Phone</span>
                        <span>Email</span>
                        <span>Preferred Contact</span>
                        <span>Actions</span>
                    </div>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div role="row" className="table-placeholder__row" key={`client-row-${index}`}>
                            <span>CL10{index + 1}</span>
                            <span>Jordan Sample</span>
                            <span>(647) 555-18{index}0</span>
                            <span>client{index}@example.com</span>
                            <span>Email</span>
                            <span>
                                <button type="button" className="button--ghost">Edit</button>
                            </span>
                        </div>
                    ))}
                </div>
            </PageSection>
        </div>
    );
}
