#!/bin/bash
# Verifica que cada feature tenga su spec correspondiente

for file in "$@"; do
if [[ $file == src/features/* ]]; then
feature_name=$(echo $file | sed 's|src/features/||' | cut -d'/' -f1)
spec_file="specs/${feature_name}.md"

if [[ ! -f $spec_file ]]; then
echo "ERROR: Missing spec for feature '$feature_name'"
echo "Expected: $spec_file"
echo "Create the spec before committing feature code."
exit 1
fi
fi
done
