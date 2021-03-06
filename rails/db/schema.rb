# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_15_102001) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appeals", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "clinic_id", null: false
    t.bigint "species_id", null: false
    t.string "pet_name"
    t.string "description"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "img_url"
    t.index ["clinic_id"], name: "index_appeals_on_clinic_id"
    t.index ["species_id"], name: "index_appeals_on_species_id"
    t.index ["user_id"], name: "index_appeals_on_user_id"
  end

  create_table "bots", force: :cascade do |t|
    t.integer "chat_id"
    t.string "name"
    t.boolean "started"
    t.string "step"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "clinics", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "address"
    t.string "phone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "conversations", force: :cascade do |t|
    t.bigint "lifeline_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "token"
    t.index ["lifeline_id"], name: "index_conversations_on_lifeline_id"
  end

  create_table "conversations_users", force: :cascade do |t|
    t.bigint "conversation_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["conversation_id"], name: "index_conversations_users_on_conversation_id"
    t.index ["user_id"], name: "index_conversations_users_on_user_id"
  end

  create_table "documents", force: :cascade do |t|
    t.bigint "verification_id", null: false
    t.string "url"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["verification_id"], name: "index_documents_on_verification_id"
  end

  create_table "lifelines", force: :cascade do |t|
    t.bigint "appeal_id", null: false
    t.bigint "user_id", null: false
    t.boolean "confirmed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["appeal_id"], name: "index_lifelines_on_appeal_id"
    t.index ["user_id"], name: "index_lifelines_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "conversation_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "text"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "display_name"
    t.string "img_url"
    t.string "address"
    t.string "account_type"
    t.boolean "verified"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "bio"
    t.string "username"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "species", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "verifications", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "authorizer_id"
    t.string "verification_for"
    t.string "status"
    t.text "details"
    t.string "owner_name"
    t.string "mobile"
    t.string "pet_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["authorizer_id"], name: "index_verifications_on_authorizer_id"
    t.index ["user_id"], name: "index_verifications_on_user_id"
  end

  add_foreign_key "appeals", "clinics"
  add_foreign_key "appeals", "species"
  add_foreign_key "appeals", "users"
  add_foreign_key "conversations", "lifelines"
  add_foreign_key "conversations_users", "conversations"
  add_foreign_key "conversations_users", "users"
  add_foreign_key "documents", "verifications"
  add_foreign_key "lifelines", "appeals"
  add_foreign_key "lifelines", "users"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "users"
  add_foreign_key "profiles", "users"
  add_foreign_key "verifications", "users"
  add_foreign_key "verifications", "users", column: "authorizer_id"
end
