// Creek-bed contour lines behind the opening. Drawn once, redrawn on resize.
(function () {
  var c = document.getElementById('contours');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d');
  function draw() {
    var r = c.getBoundingClientRect();
    var d = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    c.width = w * d; c.height = h * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var lines = Math.round(h / 15) + 16;
    for (var i = 0; i < lines; i++) {
      var t = i / lines;
      var base = -120 + i * 15;
      // lines pinch together toward the "channel" on the right-hand side
      ctx.beginPath();
      for (var x = -10; x <= w + 10; x += 6) {
        var u = x / w;
        var pinch = Math.exp(-Math.pow((u - 0.72) / 0.22, 2));
        var y = base
          + Math.sin(u * 5.2 + t * 4.0) * 26
          + Math.sin(u * 11.0 - t * 7.0 + 1.3) * 9
          + (0.5 - t) * pinch * 150
          + u * 90;
        if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      var major = i % 5 === 0;
      ctx.lineWidth = major ? 1.1 : 0.7;
      ctx.strokeStyle = major ? 'rgba(217,201,163,0.30)' : 'rgba(217,201,163,0.13)';
      ctx.stroke();
    }
    // fade the left so the headline stays clean
    var g = ctx.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, 'rgba(31,58,77,0.92)');
    g.addColorStop(0.55, 'rgba(31,58,77,0.35)');
    g.addColorStop(1, 'rgba(31,58,77,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  draw();
  var timer;
  window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(draw, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
})();
