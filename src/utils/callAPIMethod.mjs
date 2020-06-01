import axios from 'axios';
import invariant from 'invariant';
import qs from 'querystring';

import accessEnv from './accessEnv.mjs';

const apiUrl = 'https://slack.com/api';

async function callAPIMethod(method, payload) {
  invariant(method, 'Please provide a method');
  invariant(typeof payload === 'object', 'Payload must be an object')

  let data = Object.assign({ token: accessEnv('SLACK_ACCESS_TOKEN') }, payload);

  let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data));

  return result.data;

}

export default callAPIMethod;
