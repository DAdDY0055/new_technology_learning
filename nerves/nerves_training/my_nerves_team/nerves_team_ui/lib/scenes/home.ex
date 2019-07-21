defmodule NervesTeamUI.Scene.Home do
  use Scenic.Scene
  require Logger

  alias Scenic.Graph
  alias Scenic.ViewPort

  import Scenic.Primitives
  # import Scenic.Components

  @note """
  NervesTeam
  """

  @text_size 8

  # ============================================================================
  # setup

  # --------------------------------------------------------
  def init(_, opts) do
    ScenicFontPressStart2p.load()

    {:ok, %ViewPort.Status{size: {width, height}}} = ViewPort.info(opts[:viewport])

    center = {0.5 * width, 0.5 * height}

    graph =
      Graph.build(font: ScenicFontPressStart2p.hash(), font_size: @text_size)
      |> text(@note, text_align: :center, translate: center) 

     {:ok, %{
      graph: graph,
      viewport: opts[:viewport]
     }, push: graph}
  end

  # def handle_input(event, _context, state) do
  #  Logger.info("Received event: #{inspect(event)}")
  #  {:noreply, state}
  # end
end
