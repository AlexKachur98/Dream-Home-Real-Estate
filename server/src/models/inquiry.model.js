
import createModel from '../mysql/model.js';

const InquiryModel = (async () => {
  const model = await createModel('Inquiries', { primaryKey: 'inquiry_id' });
  return model;
})();

export default InquiryModel;

