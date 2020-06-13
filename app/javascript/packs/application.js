// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")
import "./application.scss"
//= require action_cable
//= require jquery3
//= require rails-ujs

/* global $, App, ActionCable */
this.App = {}
const cablePath = document.querySelector('meta[name=action-cable-url]').getAttribute('content')
App.cable = ActionCable.createConsumer(cablePath)
App.conversationChannel = App.cable.subscriptions.create(
  {
    channel: 'ConversationChannel'
  },
  {
    received (data) {
      console.log(data)
      if (data.userId === null) {
        $('#hello-all-users').html(`The time for all users is ${data.time}`)
      } else {
        $(`#hello-user-${data.userId}`).html(`The time for you is ${data.time}`)
      }
    },
    connected () {
      console.log('connected')
    },
    disconnected () {
      console.log('disconnected')
    }
  }
)
// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
