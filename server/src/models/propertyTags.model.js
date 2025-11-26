
import createModel from '../mysql/model.js';

const PropertyTagsModel = (async () => {
  const model = await createModel('Property_Tags', { primaryKey: 'property_id' });
  return model;
})();

export default PropertyTagsModel;
