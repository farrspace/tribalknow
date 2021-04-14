# Read .env into ENV
# Hopefully more ergonomic than constantly sourcing the file.

if Rails.env.development? || Rails.env.test?
  env_path = Rails.root.join(".env")

  if File.exist?(env_path)
    env_content = File.read(env_path)

    read_keys = []

    env_content.each_line do |line|
      line.strip!
      next unless line.start_with?("export ")

      # double or single quoted vars
      matchdata = line.match(/export (\w+)="(.*)"$/) || line.match(/export (\w+)='(.*)'$/)

      unless matchdata
        puts "#{__FILE__} didn't understand .env line:"
        puts line
        next
      end

      key = matchdata[1]
      value = matchdata[2]

      read_keys << key

      ENV[key] = value
    end

    puts "#{__FILE__} Set from .env: #{read_keys.join(", ")}"
  end
end
