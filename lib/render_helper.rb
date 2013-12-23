module RenderHelper

  def rrender(partial, vars={}, opts={})
    opts = opts.merge({locals: vars})
    haml partial, opts
  end

end

