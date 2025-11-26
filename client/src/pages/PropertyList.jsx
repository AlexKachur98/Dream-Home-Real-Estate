/**
 * @file PropertyList.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Displays the portfolio of Dream Home Real Estate listings.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageSection from '../components/PageSection.jsx';
import PropertyCard from '../components/PropertyCard.jsx';

const STATUS_FILTERS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'For Sale', value: 'For Sale' },
  { label: 'Featured', value: 'Featured' },
  { label: 'New Listing', value: 'New Listing' },
];
const BED_FILTERS = ['Any', '2+', '3+', '4+', '5+'];
const LIFESTYLE_TAGS = ['Smart Home', 'Loft Living', 'Family Estate', 'River Views', 'Pool', 'City Views'];
const SORT_OPTIONS = [
  { label: 'Price (High to Low)', value: 'price-desc' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Newest Listings', value: 'newest' },
  { label: 'Days on Market', value: 'dom' },
];

export default function PropertyList() {
  const [listings, setListings] = useState([]);
  const [marketSummary, setMarketSummary] = useState({});
  const [filters, setFilters] = useState({
    status: 'all',
    beds: 'Any',
    priceRange: 'all',
    neighborhood: '',
    keyword: ''
  });
  const [sort, setSort] = useState('price-desc');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch properties and market summary
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Build query string from filters
        const query = new URLSearchParams();
        if (filters.status !== 'all') query.append('status', filters.status);
        if (filters.beds !== 'Any') query.append('beds', filters.beds);
        if (filters.priceRange !== 'all') query.append('priceRange', filters.priceRange);
        if (filters.neighborhood) query.append('neighborhood', filters.neighborhood);
        if (filters.keyword) query.append('keyword', filters.keyword);
        query.append('sort', sort);

        const response = await fetch(`/api/properties?${query.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setListings(data.properties);
          setMarketSummary(data.marketSummary);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters, sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // The useEffect will automatically refetch with new filters
  };

  const handleFilterReset = () => {
    setFilters({
      status: 'all',
      beds: 'Any',
      priceRange: 'all',
      neighborhood: '',
      keyword: ''
    });
  };

  return (
    <div className="page page--stacked property-list-page">
      <header className="page__header">
        <p className="eyebrow">Listings Portal</p>
        <h2>Available Listings</h2>
        <p>
          Explore highlighted inventory across the GTA. This scaffold mirrors pro brokerage portals so backend feeds can slot in with minimal rework.
        </p>
        <div className="listing-metrics">
          <article>
            <p>Active Inventory</p>
            <strong>{marketSummary.inventory || 0}</strong>
          </article>
          <article>
            <p>Avg Days on Market</p>
            <strong>{marketSummary.averageDaysOnMarket || 0}</strong>
          </article>
          <article>
            <p>Median List Price</p>
            <strong>{marketSummary.medianPrice || 'N/A'}</strong>
          </article>
          <article>
            <p>Last Refreshed</p>
            <strong>{marketSummary.lastUpdated || new Date().toLocaleDateString()}</strong>
          </article>
        </div>
        <div className="listing-actions">
          <button type="button">Save Search</button>
          <button type="button" className="button--ghost">
            Share Collection
          </button>
        </div>
      </header>

      <PageSection
        title="Search Filters"
        description="Filters are now connected to the backend API."
      >
        <form className="listing-filters" onSubmit={handleFilterSubmit}>
          <label>
            Status
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              {STATUS_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Beds
            <select
              name="beds"
              value={filters.beds}
              onChange={handleFilterChange}
            >
              {BED_FILTERS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Price Range
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="under1m">Under $1M</option>
              <option value="1to2">$1M - $2M</option>
              <option value="over2">Over $2M</option>
            </select>
          </label>
          <label>
            Neighborhood
            <input
              type="text"
              name="neighborhood"
              placeholder="e.g., Distillery, Leaside"
              value={filters.neighborhood}
              onChange={handleFilterChange}
            />
          </label>
          <label className="listing-filters__full">
            Keyword
            <input
              type="text"
              name="keyword"
              placeholder="View, pool, smart home..."
              value={filters.keyword}
              onChange={handleFilterChange}
            />
          </label>
          <div className="listing-filters__actions">
            <button type="submit">Apply Filters</button>
            <button type="button" className="button--ghost" onClick={handleFilterReset}>
              Reset
            </button>
          </div>
        </form>
      </PageSection>

      <PageSection title="Sort & Lifestyle Tags" description="Sorting ties into MLS feeds; tags mirror persona-driven curation.">
        <div className="listing-toolbar">
          <label>
            Sort Results
            <select
              value={sort}
              onChange={handleSortChange}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <div className="listing-toolbar__tags">
            {LIFESTYLE_TAGS.map((tag) => (
              <button key={tag} type="button" className="listing-tag">
                {tag}
              </button>
            ))}
          </div>
          <div className="listing-toolbar__cta">
            <p>Stay ahead of new releases in your favourite neighbourhoods.</p>
            <button type="button">Create Alert</button>
          </div>
        </div>
      </PageSection>

      <PageSection title="Featured Properties" description="Cards now show real data from the API.">
        {isLoading ? (
          <p>Loading properties...</p>
        ) : listings.length === 0 ? (
          <p>No properties match your criteria.</p>
        ) : (
          <div className="property-grid">
            {listings.map((listing) => (
              <PropertyCard heroImage={listing.hero_image} key={listing.property_id} property={listing} />
            ))}
          </div>
        )}
      </PageSection>

      <PageSection
        title="Market Intelligence"
        description="Embed lightweight trust signals so clients see us as advisors, not only transaction managers."
      >
        <div className="listing-intel">
          <article>
            <h4>Hot Price Bands</h4>
            <p>$1.2M - $1.6M accounted for 62% of accepted offers last week.</p>
          </article>
          <article>
            <h4>Neighbourhood Watch</h4>
            <p>Leaside and Distillery listings are averaging 2.1 tours before offer.</p>
          </article>
          <article>
            <h4>Buyer Signals</h4>
            <p>Tour requests spike between 7-9 PM. Keep CTA prominent for mobile visitors.</p>
          </article>
          <article>
            <h4>Coming Soon</h4>
            <p>Interactive map, school layers, and mortgage rate widgets land mid-sprint.</p>
          </article>
        </div>
      </PageSection>
    </div>
  );
};
