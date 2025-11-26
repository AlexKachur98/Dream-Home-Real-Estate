
import PropertyModel from '../models/property.model.js';
import PropertyGalleryModel from '../models/propertyGallery.model.js';
import PropertyHighlightsModel from '../models/propertyHighlights.model.js';
import PropertySustainabilityModel from '../models/propertySustainability.model.js';
import PropertyFloorplansModel from '../models/propertyFloorplans.model.js';
import PropertyDocumentsModel from '../models/propertyDocuments.model.js';
import PropertySchoolsModel from '../models/propertySchools.model.js';
import PropertyNearbyModel from '../models/propertyNearby.model.js';
import PropertyTagsModel from '../models/propertyTags.model.js';

export default {
  /**
   * Get all properties with optional filtering
   */
  getAllProperties: async (req, res) => {
    try {
      const { status, beds, priceRange, neighborhood, keyword } = req.query;
      const propertyModel = await PropertyModel;

      // Build WHERE clause based on filters
      const where = {};
      if (status && status !== 'all') where.status = status;
      if (neighborhood) where.address = `%${neighborhood}%`; // Simple LIKE search

      // Get base properties
      let properties = await propertyModel.find({ where });

      // Apply additional filters that can't be handled by the base query
      if (beds && beds !== 'Any') {
        const minBeds = parseInt(beds.replace('+', ''));
        properties = properties.filter(p => p.beds >= minBeds);
      }

      if (priceRange) {
        const [min, max] = getPriceRange(priceRange);
        properties = properties.filter(p => p.price >= min && p.price <= max);
      }

      if (keyword) {
        const searchTerm = keyword.toLowerCase();
        properties = properties.filter(p =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.lifestyle_narrative.toLowerCase().includes(searchTerm)
        );
      }

      // Sort properties
      const { sort } = req.query;
      if (sort) {
        properties = sortProperties(properties, sort);
      }

      // Get market summary
      const marketSummary = await getMarketSummary(propertyModel);

      return res.status(200).json({
        properties,
        marketSummary
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
      return res.status(500).json({
        message: 'Error fetching properties',
        error: error.message
      });
    }
  },

  /**
   * Get a single property by ID with all related data
   */
  getPropertyById: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const propertyModel = await PropertyModel;

      // Get base property
      const property = await propertyModel.findOne({ property_id: propertyId });
      if (!property) {
        return res.status(404).json({ message: 'Property not found.' });
      }

      // Get all related data
      const [
        gallery,
        highlights,
        sustainability,
        floorPlans,
        documents,
        schools,
        nearby,
        tags
      ] = await Promise.all([
        (await PropertyGalleryModel).find({ where: { property_id: propertyId }, orderBy: '`order` ASC' }),
        (await PropertyHighlightsModel).find({ where: { property_id: propertyId }, orderBy: '`order` ASC' }),
        (await PropertySustainabilityModel).find({ where: { property_id: propertyId }, orderBy: '`order` ASC' }),
        (await PropertyFloorplansModel).find({ where: { property_id: propertyId }, orderBy: '`order` ASC' }),
        (await PropertyDocumentsModel).find({ where: { property_id: propertyId }, orderBy: '`order` ASC' }),
        (await PropertySchoolsModel).find({ where: { property_id: propertyId }, orderBy: '`order` ASC' }),
        (await PropertyNearbyModel).find({ where: { property_id: propertyId }, orderBy: '`order` ASC' }),
        (await PropertyTagsModel).find({ where: { property_id: propertyId } })
      ]);

      // Get agent details
      let agent = null;
      if (property.agent_id) {
        const StaffModel = await (await import('../models/staff.model.js')).default;
        agent = await StaffModel.findOne({ staff_id: property.agent_id });
        if (agent) {
          agent = {
            name: `${agent.first_name} ${agent.last_name}`,
            email: agent.email,
            phone: agent.telephone
          };
        }
      }

      // Format the complete property object
      const completeProperty = {
        ...property,
        gallery: gallery.map(img => img.image_url),
        heroImage: gallery.find(img => img.is_hero)?.image_url || gallery[0]?.image_url || null,
        highlights: highlights.map(h => h.highlight_text),
        sustainability: sustainability.map(s => s.feature),
        floorPlans: floorPlans.map(fp => ({
          placeholder: fp.image_url,
          label: fp.label
        })),
        documents: documents.map(d => ({
          label: d.label,
          url: d.document_url
        })),
        schools: schools.map(s => ({
          name: s.name,
          distance: s.distance
        })),
        nearby: nearby.map(n => n.item),
        lifestyleTags: tags.map(t => t.tag),
        agent: agent || { name: 'Listing Agent', email: 'agent@example.com', phone: '(555) 555-5555' },
        disclosures: {
          mlsNumber: property.mls_number,
          taxes: property.taxes ? `$${property.taxes.toLocaleString()}` : 'N/A',
          lastUpdated: property.last_updated
        }
      };

      return res.status(200).json(completeProperty);
    } catch (error) {
      console.error('Error fetching property:', error);
      return res.status(500).json({
        message: 'Error fetching property',
        error: error.message
      });
    }
  },

  /**
   * Create a new property
   */
  createProperty: async (req, res) => {
    try {
      const propertyData = req.body;
      const propertyModel = await PropertyModel;

      // Validate required fields
      if (!propertyData.property_id || !propertyData.title || !propertyData.address || !propertyData.price) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }

      // Create the property
      const newProperty = await propertyModel.create({
        property_id: propertyData.property_id,
        title: propertyData.title,
        address: propertyData.address,
        price: propertyData.price,
        status: propertyData.status || 'For Sale',
        beds: propertyData.beds,
        baths: propertyData.baths,
        area: propertyData.area,
        lot_size: propertyData.lotSize,
        year_built: propertyData.yearBuilt,
        monthly_fees: propertyData.monthlyFees,
        type: propertyData.type,
        hero_image: propertyData.heroImage,
        description: propertyData.description,
        lifestyle_narrative: propertyData.lifestyleNarrative,
        neighborhood: propertyData.neighborhood,
        walk_score: propertyData.walkScore,
        transit_score: propertyData.transitScore,
        open_house: propertyData.openHouse,
        mls_number: propertyData.mlsNumber,
        taxes: propertyData.taxes,
        agent_id: propertyData.agentId
      });

      // Create related records
      if (propertyData.gallery) {
        const galleryModel = await PropertyGalleryModel;
        for (let i = 0; i < propertyData.gallery.length; i++) {
          await galleryModel.create({
            property_id: propertyData.property_id,
            image_url: propertyData.gallery[i],
            is_hero: i === 0, // First image is hero by default
            order: i
          });
        }
      }

      // Create other related records similarly...

      return res.status(201).json({
        message: 'Property created successfully',
        property: newProperty
      });
    } catch (error) {
      console.error('Error creating property:', error);
      return res.status(500).json({
        message: 'Error creating property',
        error: error.message
      });
    }
  },

  /**
   * Update a property
   */
  updateProperty: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const updates = req.body;
      const propertyModel = await PropertyModel;

      // Update the property
      const result = await propertyModel.update({ property_id: propertyId }, {
        title: updates.title,
        address: updates.address,
        price: updates.price,
        status: updates.status,
        beds: updates.beds,
        baths: updates.baths,
        area: updates.area,
        lot_size: updates.lotSize,
        year_built: updates.yearBuilt,
        monthly_fees: updates.monthlyFees,
        type: updates.type,
        description: updates.description,
        lifestyle_narrative: updates.lifestyleNarrative,
        neighborhood: updates.neighborhood,
        walk_score: updates.walkScore,
        transit_score: updates.transitScore,
        open_house: updates.openHouse,
        mls_number: updates.mlsNumber,
        taxes: updates.taxes,
        agent_id: updates.agentId
      });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Property not found.' });
      }

      // Update related records similarly...

      // Fetch the updated property
      const updatedProperty = await getPropertyById(propertyId);
      return res.status(200).json({
        message: 'Property updated successfully',
        property: updatedProperty
      });
    } catch (error) {
      console.error('Error updating property:', error);
      return res.status(500).json({
        message: 'Error updating property',
        error: error.message
      });
    }
  }
};

// Helper functions
function getPriceRange(range) {
  switch (range) {
    case 'under1m': return [0, 1000000];
    case '1to2': return [1000000, 2000000];
    case 'over2': return [2000000, Number.MAX_SAFE_INTEGER];
    default: return [0, Number.MAX_SAFE_INTEGER];
  }
}

function sortProperties(properties, sort) {
  switch (sort) {
    case 'price-desc':
      return [...properties].sort((a, b) => b.price - a.price);
    case 'price-asc':
      return [...properties].sort((a, b) => a.price - b.price);
    case 'newest':
      return [...properties].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    case 'dom':
      return [...properties].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    default:
      return properties;
  }
}

async function getMarketSummary(propertyModel) {
  const properties = await propertyModel.find();

  const inventory = properties.length;
  const averageDaysOnMarket = inventory > 0 ?
    properties.reduce((sum, p) => {
      const created = new Date(p.created_at);
      const updated = new Date(p.last_updated || p.created_at);
      const days = Math.floor((updated - created) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0) / inventory : 0;

  const prices = properties.map(p => p.price).filter(p => p);
  const medianPrice = inventory > 0 ?
    prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)] : 0;

  return {
    inventory,
    averageDaysOnMarket: Math.round(averageDaysOnMarket),
    medianPrice: medianPrice ? `$${Math.round(medianPrice / 1000)}K` : 'N/A',
    lastUpdated: new Date().toLocaleDateString()
  };
};
