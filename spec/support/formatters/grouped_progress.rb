require "rspec/core/formatters/base_text_formatter"

class GroupedProgress < RSpec::Core::Formatters::BaseTextFormatter

  @@max_depth = 2
  @@depth = 0

  def example_group_started(example_group)
    super(example_group)
    if @@depth <= @@max_depth
      output.print "\n#{indent(@@depth)}#{example_group.description}: "
    end
    @@depth += 1
  end

  def example_group_finished(example_group)
    super(example_group)
    output.print "\n" if @@depth <= @@max_depth
    @@depth -= 1
  end

  def example_passed(example)
    super(example)
    output.print success_color(".")
  end

  def example_pending(example)
    super(example)
    output.print pending_color("*")
  end

  def example_failed(example)
    super(example)
    output.print failure_color("F")
  end

  def start_dump
    super()
    # output.puts
  end

  def start(example_count)
    super(example_count)
    output.print "==Working on #{example_count} example(s)=======\n"
  end

  def stop()
    super()
    output.puts "================================"
  end

  private
  @@indent_spaces_per_level = 2
  def indent(level)
    " " * (level * @@indent_spaces_per_level)
  end

end
