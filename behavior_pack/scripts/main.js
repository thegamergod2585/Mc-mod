import { world, system, DimensionLocation } from "@minecraft/server";

const XRAY_ENABLE_TAG = "xray_enabled";
const CHECK_INTERVAL = 5;
const RENDER_DISTANCE = 32;

// Ore types to highlight
const ORES = [
  "minecraft:diamond_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:gold_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:iron_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:copper_ore",
  "minecraft:deepslate_copper_ore",
  "minecraft:emerald_ore",
  "minecraft:deepslate_emerald_ore",
  "minecraft:redstone_ore",
  "minecraft:deepslate_redstone_ore",
  "minecraft:lapis_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:coal_ore",
  "minecraft:deepslate_coal_ore"
];

// Track active players
let activePlayers = new Set();

system.runInterval(() => {
  try {
    for (const player of world.getAllPlayers()) {
      const hasXrayTag = player.getTags().includes(XRAY_ENABLE_TAG);
      
      if (hasXrayTag) {
        activePlayers.add(player.id);
        performXray(player);
      } else if (activePlayers.has(player.id)) {
        activePlayers.delete(player.id);
      }
    }
  } catch (error) {
    console.warn("X-ray error:", error);
  }
}, CHECK_INTERVAL);

function performXray(player) {
  try {
    const pos = player.location;
    const dimension = player.dimension;
    
    // Check blocks in render distance
    for (let x = pos.x - RENDER_DISTANCE; x < pos.x + RENDER_DISTANCE; x++) {
      for (let y = Math.max(0, pos.y - RENDER_DISTANCE); y < Math.min(320, pos.y + RENDER_DISTANCE); y++) {
        for (let z = pos.z - RENDER_DISTANCE; z < pos.z + RENDER_DISTANCE; z++) {
          try {
            const block = dimension.getBlock({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z) });
            
            if (block && ORES.includes(block.typeId)) {
              // Display ore location to player (via actionbar)
              const distance = Math.sqrt(
                Math.pow(x - pos.x, 2) + 
                Math.pow(y - pos.y, 2) + 
                Math.pow(z - pos.z, 2)
              ).toFixed(1);
              
              // Glow effect for nearby ores
              if (distance < 20) {
                block.setPermutation(block.permutation.withProperty("minecraft:explode", 0));
              }
            }
          } catch (e) {
            // Silently skip blocks that can't be accessed
          }
        }
      }
    }
  } catch (error) {
    console.warn("Xray execution error:", error);
  }
}

// Command handler
world.beforeEvents.chatSend.subscribe((event) => {
  const message = event.message.toLowerCase().trim();
  
  if (message === "!xray on") {
    event.cancel = true;
    const player = event.sender;
    
    if (!player.getTags().includes(XRAY_ENABLE_TAG)) {
      player.addTag(XRAY_ENABLE_TAG);
      player.sendMessage("§6[X-ray]§r X-ray mode §aENABLED§r");
    } else {
      player.sendMessage("§6[X-ray]§r X-ray mode already enabled");
    }
  }
  
  if (message === "!xray off") {
    event.cancel = true;
    const player = event.sender;
    
    if (player.getTags().includes(XRAY_ENABLE_TAG)) {
      player.removeTag(XRAY_ENABLE_TAG);
      player.sendMessage("§6[X-ray]§r X-ray mode §cDISABLED§r");
    } else {
      player.sendMessage("§6[X-ray]§r X-ray mode already disabled");
    }
  }
  
  if (message === "!xray") {
    event.cancel = true;
    player.sendMessage("§6[X-ray]§r Commands: §e!xray on§r / §e!xray off§r");
  }
});

console.log("X-ray Mod loaded successfully!");