topic ||= @topic

json.topic_files do
  json.array!(topic.topic_files) do |file|
    json.file_name file.asset_file_name
    json.size file.asset_file_size
    json.size_human number_to_human_size(file.asset_file_size)
    json.preview_url file.preview_url
    json.url file.asset&.url
  end
end
