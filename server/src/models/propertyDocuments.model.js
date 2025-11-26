
import createModel from '../mysql/model.js';

const PropertyDocumentsModel = (async () => {
  const model = await createModel('Property_Documents', { primaryKey: 'property_id' });
  return model;
})();

export default PropertyDocumentsModel;
