require File.expand_path('../config/environment', __dir__)

require 'telegram/bot'

token = ENV['TELEGRAM_BOT_API_KEY']

Telegram::Bot::Client.run(token) do |bot|
  bot.listen do |message|
    case message.text
    when '/start'
        if Bot.exists?(chat_id: message.from.id)
            bot.api.send_message(chat_id: message.chat.id, text: "#{message.from.first_name}, you've already pressed start. You can use the command /latest to get the five latest appeals.")
        else
            Bot.create(chat_id: message.from.id, name: message.from.first_name, started: true, step: "start")
            bot.api.send_message(chat_id: message.chat.id, text: "Thanks for subscribing for Lifeline updates #{message.from.first_name}!")
        end
    when '/unsubscribe'
        if Bot.exists?(chat_id: message.from.id)
            Bot.where(chat_id: message.from.id).destroy
            bot.api.send_message(chat_id: message.chat.id, text: "You have unsubscribed from Lifeline appeal updates.")
        else
            bot.api.send_message(chat_id: message.chat.id, text: "You are not currently subscribed.")
        end
    end
    when '/latest'
        appeals = Appeal.last(5).reverse
        messages = appeals.map {|appeal| "\n A #{appeal.species.name} donor is needed at #{appeal.clinic.name}. Go to http://lifelines.herokuapp.com/appeals/#{appeal.id} to help! \n"}
        block = messages.reduce("") {|m1,m2| m1 + m2}
        bot.api.send_message(chat_id: message.chat.id, text: block)
    end
  end
end
