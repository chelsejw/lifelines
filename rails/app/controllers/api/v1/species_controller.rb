module Api 
    module V1
        class SpeciesController < ApplicationController
            # GET /appeals
            # GET /appeals.json
            def index
              @species = Species.all
              render json: @species
            end

     
            private

              # Only allow a list of trusted parameters through.
              def species_params
                params.require(:species).permit(:name)
              end
          end 
    end
end