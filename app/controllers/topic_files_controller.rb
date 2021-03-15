class TopicFilesController < ApplicationController
  def index
    @topic = Topic.friendly.find(params[:topic_id])
  end

  def show
  end

  def create
    @topic = Topic.friendly.find(params[:topic_id])
    @topic.topic_files.create asset: params[:file]

    render "index.json"
  end

  def destroy
    
  end
end
