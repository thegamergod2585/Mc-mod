#!/usr/bin/env python3
"""
Build script to create a .mcpack file from the Minecraft Bedrock resource pack.
A .mcpack file is simply a ZIP archive with the required structure.

Usage:
    python3 build_mcpack.py
"""

import os
import shutil
import zipfile
from pathlib import Path
from datetime import datetime


def build_mcpack():
    """Create a .mcpack file from the resource pack files."""
    
    # Define paths
    script_dir = Path(__file__).parent
    output_dir = script_dir / "dist"
    temp_dir = script_dir / ".mcpack_temp"
    
    # Files/folders to include in the .mcpack
    required_files = [
        "manifest.json",
        "blocks.json",
        "textures"
    ]
    
    # Optional files
    optional_files = [
        "pack_icon.png"
    ]
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(exist_ok=True)
    
    # Clean up temporary directory if it exists
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()
    
    print("📦 Building .mcpack file...")
    print(f"📁 Output directory: {output_dir}")
    
    # Copy required files
    for file_path in required_files:
        src = script_dir / file_path
        if src.exists():
            if src.is_dir():
                dest = temp_dir / file_path
                shutil.copytree(src, dest)
                print(f"✓ Copied directory: {file_path}")
            else:
                dest = temp_dir / file_path
                shutil.copy2(src, dest)
                print(f"✓ Copied file: {file_path}")
        else:
            print(f"✗ Required file not found: {file_path}")
            return False
    
    # Copy optional files
    for file_path in optional_files:
        src = script_dir / file_path
        if src.exists():
            dest = temp_dir / file_path
            shutil.copy2(src, dest)
            print(f"✓ Copied optional file: {file_path}")
    
    # Read manifest to get pack name and version
    import json
    manifest_path = temp_dir / "manifest.json"
    try:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
        pack_name = manifest.get("header", {}).get("name", "minecraft-pack")
        version = ".".join(map(str, manifest.get("header", {}).get("version", [1, 0, 0])))
    except Exception as e:
        print(f"⚠ Could not read manifest: {e}")
        pack_name = "minecraft-pack"
        version = "1.0.0"
    
    # Create output filename
    timestamp = datetime.now().strftime("%Y%m%d")
    output_filename = f"{pack_name.lower().replace(' ', '_')}_v{version}_{timestamp}.mcpack"
    output_path = output_dir / output_filename
    
    # Create the .mcpack file (ZIP archive)
    try:
        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(temp_dir):
                for file in files:
                    file_path = Path(root) / file
                    arcname = file_path.relative_to(temp_dir)
                    zipf.write(file_path, arcname)
                    print(f"  └─ Added: {arcname}")
        
        print(f"\n✅ Successfully created .mcpack file!")
        print(f"📦 File: {output_path}")
        print(f"📏 Size: {output_path.stat().st_size / 1024:.2f} KB")
        
    except Exception as e:
        print(f"❌ Error creating .mcpack file: {e}")
        return False
    finally:
        # Clean up temporary directory
        if temp_dir.exists():
            shutil.rmtree(temp_dir)
    
    print("\n📋 Installation Instructions:")
    print("1. Download the .mcpack file from the dist/ folder")
    print("2. Open Minecraft Bedrock Edition")
    print("3. Go to Settings → Resource Packs")
    print("4. Click 'My Packs' → 'Add Pack'")
    print("5. Select the downloaded .mcpack file")
    print("6. Apply to your world and play!")
    
    return True


if __name__ == "__main__":
    success = build_mcpack()
    exit(0 if success else 1)
