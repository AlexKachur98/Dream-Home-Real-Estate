
import createModel from '../mysql/model.js';

const PropertyGalleryModel = (async () => {
  const model = await createModel('Property_Gallery', { primaryKey: 'gallery_id' });
  return model;
})();

export default PropertyGalleryModel;

