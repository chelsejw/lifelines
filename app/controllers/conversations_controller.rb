class ConversationsController < ApplicationController 
    def index
      @conversations = Conversation.all
      render json: @conversations
    end

    def show
      @conversation = Conversation.where(token: params[:id])
      render json: @conversation
    end


    def create
    
      @conversation = Conversation.new(conversation_params)
      if @conversation.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          ConversationSerializer.new(@conversation)
        ).serializable_hash
        ActionCable.server.broadcast 'conversations_channel', serialized_data
        head :ok
      end
    end
    
    private
    def conversation_params
      params.require(:conversation).permit(:id, :token, :lifeline_id, :user_ids => [], :messages_ids => [])
    end
  end