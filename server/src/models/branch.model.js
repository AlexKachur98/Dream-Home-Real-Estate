
import createModel from '../mysql/model.js';

const BranchModel = (async () => {
  const model = await createModel('Branches', { primaryKey: 'branch_no' });
  return model;
})();

export default BranchModel;

