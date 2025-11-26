/**
 * @file PropertyCard.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Renders a compact summary card for property listings.
 */

import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const {
    property_id,
    title,
    address,
    price,
    beds,
    baths,
    area,
    status,
    hero_image,
    type,
    monthly_fees,
    lifestyle_tags = [],
    lifestyle_narrative,   // lifestyle_narrative
    open_house
  } = property;

  console.log('Rendering PropertyCard for:', property);
//   address
// : 
// "300 Front St W, Toronto, ON"
// agent_id
// : 
// "DH101"
// area
// : 
// "1200 sqft"
// baths
// : 
// "1.0"
// beds
// : 
// 1
// created_at
// : 
// "2025-11-27T03:32:27.000Z"
// description
// : 
// "Stunning 1-bed + den loft in the Fashion District. 12-foot ceilings, exposed brick, and a private rooftop terrace with BBQ hookup."
// hero_image
// : 
// "/images/loft1.jpg"
// last_updated
// : 
// "2025-11-27T03:32:27.000Z"
// lifestyle_narrative
// : 
// "Ideal for urban professionals who love to entertain. The open-concept layout is perfect for hosting, and the rooftop terrace offers amazing city views."
// lot_size
// : 
// "N/A"
// mls_number
// : 
// "C5678904"
// monthly_fees
// : 
// "800.00"
// neighborhood
// : 
// "The Fashion District is one of Toronto's trendiest neighborhoods, with art galleries, boutique shops, and some of the city's best restaurants."
// open_house
// : 
// "Sun, Jun 16, 2:00-4:00 PM"
// price
// : 
// "1299000.00"
// property_id
// : 
// "PROP004"
// status
// : 
// "For Sale"
// taxes
// : 
// "4800.00"
// title
// : 
// "Downtown Loft with Rooftop Terrace"
// transit_score
// : 
// 95
// type
// : 
// "Loft"
// walk_score
// : 
// 98
// year_built
// : 
// 2010

  return (
    <article className="property-card">
      <div className="property-card__media">
        <img src={hero_image} alt={`${title} preview`} loading="lazy" />
        <span className="property-card__badge">{status}</span>
      </div>

      <div className="property-card__body">
        <h4>{title}</h4>
        <p className="property-card__address">{address}</p>
        <p className="property-card__type">{type}</p>

        <div className="property-card__metrics">
          <span>{beds} bd</span>
          <span>{baths} ba</span>
          <span>{area}</span>
        </div>

        {monthly_fees ? <p className="property-card__fees">Fees: {monthly_fees}</p> : null}

        {/* Surface quick lifestyle tags for scanning user intents. */}
        {/* {lifestyle_tags.length ? (
          <ul className="property-card__tags">
            {lifestyle_tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null} */}
        {lifestyle_narrative ? (
          <p className="property-card__narrative">{lifestyle_narrative}</p>
        ) : null}

        <div className="property-card__footer">
          <strong>{price}</strong>
          <Link to={`/properties/${property_id}`} className="property-card__cta">
            View Details
          </Link>
        </div>

        <div className="property-card__secondary">
          <span>{open_house}</span>
          <button type="button" className="property-card__tour">
            Book Tour
          </button>
        </div>
        {/* TODO (Backend Team): wire CTA into lead router once /api/leads is live. */}
      </div>
    </article>
  );
}
