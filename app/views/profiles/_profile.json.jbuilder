json.extract! profile, :id, :user_id, :username, :display_name, :img_url, :address, :type, :verified, :created_at, :updated_at
json.url profile_url(profile, format: :json)
