const PLAYER_MAX_HEALTH = 20;
const PLAYER_NAME = "USS Assembly";

const AI_MAX_HEALTH = 6;
const AI_NAMES = [
  "ET",
  "GreenMan",
  "Roswell",
  "Sunspot",
  "Pyramid",
  "The Bug",
  "X Men",
]

function updateWorld() {
  document.getElementById("assemblyhealth").innerHTML = USSAssembly.hull;
  document.getElementById("assemblymaxhealth").innerHTML = PLAYER_MAX_HEALTH;
  document.getElementById("alienhealth").innerHTML = Alien.hull.toFixed(2);
  document.getElementById("alienname").innerHTML = Alien.name;
  document.getElementById("alienmaxhealth").innerHTML = AI_MAX_HEALTH;
  document.getElementById("remainingaliens").innerHTML = function() {
    let html = "";
    for (let i=0 ; i < Aliens.length ; i++) {
      html += ("<span>" + Aliens[i].name + "</span> ")
    }
    return html;
  }()
}

// Create player ship and create alien ship classes
class Ship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}

// Spawn a new Alien
function AI(name) {
  return new Ship(
    name,
    Math.floor(Math.random() *3)+3,
    Math.floor(Math.random()*3)+2,
    Math.floor(Math.random() * 0.2) + 0.6,
  );
}

// Spawn a new Player
function Player() {
  return new Ship(
    PLAYER_NAME,
    PLAYER_MAX_HEALTH,
    5,
    0.7,
  );
}

// Process player attacks
function playerCanAttack() {
  //console.log("I am inside PLAYER ATTACK>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  return Math.floor(Math.random()*10)+10 >= USSAssembly.accuracy
};

// Process alien attacks
function alienCanAttack() {
  //console.log("I AM HERE IS PLAYERDEAD",playerIsDead);
  //return Math.random() >= Alien.accuracy
  if (Alien.hull < USSAssembly.hull) {
    Alien.hull -= USSAssembly.firepower
    alert(`USS Assembly has hit ${Alien.name}!`)
  } else {
    USSAssembly.hull -= Alien.firepower;
    alert("USS Assembly got hit!")
  }

  // If the ship survives, it attacks you
  if (!alienIsDead && alienCanAttack()) {
    alert(Alien.name + " is still alive! It now attacks you.")
    USSAssembly.hull -= Alien.firepower;

    if (USSAssembly.hull <= 0) {
        alert("Player has died :( - GAME OVER")
        attack.disabled = true;
    }
  } else {
    alert(Alien.name + " is dead!")
    USSAssembly.hull -= Alien.firepower;
    Alien = Aliens.pop()

    // Game is over
    if (Aliens.length == 0) {
      //Alien.name = "N/A"
      //Alien.hull = 0
      alert("You Won!")
    }
    if (USSAssembly.hull <= 0) {
      alert("Player has died :( - YOU LOST - Aliens have taken over the earth!!")
      attack.disabled = true;
  }
  }

  updateWorld();
};



function playerAttack() {
  if (Math.random() >= USSAssembly.accuracy) {
    Alien.hull -= USSAssembly.firepower;
  }
};

// Process alien attacks
function alienAttack() {
  if (Math.random() >= Alien.accuracy) {
    USSAssembly.hull -= Alien.firepower;
  }
};

// Check player's health
function playerIsDead() {
  
  console.log("USS ASSEMBLY HULL:::::: ************%%%%%%%%%%%%%%%%",USSAssembly.hull)
  
  return USSAssembly.hull <= 0
};

// Check alien's health
function alienIsDead(alienhull) {
  console.log("ALIEN HEALTH ******************************",alienhull)
  if(alienhull <= 0)
  {
      return true;
  }
  else{
    return false;
  }
   
};

//
// Game
//

let USSAssembly = null;
let Aliens = null;
let Alien = null;

// Initialize the game World if we're just starting out.
if (USSAssembly == null || Aliens == null) {
  console.log("Creating the game world for the first time.")

  // Create the player
  USSAssembly = Player()
  console.log("Player: ", USSAssembly)
  
  // Create 6 aliens
  Aliens = function() {
    let aliens = [];
  
    for (let i=0; i < 6; i++) {
      aliens.push(AI(AI_NAMES[i]))
    }
  
    return aliens;
  }()
  console.log("Aliens: ", Aliens)

  Alien = Aliens.pop();
  console.log("Alien: ", Alien)
}

updateWorld();

const attack = document.querySelector("#Attackbutton");
attack.addEventListener("click", function (event) {
  console.log("US HULL *********************************",USSAssembly.hull)
  console.log("ALIEN HULL *********************************",Alien.hull);
  // You attack the first alien ship
  if(USSAssembly.hull > Alien.hull) {
    
    playerCanAttack();
    playerAttack();
  }
  console.log("I AM HERE$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",Alien.hull)
  // If the ship survives, it attacks you
  if (Alien.hull > 0) {
    alert(Alien.name + " is still alive! It now attacks you.")
    alienCanAttack();
    alienAttack()
  } else {
    alert(Alien.name + " is dead!")
    Alien = Aliens.pop()

    // Game is over
    if (Aliens.length == 0) {
      //Alien.name = "N/A"
      //Alien.hull = 0
      alert("You Won!")
      attack.disabled = true;
    }
  }

  updateWorld();
});

// retreat = document.querySelector("#Retreatbutton");
// retreat.addEventListener ("click"), function (event) {
//   if (Aliens.length > 0) {
//     alert ("You lost!  The aliens have taken over earth!")
//   }
// }

// function playerCanAttack() {
//   return Math.random() >= USSAssembly.accuracy
// };

// Process alien attacks
// function alienCanAttack() {
//   return Math.random() >= Alien.accuracy
//   if (!playerIsDead && playerCanAttack()) {
//     Alien.hull -= USSAssembly.firepower
//     alert(`USS Assembly has hit ${Alien.name}!`)
//   } else {
//     alert("USS Assembly has missed!")
//   }

//   // If the ship survives, it attacks you
//   if (!alienIsDead && alienCanAttack()) {
//     alert(Alien.name + " is still alive! It now attacks you.")
//     USSAssembly.hull -= Alien.firepower;

//     if (playerIsDead) {
//         alert("Player has died :(")
//     }
//   } else {
//     alert(Alien.name + " is dead!")
//     Alien = Aliens.pop()

//     // Game is over
//     if (Aliens.length == 0) {
//       Alien.name = "N/A"
//       Alien.hull = 0
//       alert("You Won!")
//     }
//   }

//   updateWorld();
// };

const retreat = document.querySelector("#Retreatbutton");
retreat.addEventListener("click", function(event) {
  if (Aliens.length > 0) {
    alert("Game is OVER");
    window.location.reload();
  }
})