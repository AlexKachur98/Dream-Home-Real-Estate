
import createModel from '../mysql/model.js';

const PropertyNearbyModel = (async () => {
  const model = await createModel('Property_Nearby', { primaryKey: 'property_id' });
  return model;
})();

export default PropertyNearbyModel;
