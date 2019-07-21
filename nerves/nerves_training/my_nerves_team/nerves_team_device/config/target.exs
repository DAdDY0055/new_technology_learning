use Mix.Config

# Authorize the device to receive firmware using your public key.
# See https://hexdocs.pm/nerves_firmware_ssh/readme.html for more information
# on configuring nerves_firmware_ssh.

keys =
  [
    Path.join([System.user_home!(), ".ssh", "id_rsa.pub"]),
    Path.join([System.user_home!(), ".ssh", "id_ecdsa.pub"]),
    Path.join([System.user_home!(), ".ssh", "id_ed25519.pub"])
  ]
  |> Enum.filter(&File.exists?/1)

if keys == [],
  do:
    Mix.raise("""
    No SSH public keys found in ~/.ssh. An ssh authorized key is needed to
    log into the Nerves device and update firmware on it using ssh.
    See your project's config.exs for this error message.
    """)

config :nerves_firmware_ssh,
  authorized_keys: [
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDT6lRp4wT80iA/GW2Vo+d37ytXGZ/e03h8znlPtwybn9k9ZDbx+EAc7jPNJmXsy7+lIpWGfYtBlgKZomEDYKI7HOSfQTtPS6mWRaHbP58lSkunLEL851kh3HO3/ikaC+TXZJEMtb+5NTJ+vwqg2ysrUlz1L91M0AQNk73eW+KLh/pSDsH5XCvVSWqrpMiHySL4IQV9eY+/4Q9Pq9D9vBk/jaSRXWhTUxo09IYxgVnYK2Sd9gxF97cM7mCQdj6A38bfMFrOZManlbGReUwpFoBWsIIDbGYvNBMsVQF7WLy0FGt4UGqYTZUppWZTEpkmiyMwPCVwBsfJtyXh1gQzU4iH nerves_training_id_rsa"
    ]

# Configure nerves_init_gadget.
# See https://hexdocs.pm/nerves_init_gadget/readme.html for more information.

# Setting the node_name will enable Erlang Distribution.
# Only enable this for prod if you understand the risks.
node_name = if Mix.env() != :prod, do: "nerves_team_device"

config :nerves_init_gadget,
  ifname: "usb0",
  address_method: :dhcpd,
  mdns_domain: "nerves.local",
  node_name: node_name,
  node_host: :mdns_domain

config :nerves_hub,
  fwup_public_keys: ["cUQiqF/KDPmuSq5AXi3YGdBs1gYRh3EoVYgjmJK/KQfo="]

config :nerves_network, :default,
  wlan0: [
    networks: [
      [
        ssid: "DRECOM-HS",
        psk: "drecom-0402",
        key_mgmt: :"WPA-PSK",
        scan_ssid: 1
      ]
   ]  
] 

config :nerves_team_ui, :viewport, %{
 size: {128, 64},
 default_scene: {NervesTeamUI.Scene.Home, nil},
 # drivers: [
 #  %{
 #    module: ScenicDriverOLEDBonnet
 #  }
 # ]
} 

# Import target specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
# Uncomment to use target specific configurations

# import_config "#{Mix.target()}.exs"
