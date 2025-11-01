/**
 * @file PageSection.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Provides a styled container for grouping related page content.
 */
import React from 'react';

export default function PageSection({ title, description, children }) {
    return (
        <section className="page-section">
            <header className="page-section__header">
                <h3>{title}</h3>
                {description ? <p className="page-section__description">{description}</p> : null}
            </header>
            <div className="page-section__body">
                {children}
            </div>
        </section>
    );
}
