/* 
  Setup clocks array to store each clock.
*/
var clocks = [];

var Clock = function(balls) {

  // Initialize clock properties
  this.balls = balls;
  this.ballQueue = [];

  this.minutes = [];
  this.fiveMinutes = [];
  this.hours = [];
  this.days = 0;

  this.buildBallQueue();
  this.runCycle();

};

Clock.prototype.buildBallQueue = function() {
  for ( var i = 1; (i < this.balls + 1); i++ ) {
    this.ballQueue.push(i);
  }
};

Clock.prototype.compareQueue = function() {

  var q1 = this.originalBallQueue,
      q2 = this.ballQueue;

  if (q1.length !== q2.length) {
    return false;
  }

  for ( var i = q1.length; i > 0; i-- ) {
    if ( q1[i] !== q2[i] ) {
      return false;
    }
  }

  return true;

};

Clock.prototype.runCycle = function() {

  // copy ball queue so we know when we match the original again.
  this.originalBallQueue = this.ballQueue.slice(0);

  while ( this.ballQueue.length > 0 ) {
    
    this.addOneMinute();
    if ( this.compareQueue() ) {
      return true;  
    }

  }

};

Clock.prototype.addOneMinute = function() {

  this.minutes.push( this.ballQueue.shift() );

  if ( this.minutes.length == 5 ) {
    this.addFiveMinutes();
  }

};

Clock.prototype.addFiveMinutes = function() {
  
  this.fiveMinutes.push( this.minutes.pop() );
  this.ballQueue = this.ballQueue.concat( this.minutes.reverse() );
  this.minutes = []; // empty minutes

  if ( this.fiveMinutes.length == 12 ) {
    this.addOneHour();
  }

};

Clock.prototype.addOneHour = function() {

  this.hours.push( this.fiveMinutes.pop() );
  this.ballQueue = this.ballQueue.concat( this.fiveMinutes.reverse() );
  this.fiveMinutes = [];

  if ( this.hours.length == 12 ) {
    this.addTwelfthHour();
  }

};

Clock.prototype.addTwelfthHour = function() {

  var twelfthBall = this.hours.pop();

  this.days += 0.5;
  this.ballQueue = this.ballQueue.concat( this.hours.reverse() );
  this.ballQueue.push(twelfthBall);
  this.hours = [];

};

var getInput = function() {

  var balls = document.getElementById("balls").value.split(/\s+/);
  return balls;

};

var getOutput = function() {

  var output = '';

  for ( var i = 0; i < clocks.length; i++ ) {
    
    output += clocks[i].balls + " balls cycle after " + clocks[i].days + " days." + "<br />";

  }
  
  document.getElementById('output').innerHTML = '';
  document.getElementById('output').innerHTML = output;

};

var initialize = function() {

  clocks = [];
  var balls = getInput();
  
  for ( var i = 0; i < balls.length; i++ ) {

    if ( parseInt(balls[i]) !== 0 && balls[i] > 27 && balls[i] < 127 ) {
      clocks[i] = new Clock( parseInt(balls[i]) );
    } 

  }

  getOutput();

};

document.getElementById("submit").addEventListener("click", initialize);