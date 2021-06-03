ENV["BLOCKED_IPS"].to_s.split(/,\s*/).each do |ip|
  if ip.match?(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
    Rack::Attack.blocklist_ip(ip)
  end
end

# Block suspicious requests for '/etc/password', wordpress, or CGI paths.
Rack::Attack.blocklist('fail2ban suspicious paths') do |request|
  # `filter` returns truthy value if request fails, or if it's from a previously banned IP
  # so the request is blocked
  Rack::Attack::Allow2Ban.filter("suspicious-paths-#{request.ip}", maxretry: 5, findtime: 10.minutes, bantime: 60.minutes) do
    path = request.path

    # The count for the IP is incremented if the return value is truthy
    CGI.unescape(request.query_string).include?("/etc/passwd") ||
    path.include?('/etc/passwd') ||
    path.include?('wp-admin') ||
    path.include?('wp-login') ||
    path.start_with?('/.svn') ||
    path.start_with?('/cgi-') ||
    path.start_with?('/scripts/')
  end
end
