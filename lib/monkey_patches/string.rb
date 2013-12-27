class String
  
  def wipe(str_or_re)
    self.dup.wipe!(str_or_re)
  end

  def wipe!(str_or_re)
    str_or_re = str_or_re.to_s unless str_or_re.is_a?(Regexp)
    self.sub!(str_or_re, '')
  end

end
