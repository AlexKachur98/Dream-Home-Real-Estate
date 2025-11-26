

import createModel from '../mysql/model.js';

const PropertySustainabilityModel = (async () => {
  const model = await createModel('Property_Sustainability', { primaryKey: 'sustainability_id' });
  return model;
})();

export default PropertySustainabilityModel;
