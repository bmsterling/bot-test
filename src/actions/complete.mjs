import completion from '../blocks/completion.mjs';
import assignPair from '../db/index.mjs';
import callAPIMethod from '../utils/callAPIMethod.mjs';


async function complete(userId, container, originalMessage) {
  let channel = await callAPIMethod('conversations.open', {
    users: [userId],
  });

  const assigneeData = assignPair.get(container.message_ts);

  const {
    ts,
    message: assigneeMessage,
  } = assigneeData;

  const {
    blocks,
  } = assigneeMessage;

  blocks.pop();

  let message = completion({
    channel: channel.channel.id,
    ts,
    originalMessage: assigneeMessage,
  });

  let result = await callAPIMethod('chat.update', message);

  message = completion({
    channel: container.channel_id,
    ts: container.message_ts,
    originalMessage,
  }, true);

  result = await callAPIMethod('chat.update', message);
}

export default complete;
