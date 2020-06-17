module Api 
    module V1
        class WebhooksController < ApplicationController
        skip_before_action :verify_authenticity_token

        def callback
            dispatcher.new(webhook, user).process
            render nothing: true, head: :ok
        end

        def webhook
            params['webhook']
        end

        def dispatcher
            BotMessageDispatcher
        end

        def from
            webhook[:message][:from]
        end

        def user
            @bot ||= Bot.find_by(telegram_id: from[:id]) || register_bot
        end

        def register_user
            @bot = Bot.find_or_initialize_by(telegram_id: from[:id])
            @bot.update_attributes!(first_name: from[:first_name], last_name: from[:last_name])
            @bot
        end
        end
    end
end