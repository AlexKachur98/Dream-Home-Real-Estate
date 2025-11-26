
import createModel from '../mysql/model.js';

const PropertyHighlightsModel = (async () => {
  const model = await createModel('Property_Highlights', { primaryKey: 'highlight_id' });
  return model;
})();

export default PropertyHighlightsModel;
