import consumer from "./consumer"

consumer.subscriptions.create({channel: "ConversationChannel", conversation_id: 2}, {
  connected() {
    console.log(`connected on convos`)
 
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
  },

});
