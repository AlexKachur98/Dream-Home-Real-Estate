/**
 * @file Home.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Displays the landing content for the Dream Home Real Estate portal.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PageSection from '../components/PageSection.jsx';

const MENU_CARDS = [
    {
        title: 'Staff Main Menu',
        body: 'Hire new agents, update salaries, and keep contact details accurate.',
        to: '/staff',
    },
    {
        title: 'Branch Main Menu',
        body: 'Verify addresses, update branch info, and launch new locations.',
        to: '/branches',
    },
    {
        title: 'Client Main Menu',
        body: 'Register clients and maintain their communication preferences.',
        to: '/clients',
    },
];

export default function Home() {
    return (
        <div className="page page--stacked">
            <header className="page__header">
                <h2>Welcome to Dream Home Real Estate</h2>
                <p>
                    Use the menus below to manage your operations. Each area will connect to Oracle procedures
                    and APIs as we progress through the build.
                </p>
            </header>

            <PageSection
                title="Get Started"
                description="Choose a workflow to continue. These cards mirror the instructor&apos;s project brief."
            >
                <div className="menu-card-grid">
                    {MENU_CARDS.map((card) => (
                        <article className="menu-card" key={card.title}>
                            <h4>{card.title}</h4>
                            <p>{card.body}</p>
                            {/* Links keep navigation SPA-friendly without full reloads */}
                            <Link to={card.to} className="menu-card__cta">
                                Open Menu
                            </Link>
                        </article>
                    ))}
                </div>
            </PageSection>
        </div>
    );
}
