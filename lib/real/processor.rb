module REAL
  class Processor
    def initialize(file)
      @file = file
      @parser = Parser.new(@file)
      @transformer = Transformer.new
    end

    def parse
      @tree = @parser.parse
      @output = @transformer.apply(@tree)
    end
  end
end
