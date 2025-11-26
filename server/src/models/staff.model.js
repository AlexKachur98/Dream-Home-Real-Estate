

import createModel from '../mysql/model.js';

const StaffModel = (async () => {
  const model = await createModel('Staff', { primaryKey: 'staff_id' });
  return model;
})();

export default StaffModel;
