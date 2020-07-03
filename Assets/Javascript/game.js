
// Objects
function fighter(name, healthPoints, attackPower, counterAttackPower) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
};
// Functions
function populateFighters() {
    fighters = [];

    fighters[0] = new fighter("Aeldari", 120, 8, 15);
    fighters[1] = new fighter("Space_Marines", 100, 14, 5);
    fighters[2] = new fighter("Orks", 180, 7, 25);
    fighters[3] = new fighter("Chaos", 150, 8, 20);

    clearRow("fgtSelect");
    clearRow("enemy");
    $("#player-1").html("");
    $("#defender-1").html("");
    $("#attackLog").html("");

    fighters.forEach(function (fighter, index) {
        createCharCard(fighter, index, "fgtSelect");
    });
}

function createCharCard(fighter, colNum, colType) {

    let fgtSelect;
    if (colType === "inactive") {
        fgtSelect = `#enemy-${colNum}`;
    } else {
        fgtSelect = `#${colType}-${colNum}`;
    }

    let cardDiv = $("<div>");

    cardDiv.attr("class", `card ${colType}`);
    cardDiv.attr("id", `${fighter.name}`);

    let cardHeader = $("<div>");
    cardHeader.attr("class", "card-header");
    cardHeader.html(fighter.name);

    let cardBody = $("<div>");
    cardBody.attr("class", "card-body");

    let image = $("<img>");
    image.attr("src", `./Assets/images/${fighter.name}.jpg`);
    image.attr("alt", `${fighter.name}`);

    cardBody.append(image);

    let cardFooter = $("<div>");
    cardFooter.attr("class", "card-footer");
    cardFooter.html(`HP: <span id = "${fighter.name}-HP">${fighter.healthPoints}</span>`);

    cardDiv.append(cardHeader);
    cardDiv.append(cardBody);
    cardDiv.append(cardFooter);

    $(fgtSelect).append(cardDiv);
}
function clearRow(colType) {
    for (let i = 0; i < 4; i++) {
        let cardLoc = `#${colType}-${i}`;
        $(cardLoc).html("");
    }
}
function startGame() {
    fighters;
    player;
    playerLv = 1;
    defender;

    populateFighters();
}

// 
let fighters;
let player;
let playerLv;
let defender;
startGame();

$(document).ready(function () {

    // Select a fighter
    $(".fgtSelect").on("click", function () {
        let fighterName = $(this).attr("id");

        fighters.forEach(function (fighter, index) {
            if (fighter.name === fighterName) {
                let playerTmp = fighters.splice(index, 1);

                player = playerTmp[0];
                createCharCard(player, 1, "player");
            }
        });
        fighters.forEach(function (fighter, index) {
            createCharCard(fighter, index, "enemy")
        });
        clearRow("fgtSelect");
    });

    // Select an enemy
    $(document).on("click", ".enemy", function () {
        let defenderName = $(this).attr("id");

        $("#attack").toggleClass("active inactive");

        fighters.forEach(function (fighter, index) {
            if (fighter.name === defenderName) {
                let defenderTmp = fighters.splice(index, 1);

                defender = defenderTmp[0];

                createCharCard(defender, 1, "defender");
            }
        });
        clearRow("enemy");
        fighters.forEach(function (fighter, index) {
            createCharCard(fighter, index, "inactive");
        });
    });

    // attack button
    $(document).on("click", "#attack.active", function () {

        let defenderP = $("<p>");
        let playerP = $("<p>");
        let winner = $("<p>");
        
        defender.healthPoints -= (player.attackPower * playerLv);
        playerLv++;

        $("#attackLog").html("");
        
        defenderP.html(`${defender.name} take ${player.attackPower * playerLv} damage`);
        $("#attackLog").append(defenderP);
        $(`#${defender.name}-HP`).html(defender.healthPoints);
        
        let restart = $("<button>");
        restart.html("Restart Game");
        restart.attr("id", "restart");
        restart.addClass("btn active");
        
        let victory = $("<button>");
        victory.html("Victory!");
        victory.attr("id", "victory");
        victory.addClass("btn active");

        if (defender.healthPoints <= 0) {
            $("#attack").toggleClass("active inactive");
            winner.html(`${player.name} Victory`);
            $("#attackLog").append(winner);
            
            
            if (fighters.length < 1) {
                $("#attackLog").append(`<p>Total Victory</p>`);
                $("#attackLog").append(restart);
            } else {
                $("#attackLog").append(victory);
            }
        } else {
            player.healthPoints -= defender.counterAttackPower;
            playerP.html(`${player.name} take ${defender.counterAttackPower} damage`);
            $("#attackLog").append(playerP);
            $(`#${player.name}-HP`).html(player.healthPoints);
            
            if (player.healthPoints <= 0) {
                $("#attack").toggleClass("active inactive");
                winner.html(`${defender.name} Victory`);
                $("#attackLog").append(winner);
    
                $("#attackLog").append(restart);
            }
        }
    });

    // restart button
    $(document).on("click", "#restart.active", function () {
        location.reload();
    });

    // victory button
    $(document).on("click", "#victory.active", function () {
        $("#attackLog").html("");
        $("#defender-1").html("");

        fighters.forEach(function (fighter) {
            let name = fighter.name;
            $(`#${name}`).toggleClass("enemy inactive");
        });
    });
});
