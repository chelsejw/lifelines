# app/controllers/messages_controller.rb

class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.user_id = current_user.id
    conversation = Conversation.find(message_params[:conversation_id])
    if message.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(message)
      ).serializable_hash
      MessagesChannel.broadcast_to conversation, serialized_data
      head :ok
    end
  end
  
  private
  
  def message_params
    params.require(:message).permit(:id, :text, :conversation_id)
  end
end