
import createModel from '../mysql/model.js';

const ShowingModel = (async () => {
  const model = await createModel('Showings', { primaryKey: 'showing_id' });
  return model;
})();

export default ShowingModel;

