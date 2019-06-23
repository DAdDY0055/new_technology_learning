defmodule LoginChat.Repo do
  use Ecto.Repo,
    otp_app: :login_chat,
    adapter: Ecto.Adapters.Postgres
end
