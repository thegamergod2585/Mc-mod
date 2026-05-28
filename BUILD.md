# Building Your .mcpack File

This guide explains how to build a `.mcpack` file from this repository so you can easily import it into Minecraft Bedrock Edition.

## What is a .mcpack File?

A `.mcpack` file is a compressed ZIP archive containing your Minecraft resource pack. It's the standard format for sharing and installing resource packs in Minecraft Bedrock Edition.

## Build Methods

### Method 1: Using Python (Recommended)

**Requirements:** Python 3.6+

```bash
# Navigate to the repository directory
cd Mc-mod

# Run the build script
python3 build_mcpack.py
```

The script will:
- ✓ Copy all required files and folders
- ✓ Create a properly formatted ZIP archive
- ✓ Generate a timestamped `.mcpack` file in the `dist/` folder
- ✓ Display installation instructions

**Output:** `dist/x_ray_resource_pack_v1.0.0_YYYYMMDD.mcpack`

### Method 2: Using Node.js

**Requirements:** Node.js 12+

```bash
# Navigate to the repository directory
cd Mc-mod

# Install dependencies (optional, for better compression)
npm install archiver

# Run the build script
npm run build
# or
node build_mcpack.js
```

### Method 3: Manual ZIP Method

If you don't have Python or Node.js installed:

1. **Organize your files:**
   - Create a folder named `X-ray-Resource-Pack`
   - Copy these files into it:
     - `manifest.json`
     - `blocks.json`
     - `textures/` folder
   - (Optional) Add `pack_icon.png` for a nice icon

2. **Create a ZIP archive:**
   - **Windows:** Right-click the folder → "Send to" → "Compressed (zipped) folder"
   - **macOS:** Right-click → "Compress"
   - **Linux:** `zip -r pack.zip X-ray-Resource-Pack/`

3. **Rename to .mcpack:**
   - Change the file extension from `.zip` to `.mcpack`

## Installation in Minecraft Bedrock

1. **Locate your .mcpack file**
   - It will be in the `dist/` folder (if using scripts)
   - Or wherever you created it manually

2. **Copy to your device** (if needed)
   - For mobile: Use a file manager app
   - For PC/Console: Direct transfer

3. **Open Minecraft Bedrock Edition**

4. **Navigate to Settings**
   - Go to **Settings** → **Resource Packs**

5. **Add the pack**
   - Click **"My Packs"**
   - Click **"Add Pack"**
   - Select your `.mcpack` file

6. **Apply to your world**
   - Choose the world you want to use the pack in
   - Toggle the resource pack to **ON**
   - Start playing!

## Pack Contents

The `.mcpack` file includes:

```
X-ray-Resource-Pack/
├── manifest.json          # Pack metadata and info
├── blocks.json           # Block definitions
└── textures/
    └── texture_list.json # Texture definitions
```

## Troubleshooting

### File not found error
- Make sure all files (manifest.json, blocks.json, textures/) are in the repository root
- Check file names are spelled correctly (case-sensitive on some systems)

### .mcpack won't open in Minecraft
- Ensure it's a valid ZIP file (try opening it with a ZIP tool)
- Check the manifest.json format is correct
- Try deleting and recreating the pack

### Pack doesn't show effects
- Verify the `textures/texture_list.json` file is properly formatted
- Check that texture files referenced in the JSON exist
- Try updating Minecraft to the latest version (1.20.0+)

## Creating a Pack Icon

To add a custom icon that appears in Minecraft:

1. Create or find a **128×128 pixel** PNG image
2. Name it `pack_icon.png`
3. Place it in the repository root
4. Run the build script again

The icon will appear next to your pack name in the Resource Packs menu.

## Pack Information

- **Name:** X-ray Resource Pack
- **Version:** 1.0.0
- **Minimum Minecraft Version:** 1.20.0
- **Platforms:** All Bedrock platforms (Windows, Xbox, PlayStation, Nintendo Switch, Mobile)
- **Type:** Resource Pack (no mods or scripts required)

## Need Help?

- Check the [Minecraft Wiki](https://minecraft.wiki/w/Resource_pack)
- Review the [Bedrock Edition documentation](https://docs.microsoft.com/en-us/minecraft/creator/)
- Create an issue in this repository

Happy mining! 🎮⛏️
