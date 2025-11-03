/**
 * @file PropertyDetails.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Provides a deep-dive view for a single property listing.
 */
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageSection from '../components/PageSection.jsx';
import { getPropertyById } from '../utils/properties.js';

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const property = useMemo(() => getPropertyById(propertyId), [propertyId]);

  if (!property) {
    return (
      <div className="page page--stacked">
        <header className="page__header">
          <h2>Listing Not Found</h2>
          <p>The requested property could not be located. Please return to the listings overview.</p>
          <Link to="/properties" className="menu-card__cta">
            Back to Listings
          </Link>
        </header>
      </div>
    );
  }

  const {
    title,
    address,
    price,
    status,
    beds,
    baths,
    area,
    lotSize,
    yearBuilt,
    monthlyFees,
    type,
    heroImage,
    gallery,
    highlights,
    description,
    lifestyleNarrative,
    neighborhood,
    sustainability,
    disclosures,
    mapImage,
    floorPlans,
    documents,
    schools,
    nearby,
    agent,
    openHouse,
    lifestyleTags,
    walkScore,
    transitScore,
  } = property;

  return (
    <div className="page page--stacked">
      <header className="page__header property-detail__header">
        <div>
          <p className="property-detail__status">{status}</p>
          <h2>{title}</h2>
          <p>{address}</p>
        </div>

        <div className="property-detail__cta">
          <strong>{price}</strong>
          <div className="property-detail__cta-buttons">
            <button type="button">Schedule Tour</button>
            <button type="button" className="button--ghost">
              Share
            </button>
            <button type="button" className="button--ghost">
              Favorite
            </button>
          </div>
        </div>
      </header>

      <section className="property-detail__hero">
        <img src={heroImage} alt={`${title} hero`} />
        <div className="property-detail__hero-meta">
          <span>{beds} Beds</span>
          <span>{baths} Baths</span>
          <span>{area}</span>
          <span>{lotSize || 'Lot TBD'}</span>
          <span>Built {yearBuilt}</span>
          <span>{type}</span>
        </div>
        <div className="property-detail__hero-tags">
          {lifestyleTags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <PageSection title="Gallery" description="Placeholder imagery representing the property.">
        <div className="property-gallery">
          {gallery.map((image, index) => (
            <img key={image} src={image} alt={`${title} gallery ${index + 1}`} loading="lazy" />
          ))}
        </div>
        <div className="property-gallery__note">
          <p>Video walkthrough slot reserved for Matterport/YouTube embed.</p>
        </div>
        {/* TODO (Backend Team): hydrate gallery with media service + signed URLs. */}
      </PageSection>

      <PageSection title="Key Facts" description="High-level data points sync with MLS + internal data warehouse.">
        <dl className="property-facts">
          <div>
            <dt>Property Type</dt>
            <dd>{type}</dd>
          </div>
          <div>
            <dt>Lot Size</dt>
            <dd>{lotSize || 'TBD'}</dd>
          </div>
          <div>
            <dt>Year Built</dt>
            <dd>{yearBuilt}</dd>
          </div>
          <div>
            <dt>Monthly Fees</dt>
            <dd>{monthlyFees || 'N/A'}</dd>
          </div>
          <div>
            <dt>Open House</dt>
            <dd>{openHouse}</dd>
          </div>
          <div>
            <dt>Mobility Scores</dt>
            <dd>
              Walk {walkScore} / Transit {transitScore}
            </dd>
          </div>
        </dl>
      </PageSection>

      <PageSection title="Overview" description="High-level talking points for agents and buyers.">
        <p className="property-detail__description">{description}</p>
        <ul className="property-highlights">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </PageSection>

      <PageSection title="Lifestyle & Neighbourhood" description="Story-first content for concierge-level buyers.">
        <div className="property-lifestyle">
          <article>
            <h4>Who It Suits</h4>
            <p>{lifestyleNarrative}</p>
          </article>
          <article>
            <h4>Neighbourhood Vibe</h4>
            <p>{neighborhood}</p>
          </article>
          <article>
            <h4>Sustainability Notes</h4>
            <ul>
              {sustainability.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </PageSection>

      <PageSection title="Documents & Floor Plans" description="Download links stubbed until document service is wired up.">
        <div className="property-documents">
          <div>
            <h5>Floor Plans</h5>
            <div className="property-floorplans">
              {floorPlans.map((plan) => (
                <figure key={plan.label}>
                  <img src={plan.placeholder} alt={plan.label} loading="lazy" />
                  <figcaption>{plan.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div>
            <h5>Disclosures</h5>
            <ul>
              {documents.map((doc) => (
                <li key={doc.label}>
                  <button type="button" className="link-button">
                    {doc.label}
                  </button>
                </li>
              ))}
            </ul>
            {/* TODO (Backend Team): swap button for real download links once storage bucket is wired. */}
          </div>
        </div>
      </PageSection>

      <PageSection title="Location & Schools" description="Static placeholders until map + school APIs return geo layers.">
        <div className="property-location">
          <img src={mapImage} alt={`${title} map`} loading="lazy" />
          <div>
            <h5>School Snapshot</h5>
            <ul>
              {schools.map((school) => (
                <li key={school.name}>
                  <strong>{school.name}</strong> &mdash; {school.distance}
                </li>
              ))}
            </ul>
            <h5>Nearby Essentials</h5>
            <ul>
              {nearby.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection title="Listing Disclosures" description="Regulatory info flows from MLS sync jobs.">
        <div className="property-disclosures">
          <p>
            <strong>{disclosures.mlsNumber}</strong>
          </p>
          <p>Property taxes: {disclosures.taxes}</p>
          <p>Last updated: {disclosures.lastUpdated}</p>
        </div>
      </PageSection>

      <PageSection title="Arrange a Tour" description="Contact details auto-populate from the listing service.">
        <div className="property-agent">
          <div>
            <p className="property-agent__label">Listing Agent</p>
            <h4>{agent.name}</h4>
            <p>{agent.email}</p>
            <p>{agent.phone}</p>
          </div>
          <div className="property-agent__actions">
            <button type="button">Request Tour</button>
            <button type="button" className="button--ghost">
              Ask a Question
            </button>
          </div>
        </div>
        {/* TODO (Backend Team): wire buttons to POST /api/showings and /api/inquiries respectively. */}
      </PageSection>

      <footer className="property-detail__footer">
        <Link to="/properties" className="menu-card__cta">
          Back to Listings
        </Link>
      </footer>
    </div>
  );
}
