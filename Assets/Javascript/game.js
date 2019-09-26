$(document).ready(function () {
function fighter(name, healthPoints, attackPower, counterAttackPower) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
    this.toString = function () {
        return `Name: ${this.name} HP: ${this.healthPoints} AP: ${this.attackPower} CAP: ${this.counterAttackPower}`;
    }
};
// Functions
function populateFighters() {
    fighters = [];

    fighters[0] = new fighter("Aeldari", 100, 8, 25);
    fighters[1] = new fighter("Space Marines", 150, 6, 15);
    fighters[2] = new fighter("Orks", 180, 5, 10);
    fighters[3] = new fighter("Chaos", 140, 7, 15);

    clearRow("fgtSelect");
    fighters.forEach(function (fighter, index) {
        createCharCard(fighter, index, "fgtSelect");
    });
}
function showFighters() {
    
    console.log("");
    console.log("<+-------= Current Fighters =-------+>");
    fighters.forEach(function (fighter) {
        console.log(fighter.toString());
    });
    console.log("<+----------------------------------+>");
    console.log("");
}
function createCharCard(fighter, colNum, colType) {
    
    let fgtSelect;
    if (colType === "inactive") {
        fgtSelect = `#$enemy-${colNum}`
    } else {
        fgtSelect = `#${colType}-${colNum}`
    }

    $(fgtSelect).append(`<div class="card ${colType}" id = "${fighter.name}"><div class="card-header">${fighter.name}</div><div class="card-body"><img class="img-responsive" src="./Assets/images/${fighter.name}.jpg"alt="${fighter.name}"></div><div class="card-footer">HP: <span id = "${fighter.name}-HP">${fighter.healthPoints}</span></div>`);
}
function clearRow(colType) {
    for (let i = 0; i < 4; i++) {
        let cardLoc = "#" + colType + "-" + i;
        $(cardLoc).html("");
    }
}

// 
let fighters = [];
let player;
let playerLv = 1;
let defender;
console.log("Start game.js...");
console.log("");
populateFighters();
showFighters();

// $(document).ready(function () {
    // Select a fighter.
    $(".fgtSelect").on("click", function () {
        let fighterName = $(this).attr("id");
        
        fighters.forEach(function (fighter, index) {
            if (fighter.name === fighterName) {
                let playerTmp = fighters.splice(index, 1);

                player = playerTmp[0];
                createCharCard(player, 1, "player");
                showFighters();
            }             
        });
        fighters.forEach(function (fighter,index) {
            createCharCard(fighter, index, "enemy")
        });
        clearRow("fgtSelect");
    });
    // Select an enemy.
    $(".enemy").on("click", function () {
        console.log("enemy clicked");
        let defenderName = $(this).attr("id");
        console.log(`Defender Name: ${defenderName}`);
        
        fighters.forEach(function (fighter, index) {
            if (fighter.name === defenderName) {
                let defenderTmp = fighters.splice(index, 1);

                defender = defenderTmp[0];
                console.log(defender);
                
                createCharCard(defender, 1, "defender");
                showFighters();
            }             
        });
        clearRow("enemy");
        fighters.forEach(function (fighter,index) {
            createCharCard(fighter, index, "inactive")
        });
    });
});
