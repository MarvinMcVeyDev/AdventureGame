

    // ===========================================
    // The Dragon's Quest - Text Adventure Game
    // ===========================================

    // Game state variables
    let gameRunning = true;
    let playerName = "";
    let playerHealth = 100;
    let playerGold = 20;
    let currentLocation = "village";
    let inventory = [];

    // ===========================
    // Game Functions
    // ===========================
    // ===========================
    // Item Templates
    // ===========================

    const healthPotion = {
    name: "Health Potion",
    type: "potion",
    value: 5,
    effect: 30,
    description: "Restores 30 health points",
    };

    const maxHealthPotion = {
        name: "Super Health Potion",
        type: "potion",
        value: 30,
        effect: 100,
        description: "Restores max health.",
    };

    const woodSword = {
    name: "Wood Sword",
    type: "weapon",
    value: 5,
    effect: 10,
    description: "A sturdy blade for combat",
    };

    const ironSword = {
        name: "Iron Sword",
        type: "weapon",
        value: 20,
        effect: 30,
        description: "A blade forged from the best blacksmith in the village.",
    };

    const steelSword = {
    name: "Steel Sword",
    type: "weapon",
    value: 30,
    effect: 50,
    description: "A sword that will decimate your enemies.",
    };

    const woodenShield = {
    name: "Wooden Shield",
    type: "armor",
    value: 8,
    effect: 5,
    description: "Reduces damage taken in combat",
    };

    const ironShield = {
    name: "Iron Shield",
    type: "armor",
    value: 12,
    effect: 10,
    description: "Provides stronger protection in combat",
    };

    const steelShield = {
        name: "Steel Shield",
        type: "armor",
        value: 20,
        effect: 35,
        description: "A shield for the toughest of warriors",
    };


    // ===========================
    // Location Choice Functions
    // ===========================
    function handleQuit() {
            const container = document.getElementById("button-container");
            container.innerHTML = ""; // Clear the container
            showStartUI();
            gameRunning = false; // Stop the game
+            alert("\nThanks for playing!"); // Print a farewell message
    }

    function handleStartChoice() {
        const container = document.getElementById("button-container");
        container.innerHTML = ""; // Clear existing buttons
        const textContainer = document.getElementById("text-container");
        const contentData = [
            {type: "h5", text: "Well, hello " + playerName + "!" + " Do you think you have what it take to slay the dragon?"}
        ];
        textContainer.innerHTML = ""; // Clear existing content
        contentData.forEach(item => {
            const element = document.createElement(item.type);
            element.textContent = item.text;
            textContainer.appendChild(element);
        });
        
        const buttons = [
            {text: "Blacksmith", id: "blacksmith", action:() => handleBlacksmithChoice()},
            {text: "Market", id: "market", action:() => handleMarketChoice()},
            {text: "Forest", id: "forest", action:() => handleForestChoice()},
            {text: "Show Location", id: "showLocation", action:() => showLocation()},
            {text: "Inventory", id: "inventory", action:() => checkInventory()},
            {text: "Help", id: "help", action:() => showHelp()},
            {text: "Quit", id: "quit", action:() => handleQuit()},
        ];
        

        buttons.forEach(button => {
            const btn = document.createElement("button");
            btn.textContent = button.text;
            btn.id = button.id;
            btn.addEventListener("click", button.action);
            container.appendChild(btn);
        });
            
        }
    
    
    function handleVillageChoice() {
        const container = document.getElementById("button-container");
            container.innerHTML = ""; // Clear existing buttons


            const villageButtons = [
                {text: "BlackSmith", id: "blacksmith", action:() => handleBlacksmithChoice()},
                {text: "Market", id: "market", action:() => handleMarketChoice()},
                {text: "Show Location", id: "showLocation", action:() => showLocation()},
                {text: "Inventory", id: "inventory", action:() => checkInventory()},
                {text: "Forest", id: "forest", action:() => handleForestChoice()},
                {text: "Help", id: "help", action:() => showHelp()},
                {text: "Quit", id: "quit", action:() => {handleQuit()}},
            ]
        
        villageButtons.forEach(button => {
            const btn = document.createElement("button");
            btn.textContent = button.text;
            btn.id = button.id;
            btn.addEventListener("click", button.action);
            container.appendChild(btn);
        });

    }

    function handleBlacksmithChoice() {
        const container = document.getElementById("button-container");
        container.innerHTML = ""; // Clear existing buttons
        const blacksmithButtons = [
            {text: "Buy Weapon", id: "buy_weapon", action:() => buyFromBlacksmith(1)},
            {text: "Buy Armor", id: "buy_armor", action:() => buyFromBlacksmith(2)},
            {text: "Buy Shield", id: "buy_shield", action:() => buyFromBlacksmith(3)},
            {text: "Inventory", id: "inventory", action:() => checkInventory()},
            {text: "Show Location", id: "showLocation", action:() => showLocation()},
            {text: "Help", id: "help", action:() => showHelp()},
            {text: "Back", id: "back", action:() => handleCurrentLocation()},
            {text: "Quit", id: "quit", action:() => {handleQuit()}},
        ];
        blacksmithButtons.forEach(button => {
            const btn = document.createElement("button");
            btn.textContent = button.text;
            btn.id = button.id;
            btn.addEventListener("click", button.action);
            container.appendChild(btn);
        });
    }

    

    function handleMarketChoice() {
        const container = document.getElementById("button-container");
        container.innerHTML = ""; // Clear existing buttons
        const marketButtons = [
            {text: "Buy Potion", id: "buy_potion", action:() => buyFromMarket(1)},
            {text: "Buy Map", id: "buy_map", action:() => buyFromMarket(2)},
            {text: "Village", id: "village", action:() => handleVillageChoice()},
            {text: "Show Location", id: "showLocation", action:() => showLocation()},
            {text: "Inventory", id: "inventory", action:() => checkInventory()},
            {text: "Help", id: "help", action:() => showHelp()},
            {text: "Quit", id: "quit", action:() => {handleQuit()}},
            {text: "Back", id: "back", action:() => handleCurrentLocation()},
        ];
        marketButtons.forEach(button => {
            const btn = document.createElement("button");
            btn.textContent = button.text;
            btn.id = button.id;
            btn.addEventListener("click", button.action);
            container.appendChild(btn);
        });

    }

    function handleForestChoice() {
        const container = document.getElementById("button-container");
        container.innerHTML = ""; // Clear existing buttons
        const forestButtons = [
            {text: "Fight Monster", id: "fight_monster", action:() => handleCombat(false)},
            {text: "Search for Treasure", id: "search_treasure", action:() => searchForTreasure()},
            {text: "Inventory", id: "inventory", action:() => checkInventory()},
            {text: "Village", id: "village", action:() => handleVillageChoice()},
            {text: "Mountains", id: "mountains", action:() => move(4)},
            {text: "Show Location", id: "showLocation", action:() => showLocation()},
            {text: "Inventory", id: "inventory", action:() => checkInventory()},
            {text: "Help", id: "help", action:() => showHelp()},
            {text: "Quit", id: "quit", action:() => {handleQuit()}},
            {text: "Back", id: "back", action:() => handleCurrentLocation()},
        ];
        forestButtons.forEach(button => {
            const btn = document.createElement("button");
            btn.textContent = button.text;
            btn.id = button.id;
            btn.addEventListener("click", button.action);
            container.appendChild(btn);
        });
    
    }

    function handleMountainsChoice() {
        const container = document.getElementById("button-container"); 
        container.innerHTML = ""; // Clear existing buttons
        const mountainsButtons = [
            {text: "Fight Monster", id: "fight_monster", action:() => handleCombat(true)},
            {text: "Search for Treasure", id: "search_treasure", action:() => searchForTreasure()},
            {text: "inventory", id: "inventory", action:() => checkInventory()},
            {text: "Forest", id: "forest", action:() => move(2)},
            {text: "Help", id: "help", action:() => showHelp()},
            {text: "Quit", id: "quit", action:() => {handleQuit()}},
            {text: "Back", id: "back", action:() => handleCurrentLocation()},
        ];
        mountainsButtons.forEach(button => {
            const btn = document.createElement("button");
            btn.textContent = button.text;
            btn.id = button.id;
            btn.addEventListener("click", button.action);
            container.appendChild(btn);
        });
        
    }

    function handleCurrentLocation() {
        if (currentLocation === "village") {
            handleVillageChoice();
        }
        else if (currentLocation === "blacksmith") {
            handleBlacksmithChoice();
        }
        else if (currentLocation === "market") {
            handleMarketChoice();
        }
        else if (currentLocation === "forest") {
            handleForestChoice();
        }
        else if (currentLocation === "mountains") {
            handleMountainsChoice();
        }
        else {
            throw "Unknown location.";
        }


    }

    // ===========================
    // Helper Functions
    // ===========================

    function getItemsByType(type) {
    return inventory.filter((item) => item.type === type);
    }

    function getBestItem(type) {
    const items = getItemsByType(type);

    if (items.length === 0) {
        return null;
    }

    return items.reduce((best, current) => {
        return current.effect > best.effect ? current : best;
    });
    }

    function hasGoodEquipment() {
    const hasSteelSword = inventory.some(
        (item) => item.name === "Steel Sword" && item.type === "weapon"
    );
    const hasArmor = inventory.some((item) => item.type === "armor");

    return hasSteelSword && hasArmor;
    }

    function updateHealth(amount) {
    playerHealth += amount;

    if (playerHealth > 100) {
        playerHealth = 100;
        console.log("You're at full health!");
    }

    if (playerHealth < 0) {
        playerHealth = 0;
        console.log("You're gravely wounded!");
    }

    console.log("Health is now: " + playerHealth);
    return playerHealth;
    }

    function isValidChoice(input, min, max) {
    const choiceNum = parseInt(input);
    return !isNaN(choiceNum) && choiceNum >= min && choiceNum <= max;
    }

    // ===========================
    // Display Functions
    // ===========================
    function hideContainerButtons() {
        const buttons = document.querySelectorAll(".container-button");
        buttons.forEach((button) => {
            button.style.display = "none";
        });
    }
    function hideStartUI() {
        const startButton = document.getElementById("start-button");
        if (startButton) {
            startButton.style.display = "none";
        }
        const playerNameInput = document.getElementById("playerNameInput");
        if (playerNameInput) {
            playerNameInput.style.display = "none";
        }
    }
    function showStartUI() {
        const startButton = document.getElementById("start-button");
        if (startButton) {
            startButton.style.display = "inline";
        }
        const playerNameInput = document.getElementById("playerNameInput");
        if (playerNameInput) {
            playerNameInput.style.display = "inline";
        }
    }

    function showStatus() {
    console.log("\n=== " + playerName + "'s Status ===");
    console.log("Health: " + playerHealth);
    console.log("Gold: " + playerGold);
    console.log("Location: " + currentLocation);

    console.log("Inventory:");
    if (inventory.length === 0) {
        console.log("  Nothing in inventory");
    } else {
        inventory.forEach((item, index) => {
        console.log(
            "  " + (index + 1) + ". " + item.name + " - " + item.description
        );
        });
    }
    }

    function checkInventory() {
    alert("\n=== INVENTORY ===");

    if (inventory.length === 0 && playerGold == 0) {
        alert("Your inventory is empty!");
    } else if (inventory.length > 0) {
        alert("Items in inventory:");
    } else if (playerGold > 0) {
        alert("Gold: " + playerGold);
        return;
    }

    inventory.forEach((item, index) => {
        console.log(
        "  " + (index + 1) + ". " + item.name + " - " + item.description
        );
    });
    }

    function showFinalStats() {
    console.log("\n=== FINAL STATS ===");
    console.log("Player: " + playerName);
    console.log("Health: " + playerHealth);
    console.log("Gold: " + playerGold);
    console.log("Location: " + currentLocation);
    checkInventory();
    }

    function showHelp() {
    console.log("\n=== HELP ===");
    console.log("Your goal is to defeat the dragon in the mountains.");
    console.log("Buy better weapons and armor before taking on dangerous enemies.");
    console.log("Steel Sword + any armor is required to face the dragon.");
    console.log("Health potions restore health.");
    console.log("Armor reduces incoming damage.");
    console.log("Explore the forest for treasure and battles.");
    }

    function showLocation() {
        const contentData = [
            {type: "h3", text: "You are currently at the " + currentLocation}
        ]
    console.log("\n=================================");
    console.log("Current Location: " + currentLocation);
    console.log("=================================");
    }

    // ===========================
    // Shopping Functions
    // ===========================

    function buyItem(item) {
    if (playerGold >= item.value) {
        playerGold -= item.value;
        inventory.push({ ...item });
        console.log("\nYou bought " + item.name + " for " + item.value + " gold.");
        console.log("Gold remaining: " + playerGold);
    } else {
        console.log("\nYou do not have enough gold.");
    }
    }

    function buyFromBlacksmith() {
        const contentData = [
            {type: "h3", text: "Welcome in sire! What can I get for you today? Are you looking for a new weapon? Or maybe a new shield?"},

        ];
        contentData.push({text: "Back", id: "back", action:() => handleCurrentLocation()});
        const speech = document.getElementById("text-container");
        speech.innerHTML = "";
        contentData.forEach(item => {
            if (item.type === "h3") {
                const h3 = document.createElement("h3");
                h3.textContent = item.text;
                speech.appendChild(h3);
            }
        });

        const container = document.getElementById("button-container");
        container.innerHTML = "";
        const blacksmithItems = [woodSword, ironSword, steelSword];
        blacksmithItems.forEach((item, index) => {
            console.log((index + 1) + ". " + item.name + " - " + item.description);
            const button = document.createElement("button");
            button.textContent = (index + 1) + ". " + item.name + " - " + item.description;
            button.onclick = () => buyItem(item);
            container.appendChild(button);
        });
    }
    

    function buyFromMarket(choiceNum) {
    const contentData = [
        {type: "h3", text: "Welcome in! Everything here is for sale. I'd be happy to help you find what you need."},
    ];
    const speech = document.getElementById("text-container");
    speech.innerHTML = "";
    contentData.forEach(item => {
        if (item.type === "h3") {
            const h3 = document.createElement("h3");
            h3.textContent = item.text;
            speech.appendChild(h3);
        }
    });

    const container = document.getElementById("button-container");
    container.innerHTML = "";
    const marketItems = [healthPotion, maxHealthPotion, woodenShield, ironShield, steelShield];
    marketItems.forEach((item, index) => {
        console.log((index + 1) + ". " + item.name + " - " + item.description);
        const button = document.createElement("button");
        button.textContent = (index + 1) + ". " + item.name + " - " + item.description;
        button.onclick = () => buyItem(item);
        container.appendChild(button);
    });
}

    // ===========================
    // Combat Functions
    // ===========================

    function handleCombat(isDragon = false) {
    const enemy = isDragon
        ? { name: "Dragon", damage: 20, health: 150, reward: 50 }
        : { name: "Monster", damage: 10, health: 50, reward: 30 };

    const bestWeapon = getBestItem("weapon");
    const bestArmor = getBestItem("armor");

    const weaponDamage = bestWeapon ? bestWeapon.effect : 0;
    const armorProtection = bestArmor ? bestArmor.effect : 0;

    console.log("\n=== Combat Begins! ===");
    console.log("Enemy: " + enemy.name);
    console.log("Enemy Health: " + enemy.health);
    console.log("Enemy Damage: " + enemy.damage);

    if (bestWeapon) {
        console.log(
        "Weapon being used: " +
            bestWeapon.name +
            " (Damage: " +
            bestWeapon.effect +
            ")"
        );
    } else {
        console.log("Weapon being used: None");
    }

    if (bestArmor) {
        console.log(
        "Armor being used: " +
            bestArmor.name +
            " (Protection: " +
            bestArmor.effect +
            ")"
        );
    } else {
        console.log("Armor being used: None");
    }

    if (isDragon && !hasGoodEquipment()) {
        console.log("\nYou are not equipped well enough to face the dragon!");
        console.log("You need the Steel Sword and at least one armor item.");
        return false;
    }

    if (!bestWeapon) {
        console.log("\nWithout a weapon, you must retreat!");
        updateHealth(isDragon ? -50 : -20);
        return false;
    }
    while (enemy.health > 0 && playerHealth > 0) {
    console.log("\nYou attack with your " + bestWeapon.name + "!");
    console.log("You deal " + weaponDamage + " damage!");

    enemy.health -= weaponDamage;
    console.log("The " + enemy.name.toLowerCase() + " has " + enemy.health + " health remaining.");

    if (enemy.health <= 0) {
        console.log("Victory! You defeated the " + enemy.name.toLowerCase() + "!");
        console.log("You found " + enemy.reward + " gold!");
        playerGold += enemy.reward;

        if (isDragon) {
            console.log("\nThe dragon has been slain!");
            console.log("You completed your quest and saved the land!");
            console.log("The King deems you worthy of knighthood and rewards you with a title and land.");
            showFinalStats();
            gameRunning = false;
            showStartUI();
        }

        break;
    }

    let damageTaken = enemy.damage - armorProtection;
    damageTaken = Math.max(damageTaken, 1);

    console.log("The " + enemy.name.toLowerCase() + " attacks!");
    console.log("Your armor reduces the damage by " + armorProtection + ".");
    console.log("You take " + damageTaken + " damage.");

    updateHealth(-damageTaken);

    if (playerHealth <= 0) {
        console.log("\nYou were defeated!");
        return false;
    }
}

return true;
    }

    // ===========================
    // Item Functions
    // ===========================

    function useItem() {
    if (inventory.length === 0) {
        console.log("\nYou have no items!");
        return false;
    }

    console.log("\n=== Inventory ===");
    inventory.forEach((item, index) => {
        console.log(index + 1 + ". " + item.name);
    });

    let choice = readline.question("Use which item? (number or 'cancel'): ");

    if (choice.toLowerCase() === "cancel") {
        return false;
    }

    let index = parseInt(choice) - 1;

    if (index >= 0 && index < inventory.length) {
        let item = inventory[index];

        if (item.type === "potion") {
        console.log("\nYou drink the " + item.name + ".");
        updateHealth(item.effect);
        inventory.splice(index, 1);
        return true;
        } else if (item.type === "weapon") {
        console.log("\nYou ready your " + item.name + " for battle.");
        return true;
        } else if (item.type === "armor") {
        console.log("\nYou equip your " + item.name + ".");
        return true;
        } else {
        console.log("\nYou can't use that right now.");
        return false;
        }
    } else {
        console.log("\nInvalid item number!");
        return false;
    }
    }

    // ===========================
    // Exploration / Movement
    // ===========================

    function searchForTreasure() {
    const goldFound = Math.floor(Math.random() * 11) + 5;
    playerGold += goldFound;
    alert("\nYou found " + goldFound + " gold!");
    }

    function move(choiceNum) {
    let success = false;

    if (currentLocation === "village") {
        if (choiceNum === 1) {
        currentLocation = "blacksmith";
        console.log("\nYou enter the blacksmith.");
        success = true;
        } else if (choiceNum === 2) {
        currentLocation = "market";
        console.log("\nYou enter the market.");
        success = true;
        } else if (choiceNum === 3) {
        currentLocation = "forest";
        console.log("\nYou travel into the forest.");
        success = true;
        }
    } else if (currentLocation === "blacksmith") {
        if (choiceNum === 3) {
        currentLocation = "village";
        console.log("\nYou return to the village.");
        success = true;
        }
    } else if (currentLocation === "market") {
        if (choiceNum === 4) {
        currentLocation = "village";
        console.log("\nYou return to the village.");
        success = true;
        }
    } else if (currentLocation === "forest") {
        if (choiceNum === 4) {
        currentLocation = "village";
        console.log("\nYou return to the village.");
        success = true;
        } else if (choiceNum === 5) {
        if (hasGoodEquipment()) {
            currentLocation = "mountains";
            console.log("\nYou make your way into the mountains.");
            success = true;
        } else {
            console.log("\nThe mountains are too dangerous right now.");
            console.log("You should get better equipment first.");
            success = false;
        }
        }
    } else if (currentLocation === "mountains") {
        if (choiceNum === 4) {
        currentLocation = "forest";
        console.log("\nYou return to the forest.");
        success = true;
        }
    }

    return success;
    }

    // ===========================
    // Main Game Loop
    // ===========================
    

    const button = document.getElementById("start-button");

    button.addEventListener("click", () => {
        const playerNameInput = document.getElementById("playerNameInput");
        playerName = playerNameInput.value.trim();
        if (playerName === "") {
            alert("Please enter your name to start the game.");
            const playerName = playerNameInput.value;
            return;
        } else {
            handleStartChoice();
            hideStartUI();
        }
        
    });
    

    // End of script