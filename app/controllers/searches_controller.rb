class SearchesController < ApplicationController


  def index
    @results = get_sphinx_search_results params[:q]
    @results.context[:panes] << ThinkingSphinx::Panes::ExcerptsPane
    respond_to do |format|
      format.html #do nothing, defaults to default template
      format.json do
        @results.map!{|result| { label: result.title, category: result.class.model_name.human, url: resource_url(result) }}
        render :json => @results.to_a
      end
    end
  end

  private
  def get_sphinx_search_results(term)
    ThinkingSphinx.search term,
                          :excerpts => { :limit=>255, :around=>20 },
                          :classes => [Question, Answer, Topic, Note],
                          :with=>{ :tenant_id => Tenant.current_id }

  end

  def resource_url(resource)
    resource.instance_of?(Answer) ? url_for(resource.question) : url_for(resource)

  end
end
