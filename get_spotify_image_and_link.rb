require "dotenv/load"

require "active_support"
require "cgi"
require "json"
require "net/http"
require "open-uri"
require "openssl"
require "uri"
require "yaml"

YAML_FRONT_MATTER_REGEXP = %r{\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)}m.freeze

files = Dir["./recordings/**/*.md"]

def beautify(text)
  return unless text
  text.gsub(/\302\240/, " ").delete("\t").delete("\n").squeeze(" ").strip
end

def details(front_matter)
  title = beautify(front_matter["title"].tr("-", " "))
  performer = beautify(front_matter["performer"])
  slug = front_matter["slug"]
  [title, performer, slug]
end

def spotify_info(title, performer)
  search_string = CGI.escape(title + " " + performer)

  url = URI("https://api.spotify.com/v1/search?type=album&q=" + search_string)

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Get.new(url)
  require "dotenv/load"
  request["Authorization"] = "Bearer #{ENV["SPOTIFY_AUTH_TOKEN"]}"

  response = http.request(request)
  json = JSON.parse(response.read_body)

  image_url = json["albums"]["items"][0]["images"].find { |i| i["height"] == 640 }["url"]
  spotify_url = json["albums"]["items"][0]["external_urls"]["spotify"]
  [image_url, spotify_url]
rescue => exception
  pp "**** Failed", exception, title, performer
  [nil, nil]
end

def save_image(url, slug)
  return unless url
  IO.copy_stream(
    URI.parse(url).open,
    "./src/images/recordings/#{slug}.jpg"
  )
end

files.each do |recording|
  file = File.read(recording)
  matches = file.match(YAML_FRONT_MATTER_REGEXP)
  if matches && matches[0]
    front_matter = YAML.safe_load(matches[0])
    title, performer, slug = details(front_matter)
    image_url, spotify_url = spotify_info(title, performer)
    save_image(image_url, slug) if image_url
    if spotify_url
      front_matter["spotify_url"] = spotify_url
      File.write(recording, YAML.dump(front_matter))
    end
  end
end
