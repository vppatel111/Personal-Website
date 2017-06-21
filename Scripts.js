// Canvas Polar Clock, alot of help from: https://codepen.io/pankajparashar/pen/sIpyw
(function() {

  //Entry Point
  window.onload = function(e) {

    startTime();

    var canvas = document.getElementById("canvas");

    var point = new Point(400, 400, 400);
    var clock = new PolarClock(canvas, point, 15, 2);
    clock.color = ["#444", "#555", "#666", "#777", "#888", "#999"];
    clock.start(25);

    $( "#overlay" ).click(function() {
      $( "#overlay" ).fadeOut(400);
      $( ".card" ).fadeOut(400);
    });

    $( ".chip" ).click(function() {
      $( "#overlay" ).fadeIn(400);
      $( ".card" ).fadeIn(400);
    });

    $("#home").click(function(){
      $("#mainbody").hide();
      $("#mainbody").slideDown("slow");
      // $("#mainbody").text("Home");
    });

    $( "#me" ).on( "click", function() {
      $("#mainbody").hide();
      $("#mainbody").slideDown("slow");
      $("#mainbody").text("My passion for coding began in highschool, where I\
      first took a computer\
      program course to sate my curiosity. That curiosity promptly blossomed\
      from there as I could apply my maths and science interest to something\
      modern. I was captivated by the ability to create anything I wanted with\
      freely available tools. This eventually led to me combining my maths and\
      science interests with my passion leading me to enroll in University of\
      Alberta to study Software Engineering.");
    });

    $("#projects").click(function(){
      $("#mainbody").hide();
      $("#mainbody").slideDown("slow");
    });

    $( ".time" ).hover(function(){
      $( ".time" ).animate({left: '1300px',
                            top: '275px'});

      // $("#home").fadeIn(400);
      $( "#home" ).animate({top: '44%',
                            left: '1170px',
                            opacity: '1'});

      // $("#me").fadeIn(400);
      $( "#me" ).animate({top: '56%',
                          left: '1230px',
                          opacity: '1'});

      // $("#projects").fadeIn(400);
      $( "#projects" ).animate({top: '64%',
                                left: '1350px',
                                opacity: '1'});

      console.log("Activated");
    });

  };

  function off() {
    $( "#overlay" ).hide();
  }

  //Point
  var Point = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  };

  // Polar clock
  var PolarClock = function(canvas, point, line, margin, color) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.point = point;
    this.line = line;
    this.margin = margin;
    this.color = color || ["#333", "#555", "#777", "#999", "#BBB", "#DDD"];
  };

  PolarClock.prototype.start = function(interval) {
    var self = this;
    var point = this.getPoint();

    setInterval(function() {
      self.step(point);
    }, interval);
  };

  PolarClock.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  // Get point
  PolarClock.prototype.getPoint = function() {
    return new Point(this.point.x, this.point.y, this.point.radius);
  };

  // Return point
  PolarClock.prototype.step = function(point) {
    var now = getTimeRadian();
    var line = this.line;
    var margin = this.margin;
    var color = this.color;

    this.clear();
    if (color[0]) this.draw(0, point, now.second);
    if (color[1]) this.draw(1, point, now.minute);
    if (color[2]) this.draw(2, point, now.hour);
    if (color[3]) this.draw(3, point, now.weekday);
    if (color[4]) this.draw(4, point, now.date);
    if (color[5]) this.draw(5, point, now.month);
  };

  // Draw the clock
  PolarClock.prototype.draw = function(index, point, radian) {
    this.point = new Point(
      point.x,
      point.y,
      point.radius - (this.line + this.margin) * index
    );

    this.arc(this.color[index], this.line, 0, radian);
  };

  // Calculate the arc needed for each hand
  PolarClock.prototype.arc = function(color, width, start, end) {
    var context = this.context;
    var point = this.point;
    var x = -point.y;
    var y = point.x;
    var r = point.radius - width;

    context.save();
    context.rotate(-Math.PI / 2);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.arc(x, y, r, start, end, false);
    context.stroke();
    context.restore();
  };

  // Private methods
  var getTimeRadian = function() {
    var now = new Date();
    var eom = getEndOfMonth(now);

    var second = (now.getSeconds() + now.getMilliseconds() / 1000) * Math.PI / 30;
    var minute = (now.getMinutes() * Math.PI / 30) + second / 60;
    var hour = (now.getHours() * Math.PI / 12) + minute / 24;
    var weekday = (now.getDay() * Math.PI / 3.5) + hour / 7;
    var date = ((now.getDate() - 1) * Math.PI / (eom/2)) + hour / eom;
    var month = (now.getMonth() * Math.PI / 6) + date / 12;

    return {
      second: second,
      minute: minute,
      hour: hour,
      weekday: weekday,
      date: date,
      month: month
    };
  };

  // End of months for febuaray
  var getEndOfMonth = function(date) {

      var eom;
      var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var year = date.getYear();
      var month = date.getMonth();

      if (month == 1 && year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        return 29;
      } else {
        return days[month];
      }
    };

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    $("#time").text(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);

  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

})();
