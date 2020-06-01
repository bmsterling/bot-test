import confirmation from '../blocks/confirmation.mjs';
import callAPIMethod from '../utils/callAPIMethod.mjs';
import assignPair from '../db/index.mjs';

const sendConfirmation = async (ticket) => {
  let channel = await callAPIMethod('conversations.open', {
    users: [ticket.selectedUserId]
  });

  let message = confirmation({
    channel: channel.channel.id,
    title: ticket.title,
    priority: ticket.priority,
    issuer: ticket.userId,
  }, true);

  const resultAssignee = await callAPIMethod('chat.postMessage', message)

  channel = await callAPIMethod('conversations.open', {
    users: [ticket.userId]
  });

  message = confirmation({
    channel: channel.channel.id,
    title: ticket.title,
    priority: ticket.priority,
    issuer: ticket.userId,
  });

  const resultAssigner = await callAPIMethod('chat.postMessage', message)

  assignPair.set(resultAssignee.ts, resultAssigner)
};

async function create(userId, view) {
  const {
    state: {
      values: {
        title_block: {
          title: {
            value: title,
          }
        },
        priority_block: {
          priority: {
            selected_option: {
              text: {
                text: priority = 'low',
              } = {},
            } = {},
          }
        },
        selected_user: {
          user: {
            selected_user,
          }
        }
      },
    },
  } = view;

  const result = await callAPIMethod('users.info', {
    user: selected_user,
  });

  await sendConfirmation({
    userId,
    selectedUserId: selected_user,
    title,
    priority,
  });
}

export default create
