module REAL
  class NoContentProvidedError < StandardError; end
  class InvalidIOContentError < StandardError; end

  class Parser
    attr_accessor :io
    attr_reader :parser

    def initialize(io=nil)
      @io = io
      @parser = InnerParser.new
    end

    def parse(content=nil)
      content = content ? content : provide_content
      self.parser.parse(content)
    end

    private
    def provide_content
      case io
      when String
        io
      when Tempfile
        io.open
        io.rewind
        io.read
      when IO
        io.read
      when Pathname
        io.read
      when NilClass
        raise NoContentProvidedError
      else
        raise InvalidIOContentError
      end
    end

  end
end
