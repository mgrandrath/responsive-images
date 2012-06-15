#!/usr/bin/env ruby

require "rubygems"
require "sinatra"
require "haml"

helpers do
  def partial (template, locals = {})
    haml(template, :layout => false, :locals => locals)
  end
end

get "/" do
  response.set_cookie("cookie", 1)
  seen_before = request.cookies["cookie"].to_i == 1
  @screen_type = request.cookies["screenType"] || "unknown"

  @no_js = @screen_type != "unknown" || seen_before
  @show_choice = @screen_type == "unknown" || @screen_type == "small"

  haml :index
end

post "/choice" do
  response.set_cookie("cookie", 1)
  response.set_cookie("screenType", params["choice"]) if params["choice"]
  redirect "/"
end

