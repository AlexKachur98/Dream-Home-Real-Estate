
import createModel from '../mysql/model.js';

const ClientModel = (async () => {
  const model = await createModel('Clients', { primaryKey: 'client_id' });
  return model;
})();

export default ClientModel;
