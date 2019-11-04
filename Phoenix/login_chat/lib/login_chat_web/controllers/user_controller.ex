defmodule LoginChatWeb.UserController do
  use LoginChatWeb, :controller
  alias LoginChat.User

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.html", users: users)
  end
end


