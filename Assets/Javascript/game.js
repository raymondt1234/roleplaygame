// Classes
class fighter {
    constructor(name, healthPoints, attackPower, counterAttackPower) {
        this.name = name;
        this.healthPoints = healthPoints;
        this.attackPower = attackPower;
        this.counterAttackPower = counterAttackPower;
    }
    toString() {
        return "Name: " + this.name + "  HP: " + this.healthPoints + "  AP: " + this.attackPower + "  CAP: " + this.counterAttackPower;
    }
}
// Functions
function populateFighters() {
    fighters = [];

    fighters[0] = new fighter("Aeldari", 100, 8, 25);
    fighters[1] = new fighter("Space Marines", 150, 6, 15);
    fighters[2] = new fighter("Orks", 180, 5, 10);
    fighters[3] = new fighter("Chaos", 140, 7, 15);
}
function showFighters() {
    console.log("");
    console.log("<+-------= Current Fighters =-------+>");
    fighters.forEach(function (fighter, index, fighters) {
        console.log(fighters[index].toString());
    });
    console.log("<+----------------------------------+>");
    console.log("");
}

// 
let fighters = [];
console.log("Start game.js...");
console.log("");
populateFighters();
showFighters();


console.log(fighters.splice(2,1).toString());

showFighters();

console.log(fighters.splice(2,1).toString());

showFighters();

populateFighters();
showFighters();