

import createModel from '../mysql/model.js';

const PropertyFloorplansModel = (async () => {
  const model = await createModel('Property_Floorplans', { primaryKey: 'property_id' });
  return model;
})();

export default PropertyFloorplansModel;

