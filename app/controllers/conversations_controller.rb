class ConversationsController < ApplicationController
  def index
    conversations = Conversation.joins(:users).where('users.id' => current_user.id)
    render json: conversations
  end

  def create
    conversation = Conversation.new(conversation_params)
    if conversation.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ConversationSerializer.new(conversation)
      ).serializable_hash
      ActionCable.server.broadcast 'conversations_channel', serialized_data
      head :ok
    end
  end
  
  private
  
  def conversation_params
    params.require(:conversation).permit(:id, :lifeline_id, :user_ids=>[])
  end
end