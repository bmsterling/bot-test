import invariant from 'invariant';

function completion(context) {
  invariant(typeof context === 'object', '`context` must be an object');

  const {
    channel,
    originalMessage: {
      blocks,
    },
    ts,
  } = context;

  blocks.pop();

  blocks.push(      {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `*Completed* :white_check_mark:`
      }
    ]
  });

  return {
    channel,
    ts,
    as_user: true,
    blocks: JSON.stringify(blocks)
  }
}

export default completion;
