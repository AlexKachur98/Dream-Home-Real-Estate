/**
 * @file PropertyDetails.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Provides a deep-dive view for a single property listing.
 */
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageSection from '../components/PageSection.jsx';

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (isLoading) {
    return (
      <div className="page page--stacked">
        <header className="page__header">
          <h2>Loading Property...</h2>
        </header>
      </div>
    );
  }

  if (error || !property) {
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
    mapImage = '/placeholder-map.jpg', // Default placeholder
    floorPlans,
    documents,
    schools,
    nearby,
    agent,
    openHouse,
    walkScore,
    transitScore,
    lifestyleTags
  } = property;

  const handleScheduleTour = async () => {
  try {
    const name = req.user ? null : prompt('Please enter your name:');
    const email = req.user ? null : prompt('Please enter your email:');
    const phone = req.user ? null : prompt('Please enter your phone number:');

    const response = await fetch('/api/showings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        propertyId,
        requestedTime: new Date().toISOString(),
        name,
        email,
        phone
      }),
      credentials: 'include'
    });

    if (response.ok) {
      const result = await response.json();
      alert(`Tour requested successfully! Showing ID: ${result.showing.showing_id}`);
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.error('Error requesting tour:', error);
    alert('An error occurred while requesting the tour.');
  }
};

  const handleAskQuestion = async () => {
  try {
    const question = prompt('Please enter your question:');
    if (!question) return;

    const name = req.user ? null : prompt('Please enter your name:');
    const email = req.user ? null : prompt('Please enter your email:');
    const phone = req.user ? null : prompt('Please enter your phone number:');

    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        propertyId,
        question,
        name,
        email,
        phone
      }),
      credentials: 'include'
    });

    if (response.ok) {
      const result = await response.json();
      alert(`Question sent successfully! Inquiry ID: ${result.inquiry.inquiry_id}`);
    } 
    else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    };
  } 
  catch (error) {
    console.error('Error sending question:', error);
    alert('An error occurred while sending your question.');
  };
};

  return (
    <div className="page page--stacked">
      <header className="page__header property-detail__header">
        <div>
          <p className="property-detail__status">{status}</p>
          <h2>{title}</h2>
          <p>{address}</p>
        </div>
        <div className="property-detail__cta">
          <strong>{price.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}</strong>
          <div className="property-detail__cta-buttons">
            <button type="button" onClick={handleScheduleTour}>Schedule Tour</button>
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
        {heroImage && <img src={heroImage} alt={`${title} hero`} />}
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

      <PageSection title="Gallery" description="Property imagery from our media service.">
        <div className="property-gallery">
          {gallery?.map((image, index) => (
            <img key={image} src={image} alt={`${title} gallery ${index + 1}`} loading="lazy" />
          ))}
        </div>
        <div className="property-gallery__note">
          <p>Video walkthrough slot reserved for Matterport/YouTube embed.</p>
        </div>
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
            <dd>{monthlyFees ? monthlyFees.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) : 'N/A'}</dd>
          </div>
          <div>
            <dt>Open House</dt>
            <dd>{openHouse || 'None scheduled'}</dd>
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
          {highlights?.map((point) => (
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
              {sustainability?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </PageSection>

      <PageSection title="Documents & Floor Plans" description="Download links for property documents.">
        <div className="property-documents">
          <div>
            <h5>Floor Plans</h5>
            <div className="property-floorplans">
              {floorPlans?.map((plan) => (
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
              {documents?.map((doc) => (
                <li key={doc.label}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="link-button">
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection title="Location & Schools" description="Location information and nearby schools.">
        <div className="property-location">
          <img src={mapImage} alt={`${title} map`} loading="lazy" />
          <div>
            <h5>School Snapshot</h5>
            <ul>
              {schools?.map((school) => (
                <li key={school.name}>
                  <strong>{school.name}</strong> &mdash; {school.distance}
                </li>
              ))}
            </ul>
            <h5>Nearby Essentials</h5>
            <ul>
              {nearby?.map((item) => (
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

      <PageSection title="Arrange a Tour" description="Contact details for the listing agent.">
        <div className="property-agent">
          <div>
            <p className="property-agent__label">Listing Agent</p>
            <h4>{agent.name}</h4>
            <p>{agent.email}</p>
            <p>{agent.phone}</p>
          </div>
          <div className="property-agent__actions">
            <button type="button" onClick={handleScheduleTour}>Request Tour</button>
            <button type="button" className="button--ghost" onClick={handleAskQuestion}>
              Ask a Question
            </button>
          </div>
        </div>
      </PageSection>

      <footer className="property-detail__footer">
        <Link to="/properties" className="menu-card__cta">
          Back to Listings
        </Link>
      </footer>
    </div>
  );
};
