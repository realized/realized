class String
  
  def wipe(str_or_re)
    self.dup.wipe!(str_or_re)
  end

  def wipe!(str_or_re)
    self.sub!(str_or_re, '')
  end

end
