#!/bin/bash

# Color replacement mapping script
# Old colors -> New colors

echo "Starting color replacement..."

# Create backup first
echo "Creating backup of src directory..."
cp -r src src_backup_colors

# Define the replacements
declare -A replacements=(
    # Primary replacements
    ["deep-forest"]="navy"
    ["warm-gold"]="tan"
    ["rich-brown"]="burgundy"
    ["sage-green"]="tan-light"
    ["hunter-green"]="success"
    ["barn-red"]="error"
    ["hay-gold"]="warning"
    ["sky-blue"]="info"
    ["mocha-mousse"]="tan"
    
    # Gradient replacements for hero sections
    ["from-deep-forest to-hunter-green"]="from-navy to-navy-dark"
    ["bg-deep-forest/10"]="bg-burgundy/10"
    ["bg-sage-green/20"]="bg-tan-light/20"
    ["bg-sage-green/10"]="bg-tan-light/10"
    ["bg-sage-green/30"]="bg-tan-light/30"
    ["bg-hunter-green/10"]="bg-success/10"
    ["text-warm-gray"]="text-gray"
    ["border-warm-gray"]="border-gray"
    
    # Special compound cases
    ["text-deep-forest"]="text-navy"
    ["text-warm-gold"]="text-tan" 
    ["text-rich-brown"]="text-burgundy"
    ["text-sage-green"]="text-tan-light"
    ["text-hunter-green"]="text-success"
    ["bg-warm-gold"]="bg-tan"
    ["bg-deep-forest"]="bg-navy"
    ["bg-rich-brown"]="bg-burgundy"
    ["bg-sage-green"]="bg-tan-light"
    ["bg-hunter-green"]="bg-success"
    ["hover:text-deep-forest"]="hover:text-navy"
    ["hover:text-warm-gold"]="hover:text-tan"
    ["hover:bg-deep-forest"]="hover:bg-navy"
    ["hover:bg-warm-gold"]="hover:bg-tan"
    ["hover:bg-sage-green"]="hover:bg-tan-light"
    ["border-deep-forest"]="border-navy"
    ["border-warm-gold"]="border-tan"
    ["border-sage-green"]="border-tan-light"
    ["ring-warm-gold"]="ring-tan"
    ["ring-deep-forest"]="ring-navy"
    ["ring-sage-green"]="ring-tan-light"
    ["focus:ring-warm-gold"]="focus:ring-tan"
    ["focus:ring-deep-forest"]="focus:ring-navy"
    ["focus:ring-sage-green"]="focus:ring-tan-light"
)

# Function to replace in all Vue files
replace_in_files() {
    local old="$1"
    local new="$2"
    
    echo "Replacing '$old' with '$new'..."
    find src -name "*.vue" -type f -exec sed -i "" "s/${old}/${new}/g" {} \;
}

# Perform replacements
for old in "${!replacements[@]}"; do
    new="${replacements[$old]}"
    replace_in_files "$old" "$new"
done

echo "Color replacement complete!"
echo "Backup saved in src_backup_colors/"