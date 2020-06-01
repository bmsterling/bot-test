import invariant from 'invariant';

function form(context) {
  invariant(typeof context === 'object', 'context must be an object')

  const {
    trigger_id,
    user_id,
    text,
  } = context;

  return {
    trigger_id,
    view: JSON.stringify({
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Submit a task'
      },
      callback_id: 'assign-task',
      submit: {
        type: 'plain_text',
        text: 'Assign'
      },
      blocks: [
      {
          block_id: 'title_block',
          type: 'input',
          label: {
            type: 'plain_text',
            text: 'Title'
          },
          element: {
            action_id: 'title',
            type: 'plain_text_input',
            initial_value: text,
          },
          optional: false
        },
        {
          block_id: 'selected_user',
          "type": "input",
          "element": {
            "type": "users_select",
            "action_id": "user",
            "placeholder": {
              "type": "plain_text",
              "text": "Select users",
              "emoji": true
            }
          },
          "label": {
            "type": "plain_text",
            "text": "Select a user to assign",
            "emoji": true
          },
          optional: false
        },
        {
          block_id: 'priority_block',
          type: 'input',
          label: {
            type: 'plain_text',
            text: 'Priority'
          },
          element: {
            action_id: 'priority',
            type: 'static_select',
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "High"
                },
                value: "high"
              },
              {
                text: {
                  type: "plain_text",
                  text: "Medium"
                },
                value: "medium"
              },
              {
                text: {
                  type: "plain_text",
                  text: "Low"
                },
                value: "low"
              }
            ]
          },
          optional: true
        }
      ]
    })
  }
}

export default form;
