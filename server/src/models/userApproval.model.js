
import createModel from '../mysql/model.js';

const UserApprovalModel = await createModel('UserApprovals', { primaryKey: 'approval_id' });

export default UserApprovalModel;
