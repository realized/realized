class Array

  def any_included?(of_array)
    !self.any_included(of_array).nil?
  end

  def any_included(of_array)
    of_array.each { |el| return el if self.include?(el) }
    nil
  end

end
