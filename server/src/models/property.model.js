
import createModel from '../mysql/model.js';

const PropertyModel = (async () => {
  const model = await createModel('Properties', { primaryKey: 'property_id' });
  return model;
})();

export default PropertyModel;

