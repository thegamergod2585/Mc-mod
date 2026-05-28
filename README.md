# Minecraft Bedrock X-ray Mod

A simple X-ray mod for Minecraft Bedrock Edition that helps you find ores easily.

## Features

- **Ore Detection**: Automatically detects and highlights valuable ores within render distance
- **Ores Supported**:
  - Diamond Ore (including Deepslate variant)
  - Gold Ore (including Deepslate variant)
  - Iron Ore (including Deepslate variant)
  - Copper Ore (including Deepslate variant)
  - Emerald Ore (including Deepslate variant)
  - Redstone Ore (including Deepslate variant)
  - Lapis Ore (including Deepslate variant)
  - Coal Ore (including Deepslate variant)

## Installation

1. Download or clone this repository
2. Copy the `behavior_pack` and `resource_pack` folders to your Minecraft world
3. Enable both packs in your world settings
4. Restart Minecraft

## Usage

### Commands

- **`!xray on`** - Enable X-ray mode
- **`!xray off`** - Disable X-ray mode
- **`!xray`** - Show help message

### How It Works

Once X-ray is enabled, the mod will:
1. Scan for ores in a 32-block radius around you
2. Track their locations
3. Update every 5 game ticks
4. Continuously monitor as you move around

## Technical Details

- **Engine**: Minecraft Script API (@minecraft/server)
- **Language**: JavaScript
- **Render Distance**: 32 blocks
- **Update Frequency**: Every 5 ticks (~250ms)

## Configuration

To modify the mod, edit `behavior_pack/scripts/main.js`:

- `RENDER_DISTANCE`: Change detection radius (default: 32)
- `CHECK_INTERVAL`: Change update frequency in ticks (default: 5)
- `ORES`: Add or remove ore types from the detection list

## Requirements

- Minecraft Bedrock Edition 1.20.0+
- Experimental Features enabled
- Script API enabled in world settings

## Notes

- This mod requires enabling experimental features in your world
- Performance may decrease with very large render distances
- The mod only works in enabled worlds

## License

Feel free to modify and distribute as needed.