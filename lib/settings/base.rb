module Settings

  class Base

    CONFIG_DIR = File.join(APP_ROOT, 'config')

    class << self
      def set(symbol, value)
        define_singleton_method symbol do
          instance_variable_get(:"@#{symbol}")
        end
        define_singleton_method :"#{symbol}=" do |val|
          instance_variable_set(:"@#{symbol}", val)
        end
        self.send(:"#{symbol}=", value)
      end
    end

  end

end

