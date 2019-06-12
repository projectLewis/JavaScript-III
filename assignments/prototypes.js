/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(input) {
  this.createdAt = input.createdAt;
  this.name = input.name;
  this.dimensions = input.dimensions;
}
GameObject.prototype.destroy = function () {
  return `${ this.name } was removed from the game.`;
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(charInput) {
  GameObject.call(this, charInput);
  this.healthPoints = charInput.healthPoints;
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function () {
  return `${ this.name } took damage`;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(huInput) {
  CharacterStats.call(this, huInput);
  this.team = huInput.team;
  this.weapons = huInput.weapons;
  this.language = huInput.language;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function () {
  return `${ this.name } offers a greeting in ${ this.language }`;
}


/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Tongue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Tongue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  

function Hero(heroInput) {
  Humanoid.call(this, heroInput);
  this.alliance = heroInput.alliance;
}
Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.hook = function (opponent) {
  opponent.healthPoints -= 5;
  console.log(`${ this.name } connected with a strong uppercut.`);
  return damageAssess(opponent);
}
Hero.prototype.heal = function (opponent) {
  this.healthPoints += 3;
  console.log(`${ this.name } took a sip of some '[trademark]' blue sports water and feels a bit better.`);
  return selfAssess(this);
}
Hero.prototype.pose = function (opponent) {
  opponent.healthPoints -= 1;
  console.log(`${ this.name } performed an iconic hero pose. ${ opponent.name } got confused.`);
  return damageAssess(opponent);
}

function Villain(vilInput) {
  Humanoid.call(this, vilInput);
  this.alliance = vilInput.alliance;
}
Villain.prototype = Object.create(Humanoid.prototype);
Villain.prototype.super = function (opponent) {
  opponent.healthPoints /= 2;
  console.log(`${ this.name } unleashed a fury attack. Two piece, biscuits, mumbo sauce and half & half. ${ opponent.name } was not ready for those hands`);
  return damageAssess(opponent);
}
Villain.prototype.cheat = function (opponent) {
  opponent.healthPoints = 1;
  console.log(`${ this.name } used a cheat code. ${ opponent.name }'s HP fell all traumatically`);
  return damageAssess(opponent);
}
Villain.prototype.jab = function (opponent) {
  opponent.healthPoints -= 1;
  console.log(`${ this.name } struck with a light jab.`)
  return damageAssess(opponent);
}

const damageAssess = (challenger) => {
  if (challenger.healthPoints <= 0) {
    console.log(`>>>${ challenger.name }'s current health is ${ challenger.healthPoints }.`)
    return challenger.destroy();
  } else {
    return `>>>${ challenger.name }'s current health is ${ challenger.healthPoints }.`;
  }
}
const selfAssess = (self) => {
  return `>>>${ self.name }'s current health is ${ self.healthPoints }.`
}

// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

const dark = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 7,
  name: '"Not the Hero"',
  team: 'The Brute Squad',
  weapons: [
    'these hands',
  ],
  language: 'Elvish',
  alliance: 'bad',
});

const light = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 30,
  name: 'Some Guy',
  team: 'Forest Kingdom',
  weapons: [
    'Spirit Fingers',
    'Big Eyebrows',
  ],
  language: 'pig latin',
  alliance: 'good',
});

console.log(dark.jab(light));
console.log(light.heal());
console.log(dark.super(light));
console.log(light.heal());
console.log(light.pose(dark));
console.log(dark.super(light));
console.log(dark.jab(light));
console.log(light.heal());
console.log(light.heal());
console.log(dark.cheat(light));
console.log(dark.jab(light));
