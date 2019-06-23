# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :login_chat,
  ecto_repos: [LoginChat.Repo]

# Configures the endpoint
config :login_chat, LoginChatWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "p8PP/Uj/XTI/4goAH8OIFOnZG6CopZGcvD3FKWnn7NaGoHhvrF3NKaEfQVD0DU3+",
  render_errors: [view: LoginChatWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: LoginChat.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
