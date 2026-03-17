const readline = require("readline-sync");
let playerName= "";
let playerHealth = 100;
let gold = 20;
let currentLocation = "village"
let visitedBefore = false;
let gameRunning = true;
let inventory = [];
let weaponDamage = 0;
let monsterDefense = 5;
let healingPotionValue = 30;

// Get player name using readline-sync

/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/

// Display the game title
console.log("Welcome to the Adventure Game");

// Add a welcome message
console.log("Prepare yourself for an epic journey!");

playerName = readline.question("What is your name? ");

console.log("Welcome! " + playerName);
console.log("Your starting gold is " + gold);

console.log("This is you current weapon damage: " + weaponDamage);
console.log("When you buy a sword, your weapon damage will increase by 10!");
console.log("This is what the Monsters Defense is!: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

// Giving the potion 30 points is a good amount for the health the hero has.

console.log("Using this potion will heal you for " + healingPotionValue + " health points!");

console.log("This is my starting location: " + currentLocation);

console.log("Have I been here before? " + visitedBefore);

// ===== MAIN GAME LOOP =====
while (gameRunning) {
    
    if (currentLocation === "village") {
        console.log("\n=== VILLAGE ===");
        console.log("You are in a peaceful village. Castles high around you, villagers going about their day. You can visit the blacksmith to buy a sword, or the shop to buy a healing potion.");
        console.log("What would you like to do? \n (1) Visit the blacksmith, \n (2) Visit the shop, \n (3) Enter the forest, \n (4) Check your status \n (5) Quit the game.");
        
        let villageChoice = readline.question("Enter your choice (1-5): ");
        
        if (villageChoice === "1") {
            currentLocation = "blacksmith";
        } else if (villageChoice === "2") {
            currentLocation = "shop";
        } else if (villageChoice === "3") {
            currentLocation = "forest";
        } else if (villageChoice === "4") {
            console.log("\n--- YOUR STATUS ---");
            console.log("Name: " + playerName);
            console.log("Health: " + playerHealth);
            console.log("Gold: " + gold);
            console.log("Weapon Damage: " + weaponDamage);
            console.log("\nInventory (" + inventory.length + " slots):");
            
            // ===== INVENTORY LOOP =====
            if (inventory.length === 0) {
                console.log("  [Empty]");
            } else {
                for (let i = 0; i < inventory.length; i++) {
                    console.log("  [" + (i + 1) + "] " + inventory[i]);
                }
            }
        } else if (villageChoice === "5") {
            console.log("Thanks for playing, " + playerName + "! Goodbye!");
            gameRunning = false;
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
    else if (currentLocation === "blacksmith") {
        console.log("\n=== BLACKSMITH ===");
        console.log("You are at the blacksmith. The blacksmith, Clyde, greets you warmly. He has a shiny sword on display that you can buy for 20 gold.");
        console.log("What would you like to do? \n (1) Buy the sword for 20 gold, \n (2) Return to the village.");
        
        let blacksmithChoice = readline.question("Enter your choice (1-2): ");
        
        if (blacksmithChoice === "1") {
            if (gold >= 20) {
                gold -= 20;
                weaponDamage = 10;
                inventory.push("Sword");
                console.log("You bought a shiny sword! Your weapon damage increased to " + weaponDamage + "! You now have " + gold + " gold remaining.");
            } else {
                console.log("You don't have enough gold to buy the sword. You need 20 gold but only have " + gold + ".");
            }
            currentLocation = "village";
        } else if (blacksmithChoice === "2") {
            currentLocation = "village";
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
    else if (currentLocation === "shop") {
        console.log("\n=== SHOP ===");
        console.log("You are at the shop. The shopkeeper smiles at you. She has healing potions for sale.");
        console.log("What would you like to do? \n (1) Buy a healing potion for 10 gold, \n (2) Return to the village.");
        
        let shopChoice = readline.question("Enter your choice (1-2): ");
        
        if (shopChoice === "1") {
            if (gold >= 10) {
                gold -= 10;
                inventory.push("Healing Potion");
                console.log("You bought a healing potion! You now have " + gold + " gold remaining.");
            } else {
                console.log("You don't have enough gold to buy a potion. You need 10 gold but only have " + gold + ".");
            }
            currentLocation = "village";
        } else if (shopChoice === "2") {
            currentLocation = "village";
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
    else if (currentLocation === "forest") {
        console.log("\n=== FOREST ===");
        console.log("You venture into a dark forest. The air is cold and silent...");
        console.log("Suddenly, a monster appears before you!");
        console.log("What would you like to do? \n (1) Fight the monster, \n (2) Use a healing potion, \n (3) Run back to the village.");
        
        let forestChoice = readline.question("Enter your choice (1-3): ");
        
        if (forestChoice === "1") {
            console.log("\n*** BATTLE START ***");
            let monsterHealth = 25;
            let monsterMaxHealth = 25;
            let battleRound = 1;
            let isDefending = false;
            let fleeAttempts = 0;
            let maxFleeAttempts = 2;
            let battleActive = true;
            
            // ===== BATTLE LOOP =====
            while (battleActive && playerHealth > 0 && monsterHealth > 0) {
                console.log("\n--- ROUND " + battleRound + " ---");
                console.log("[" + playerName + " HP: " + playerHealth + " | Monster HP: " + Math.max(0, monsterHealth) + "]");
                
                // Player's turn
                console.log("\nYour turn! What do you do?");
                console.log("(1) Attack  (2) Defend  (3) Use Potion  (4) Attempt Flee");
                
                let battleAction = readline.question("Choose action (1-4): ");
                
                // Reset defense flag for this round
                let playerDefended = false;
                let damageToMonster = 0;
                
                if (battleAction === "1") {
                    // ATTACK ACTION
                    let baseDamage = 5 + weaponDamage;
                    let critChance = Math.random();
                    
                    if (critChance > 0.75) {
                        damageToMonster = Math.round(baseDamage * 1.5);
                        console.log("*** CRITICAL HIT! ***");
                    } else {
                        damageToMonster = baseDamage;
                    }
                    
                    damageToMonster = Math.max(1, damageToMonster - monsterDefense);
                    monsterHealth -= damageToMonster;
                    console.log("You lunge forward and strike the monster!");
                    console.log("Monster takes " + damageToMonster + " damage!");
                    
                } else if (battleAction === "2") {
                    // DEFEND ACTION
                    playerDefended = true;
                    console.log("You take a defensive stance, ready to reduce incoming damage!");
                    
                } else if (battleAction === "3") {
                    // USE POTION ACTION
                    if (inventory.includes("Healing Potion")) {
                        let healAmount = healingPotionValue;
                        playerHealth = Math.min(100, playerHealth + healAmount);
                        inventory.splice(inventory.indexOf("Healing Potion"), 1);
                        console.log("You drink a healing potion and restore " + healAmount + " health!");
                        console.log("Current health: " + playerHealth);
                    } else {
                        console.log("You don't have any healing potions! The monster attacks!");
                        let monsterDamage = Math.round(Math.random() * 5) + 10;
                        playerHealth -= monsterDamage;
                        console.log("The monster hits you for " + monsterDamage + " damage!");
                    }
                    
                } else if (battleAction === "4") {
                    // FLEE ACTION
                    fleeAttempts++;
                    let fleeChance = Math.random();
                    
                    if (fleeAttempts <= maxFleeAttempts && fleeChance > 0.4) {
                        console.log("You manage to escape from the monster!");
                        battleActive = false;
                        currentLocation = "village";
                    } else if (fleeAttempts > maxFleeAttempts) {
                        console.log("The monster blocks your escape path! You must fight!");
                        let monsterDamage = 15;
                        playerHealth -= monsterDamage;
                        console.log("The monster attacks you for " + monsterDamage + " damage during your escape attempt!");
                    } else {
                        console.log("You fail to run away!");
                        let monsterDamage = 12;
                        playerHealth -= monsterDamage;
                        console.log("The monster catches you and deals " + monsterDamage + " damage!");
                    }
                    
                } else {
                    console.log("Invalid action! The monster seizes the opportunity to attack!");
                    let monsterDamage = 18;
                    playerHealth -= monsterDamage;
                    console.log("The monster hits you for " + monsterDamage + " damage!");
                }
                
                // If player didn't flee, monster attacks back
                if (battleActive && monsterHealth > 0 && battleAction !== "4") {
                    console.log("\nMonster's turn!");
                    
                    // Monster decides to attack or use special ability
                    let monsterAction = Math.random();
                    let incomingDamage = 0;
                    
                    if (monsterAction > 0.7) {
                        // Monster does a power attack
                        incomingDamage = 20;
                        console.log("The monster unleashes a fierce power attack for " + incomingDamage + " damage!");
                    } else {
                        // Normal attack
                        incomingDamage = Math.round(Math.random() * 8) + 8;
                        console.log("The monster claws at you for " + incomingDamage + " damage!");
                    }
                    
                    // Apply defense reduction
                    if (playerDefended) {
                        incomingDamage = Math.round(incomingDamage * 0.5);
                        console.log("Your defensive stance reduces the damage to " + incomingDamage + "!");
                    }
                    
                    playerHealth -= incomingDamage;
                }
                
                // Check battle status
                if (monsterHealth <= 0) {
                    console.log("\n*** VICTORY! ***");
                    console.log("You have defeated the monster!");
                    gold += 50;
                    console.log("You looted 50 gold!");
                    battleActive = false;
                    currentLocation = "village";
                } else if (playerHealth <= 0) {
                    console.log("\n*** DEFEAT! ***");
                    console.log("You have been slain by the monster...");
                    gameRunning = false;
                    battleActive = false;
                }
                
                battleRound++;
            }
        } else if (forestChoice === "2") {
            if (inventory.includes("Healing Potion")) {
                playerHealth = Math.min(100, playerHealth + healingPotionValue);
                inventory.splice(inventory.indexOf("Healing Potion"), 1);
                console.log("You used a healing potion! You now have " + playerHealth + " health.");
                currentLocation = "village";
            } else {
                console.log("You don't have any healing potions!");
            }
        } else if (forestChoice === "3") {
            console.log("You run back to the village!");
            currentLocation = "village";
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }
    
    // Check if player has died
    if (playerHealth <= 0) {
        console.log("You have died. Game Over!");
        gameRunning = false;
    }
}


