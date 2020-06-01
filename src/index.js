import dotenv from 'dotenv';

import debug from 'debug';

import express from 'express';
import bodyParser from 'body-parser';

import _ from 'lodash';

import rawBodyBuffer from './utils/rawBodyBuffer.mjs';
import accessEnv from './utils/accessEnv.mjs';

import command from './command.mjs';
import isVerified from './utils/isVerified.mjs';
import complete from './actions/complete.mjs';
import create from './actions/create.mjs';

dotenv.config();

const log = debug('donut');

const PORT = accessEnv('PORT', 5000);

const app = express();

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.get('/', (req, res) => {
  res.send('<h2>Yay! You got here!</h2>');
});

app.post('/command', command);

app.post('/interactive', (req, res) => {
  if (req.body.challenge != undefined) {
    res.send(req.body.challenge)
  }

  // Verify the signing secret
  if (!isVerified(req)) {
    log('Verification token mismatch');
    return res.status(404).send();
  }

  res.send('');

  if (req.body.payload) {
    const body = JSON.parse(req.body.payload);
    const {
      type,
    } = body;

    // handle submission of from
    if (type === 'view_submission') {
      create(body.user.id, body.view);

    // handle clicking of the complete button
    } else if (type === 'block_actions') {
      const [ currentAction ] = body.actions;

      // only interact with the action of complete
      if (currentAction.action_id === 'completed') {
        complete(currentAction.value, body.container, body.message);
      }
    }
  }
});

const server = app.listen(PORT, () => {
  log(
    'Express server listening on port %d in %s mode',
    server.address().port,
    app.settings.env
  );
});
