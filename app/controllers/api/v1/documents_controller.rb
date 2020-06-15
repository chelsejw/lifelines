module Api 
    module V1
        class DocumentController < ApplicationController
            # GET /appeals
            # GET /appeals.json
            def index
              @documents = Document.all
              render json: @documents
            end

            def create
                @document = Document.new(document_params)
                if @document.save
                  render json: {document: @document}
                else
                  render json: {errors: @document.errors}, status: 422
                end
            end

            private

              # Only allow a list of trusted parameters through.
              def document_params
                params.require(:document).permit(:url, :type)
              end
          end 
    end
end