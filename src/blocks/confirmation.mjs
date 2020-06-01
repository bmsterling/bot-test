import invariant from 'invariant';

function confirmation(context, isForAssignie = false) {
  invariant(typeof context === 'object', '`context` must be an object');
  invariant(
    typeof isForAssignie === 'boolean',
    '`isForAssignie` must be boolean'
  );

  const {
    channel,
    issuer,
    priority,
    title
  } = context;

  let text = 'You\'ve assigned a task';

  // change title/text for the assignie
  if (isForAssignie) {
    text = 'A Task has been assigned to you!';
  }

  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${text}!*`
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Task*: ${title}`
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*Priority*: ${priority}`
        }
      ]
    }
  ];

  // give action items only to the assignie
  if (isForAssignie) {
    blocks.push({
      'type': 'actions',
      'elements': [
        {
          action_id: 'completed',
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Completed',
            emoji: true
          },
          value: context.issuer
        },
      ]
    });
  } else {
    blocks.push({
      type: 'context',
        elements: [{
        type: 'mrkdwn',
        text: `*Not completed* :arrows_counterclockwise:`
      }]
    })
  }

  return {
    channel,
    text,
    blocks: JSON.stringify(blocks)
  }
}

export default confirmation;
