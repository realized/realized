Raphael._Paper.prototype.line = function(lx,ly, rx, ry) {
  return this.path(["M", lx, ly, "L", rx, ry]);
};
