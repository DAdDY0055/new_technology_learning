defmodule LoginChatWeb.PageController do
  use LoginChatWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
