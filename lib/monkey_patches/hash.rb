class Hash

  def array_assoc(key, val)
    self.dup.array_assoc! key, val
  end

  def array_assoc!(key, val)
    self[key] ||= []
    self[key] << val
    self
  end

end
