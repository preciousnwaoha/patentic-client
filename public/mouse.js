(function() {
    var follower, init, mouseX, mouseY, positionElement, printout, timer;
  
    follower = document.getElementById('follower');
  
    printout = document.getElementById('printout');
  
    mouseX = (event) => {
      return event.clientX;
    };
  
    mouseY = (event) => {
      return event.clientY;
    };
  
    positionElement = (event) => {
      var mouse;
      mouse = {
        x: mouseX(event),
        y: mouseY(event)
      };
      follower.style.top = mouse.y + 'px';
      return follower.style.left = mouse.x + 'px';
    };
  
    timer = false;
  
    window.onmousemove = init = (event) => {
      var _event;
      _event = event;
      return timer = setTimeout(() => {
        return positionElement(_event);
      }, 1);
    };
  
  }).call(this);