/**
 * @file properties.js
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Stores placeholder property data for listing/detail scaffolds.
 */
export const LISTING_MARKET_SUMMARY = {
  inventory: 38,
  averageDaysOnMarket: 21,
  medianPrice: '$1.42M',
  lastUpdated: 'Nov 03, 2025',
};

export const PROPERTY_LISTINGS = [
  {
    id: 'dh-101',
    title: 'Modern Riverside Retreat',
    address: '18 Willowbank Crescent, Toronto, ON',
    price: '$1,850,000',
    beds: 4,
    baths: 3,
    area: '2,850 sq ft',
    status: 'For Sale',
    type: 'Detached',
    lotSize: '52 x 132 ft',
    yearBuilt: 2019,
    monthlyFees: null,
    lifestyleTags: ['River Views', 'Smart Home', 'Luxury'],
    openHouse: 'Saturday 1-4 PM',
    walkScore: 74,
    transitScore: 82,
    heroImage: 'https://placehold.co/768x512?text=Riverside+Retreat',
    gallery: [
      'https://placehold.co/640x420?text=Living+Room',
      'https://placehold.co/640x420?text=Chef+Kitchen',
      'https://placehold.co/640x420?text=Primary+Suite',
    ],
    highlights: [
      'Floor-to-ceiling windows with Don River views',
      'Heated driveway and EV charging ready garage',
      'Smart home automation throughout all levels',
    ],
    description:
      'Contemporary architecture meets resort-inspired amenities in this refined four-bedroom retreat. The open-concept main level blends seamlessly with the outdoor lounge, creating year-round entertaining space.',
    lifestyleNarrative:
      'Steps from the Don Valley trails with a private dock launch nearby, this home targets move-up buyers who prioritize wellness and tech-forward convenience.',
    neighborhood:
      'Situated within the sought-after Leaside school district with quick access to Bayview dining, artisan markets, and boutique fitness studios.',
    sustainability: [
      'Triple-pane glazing on all exterior elevations',
      '12kW rooftop solar array tied to battery backup',
      'High-efficiency hydronic heating and cooling zones',
    ],
    disclosures: {
      mlsNumber: 'MLS# C905101',
      taxes: '$8,420 (2025)',
      lastUpdated: 'Nov 02, 2025',
    },
    mapImage: 'https://placehold.co/960x360?text=Map+Preview',
    floorPlans: [
      { label: 'Main Level Plan', url: '#', placeholder: 'https://placehold.co/600x400?text=Main+Floor' },
      { label: 'Upper Level Plan', url: '#', placeholder: 'https://placehold.co/600x400?text=Upper+Floor' },
    ],
    documents: [
      { label: 'Feature Sheet', url: '#' },
      { label: 'Home Inspection', url: '#' },
    ],
    schools: [
      { name: 'Bessborough Drive Elementary', distance: '0.9 km' },
      { name: 'Leaside High School', distance: '1.4 km' },
    ],
    nearby: ['Sunnybrook Park', 'Bayview Village', 'Evergreen Brick Works'],
    agent: {
      name: 'Kara Sterling',
      phone: '(416) 555-1010',
      email: 'kara.sterling@dreamhome.ca',
    },
  },
  {
    id: 'dh-204',
    title: 'Heritage Loft in Distillery District',
    address: '55 Trinity Street #402, Toronto, ON',
    price: '$1,150,000',
    beds: 2,
    baths: 2,
    area: '1,420 sq ft',
    status: 'New Listing',
    type: 'Condo Loft',
    lotSize: null,
    yearBuilt: 1895,
    monthlyFees: '$856/mo',
    lifestyleTags: ['Historic', 'Loft Living', 'City Views'],
    openHouse: 'Contact Agent',
    walkScore: 96,
    transitScore: 92,
    heroImage: 'https://placehold.co/768x512?text=Heritage+Loft',
    gallery: [
      'https://placehold.co/640x420?text=Exposed+Brick',
      'https://placehold.co/640x420?text=Loft+Kitchen',
      'https://placehold.co/640x420?text=Rooftop+Terrace',
    ],
    highlights: [
      'Exposed brick, timber beams, and 12 ft ceilings',
      'Private rooftop terrace overlooking the skyline',
      'Boutique building with concierge and parking',
    ],
    description:
      'This Distillery District loft blends the character of 19th-century architecture with the convenience of modern finishes. Custom millwork and an oversized island anchor the living space, perfect for creatives or entertainers.',
    lifestyleNarrative:
      'Ideal for hybrid professionals who split days between studio work and client meetings downtown, the flexible den space doubles as a podcast nook or gallery wall.',
    neighborhood:
      'Moments from the Distillery lanes, with curated cafes, galleries, and weekend markets drawing steady foot traffic year-round.',
    sustainability: [
      'Nest Thermostat and smart shades pre-wired',
      'Water-efficient fixtures throughout the ensuite',
      'Energy benchmarking reports available on request',
    ],
    disclosures: {
      mlsNumber: 'MLS# C905204',
      taxes: '$4,920 (2025)',
      lastUpdated: 'Nov 01, 2025',
    },
    mapImage: 'https://placehold.co/960x360?text=Distillery+Map',
    floorPlans: [{ label: 'Loft Floor Plate', url: '#', placeholder: 'https://placehold.co/600x400?text=Loft+Plan' }],
    documents: [
      { label: 'Status Certificate', url: '#' },
      { label: 'Condo Budget Summary', url: '#' },
    ],
    schools: [
      { name: 'Inglenook Community School', distance: '0.4 km' },
      { name: 'St. Michael Catholic School', distance: '0.8 km' },
    ],
    nearby: ['Corktown Common', 'King Streetcar', 'Canary District'],
    agent: {
      name: 'Miguel Alvarez',
      phone: '(416) 555-2040',
      email: 'miguel.alvarez@dreamhome.ca',
    },
  },
  {
    id: 'dh-317',
    title: 'Oakridge Family Estate',
    address: '112 Oakridge Boulevard, Markham, ON',
    price: '$2,400,000',
    beds: 5,
    baths: 4.5,
    area: '3,950 sq ft',
    status: 'Featured',
    type: 'Estate',
    lotSize: '75 x 145 ft',
    yearBuilt: 2012,
    monthlyFees: null,
    lifestyleTags: ['Family Estate', 'Pool', 'Library'],
    openHouse: 'Sunday 12-3 PM',
    walkScore: 58,
    transitScore: 61,
    heroImage: 'https://placehold.co/768x512?text=Oakridge+Estate',
    gallery: [
      'https://placehold.co/640x420?text=Backyard+Pool',
      'https://placehold.co/640x420?text=Library',
      'https://placehold.co/640x420?text=Sunroom',
    ],
    highlights: [
      'Saltwater pool with cabana and outdoor kitchen',
      'Main floor library with custom built-ins',
      'Heated floors on lower level media lounge',
    ],
    description:
      'Set on a tree-lined boulevard, this Oakridge estate delivers refined living across three levels. A sun-drenched conservatory, designer kitchen, and expansive backyard create effortless family gatherings.',
    lifestyleNarrative:
      'Zoned for top-ranked Markham schools, the property focuses on multigenerational living with a private guest suite and homework lounge off the kitchen.',
    neighborhood:
      'Oakridge Boulevard is known for its mature canopy streets, nearby golf courses, and proximity to Highway 404 for commuters.',
    sustainability: [
      'Geothermal heating loop with smart zoning',
      'Greywater recycling for irrigation',
      'LED landscape lighting with dusk sensors',
    ],
    disclosures: {
      mlsNumber: 'MLS# N905317',
      taxes: '$10,780 (2025)',
      lastUpdated: 'Nov 02, 2025',
    },
    mapImage: 'https://placehold.co/960x360?text=Oakridge+Map',
    floorPlans: [
      { label: 'Estate Overview', url: '#', placeholder: 'https://placehold.co/600x400?text=Estate+Plan' },
      { label: 'Lower Level', url: '#', placeholder: 'https://placehold.co/600x400?text=Lower+Level' },
    ],
    documents: [
      { label: 'Pool Specifications', url: '#' },
      { label: 'Energy Audit', url: '#' },
    ],
    schools: [
      { name: 'William Berczy Public School', distance: '1.2 km' },
      { name: 'Unionville High School', distance: '2.5 km' },
    ],
    nearby: ['Angus Glen Golf Club', 'Unionville Main Street', 'Toogood Pond'],
    agent: {
      name: 'Priya Desai',
      phone: '(905) 555-0317',
      email: 'priya.desai@dreamhome.ca',
    },
  },
];

/**
 * Finds a property listing by its identifier.
 * @param {string} id - The property id slug.
 * @returns {object | undefined} matching listing data.
 */
export function getPropertyById(id) {
  return PROPERTY_LISTINGS.find((property) => property.id === id);
}

/**
 * Surface lightweight KPIs for the listings hero banner.
 * @returns {{inventory:number, averageDaysOnMarket:number, medianPrice:string, lastUpdated:string}}
 */
export function getMarketSummary() {
  return LISTING_MARKET_SUMMARY;
}
