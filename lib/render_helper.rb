module RenderHelper

  def rrender(partial, vars={}, opts={})
    opts = opts.merge({locals: vars})
    haml partial, opts
  end

  PROVIDER_TRIPLES = [
    %w{provide_js coffee/ .coffee coffee js},
    %w{provide_css scss/ .scss scss css},
  ].each do |method_name, prefix, ext, invoker, default|
    define_method method_name.to_sym do |sym|
      if exists?("#{prefix}#{sym}#{ext}")
        self.method(invoker.to_sym)[:"#{prefix}#{sym}"]
      else
        send_file Provide.public.join(default, sym.to_s)
      end
    end
  end

  private

  def exists?(view_path)
    Provide.views.join(view_path).exist?
  end

end

