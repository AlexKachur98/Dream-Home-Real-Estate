
import createModel from "../mysql/model.js";

const PropertySchoolsModel = (async () => {
  const model = await createModel('Property_Schools', { primaryKey: 'property_id' });
  return model;
})();

export default PropertySchoolsModel;
