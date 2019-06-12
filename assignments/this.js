/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1.  Window
* 2.  Implicit
* 3.  New
* 4.  Explicit

By default, this refers to the context of which it was called. Which would be the global environment (depending on the JS engine) if it is called outside of a function, oject, etc. If called within a function (exception arrow functions), this would apply to the parameter passed in. If called within an object this would apply to the object unless it is reassigned to something else within the object. Using 'new' allows this to apply to whatever generated it with new, as opposed to the origin function/object that created it. Lastly, you can reassign it to other 'this' instances with call or apply.
*
* write out a code example of each explanation above
*/

// Principle 1

console.log(this);
// code example for Window Binding
// doesnt work in node. But in the browser console returns anything attached to the WINDOW.

// Principle 2

// code example for Implicit Binding
function GameObject(input) {
  this.createdAt = input.createdAt;
  this.name = input.name;
  this.dimensions = input.dimensions;
}
GameObject.prototype.destroy = function () {
  return `${ this.name } was removed from the game.`;
}


// Principle 3
class GameObject2 {
  constructor(input) {
    this.createdAt = input.createdAt;
    this.name = input.name;
    this.dimensions = input.dimensions;
  }
}
const thing = new GameObject(thing2);

// code example for New Binding

// Principle 4
function CharacterStats(charInput) {
  GameObject.call(this, charInput);
  this.healthPoints = charInput.healthPoints;
}

// code example for Explicit Binding