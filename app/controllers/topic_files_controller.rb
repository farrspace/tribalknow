class TopicFilesController < ApplicationController
  def index
    @topic = Topic.friendly.find(params[:topic_id])
  end

  def show
  end

  def create
    @topic = Topic.friendly.find(params[:topic_id])
    asset = @topic.topic_files.create :asset=>params[:file]
    respond_to do |format|
      return format.json { render :json=>asset.as_json.merge(:thumb_url=>asset.asset.url(:thumb), :url=>asset.asset.url) }
    end
    return head :ok
  end

  def destroy
    
  end
end
