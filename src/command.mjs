import form from './modals/form.mjs';
import callAPIMethod from './utils/callAPIMethod.mjs';
import isVerified from './utils/isVerified.mjs';

async function command(req, res) {
  if (!isVerified(req)) {
    return res.status(404).send();
  }

  // extract the slash command text, and trigger ID from payload
  const {
    trigger_id,
    user_id,
    text,
  } = req.body;

  let view = form({
    trigger_id,
    user_id,
    text,
  });

  let result = await callAPIMethod('views.open', view);

  return res.send('');
}

export default command;
