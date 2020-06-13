import consumer from "./consumer"

consumer.subscriptions.create("MessagesChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log(`connected on messages`)
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(`received in messages`)
    var node = document.createElement("P"); 

    var textnode = document.createTextNode(data.content.text); 

    node.appendChild(textnode); 

    document.getElementById("new_message").appendChild(node);
    document.getElementById('chat_message').value= ''
  },
  speak: function() {
    return this.perform('speak');
  },
  $(document).on('submit', '.new_message', function(e) {
    e.preventDefault();
    var values = $(this).serializeArray();
    App.conversation.speak(values);
    $(this).trigger('reset');
  })
});
