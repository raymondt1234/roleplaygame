// Classes
class fighter {
    constructor(name, healthPoints, attackPower, counterAttackPower) {
        this.name = name;
        this.healthPoints = healthPoints;
        this.attackPower = attackPower;
        this.counterAttackPower = counterAttackPower;
    }
    toString() {
        return `Name: ${this.name} HP: ${this.healthPoints} AP: ${this.attackPower} CAP: ${this.counterAttackPower}`;
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
    clearRow("fgtSelect");
    console.log("");
    console.log("<+-------= Current Fighters =-------+>");
    fighters.forEach(function (fighter, index, fighters) {
        console.log(fighters[index].toString());
        createCharCard(fighters[index], index, "fgtSelect");
    });
    console.log("<+----------------------------------+>");
    console.log("");
}
function createCharCard(fighter, index, rowType) {
    let fgtSelect = "#" + rowType + "-" + index;
    $(fgtSelect).append(`<div class="card ${rowType}" id = ${fighter.name} style="width:175px"><div class="card-header">${fighter.name}</div><div class="card-body"><img class="img-responsive" src="Assets/images/${fighter.name}.jpg"alt="${fighter.name}"></div><div class="card-footer">HP: ${fighter.healthPoints}</div>`);
}
function clearRow(rowType) {

    for (let i = 0; i < 4; i++) {
        let cardLoc = "#" + rowType + "-" + i;
        $(cardLoc).html("");
    }
}

// 
let fighters = [];
let player;
console.log("Start game.js...");
console.log("");
populateFighters();
showFighters();

$(".fgtSelect").on("click", function() {
    fighterName = $(this).attr("id");
    fighters.forEach(function (fighter, index, fighters) {
        if (fighters[index].name === fighterName) {
            player = [fighters.splice(index, 1), 1];
            
            createCharCard(fighters[index], index, "playerCard");
        }
    });
    clearRow("fgtSelect");
});

// console.log(fighters.splice(2, 1).toString());

// showFighters();

// console.log(fighters.splice(2, 1).toString());

// showFighters();

// populateFighters();
// showFighters();