require_relative '../spec_helper.rb'

describe REAL::Parser do
  describe '#parse' do

    subject(:parser) { REAL::Parser.new() }

    context "parse simple sample file successfully" do
      before { parser.io = fixture_file('reversible_circuit.real') }
      it { should parse_successfully }
    end

    context "fails to parse an invalid file" do
      before { parser.io = '.foobar' }
      it { should_not parse_successfully }
    end

    context "parse uncommon real-style files successfully" do
      subject { REAL::Parser.new(fixture_file('hwb8_113.real')) }
      it { should parse_successfully }
      subject { REAL::Parser.new(fixture_file('ryy6_256.real')) }
      it { should parse_successfully }
    end

    context "when working on the complete database", slow: true do
      fixtures.each do |fixture_file|
        name = fixture_file.sub(%r{.*test/fixtures/}, '')
        context "parsing the file #{name}" do
          subject { REAL::Parser.new(fixture_file(fixture_file)) }
          it { should parse_successfully }
        end
      end
    end

  end
end

