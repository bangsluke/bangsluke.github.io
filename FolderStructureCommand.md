```
mkdir assets
cd assets
echo "# Assets folder can contain all the static files such as images, fonts, etc." > README.md
cd ..
mkdir components
cd components
echo "# Shared components used across the entire application" > README.md
cd ..
mkdir config
cd config
echo "# All the global configuration, env variables etc. get exported from here and used in the app" > README.md
echo "# Add an API Key" > .env
echo "API_KEY=AddKey" >> .env
cd ..
mkdir data
cd data
echo "# Any stored data that is used across the application" > README.md
cd ..
mkdir features
cd features
echo "# Feature based modules" > README.md
cd ..
mkdir hooks
cd hooks
echo "# Shared hooks used across the entire application" > README.md
cd ..
mkdir lib
cd lib
echo "# Re-exporting different libraries preconfigured for the application" > README.md
cd ..
mkdir providers
cd providers
echo "# All of the application providers" > README.md
cd ..
mkdir routes
cd routes
echo "# Routes configuration" > README.md
cd ..
mkdir stores
cd stores
echo "# Global state stores" > README.md
cd ..
mkdir test
cd test
echo "# Test utilities and mock server" > README.md
cd ..
mkdir types
cd types
echo "# Base types used across the application" > README.md
cd ..
mkdir utils
cd utils
echo "# Shared utility functions" > README.md
cd ..
echo "# local env files" > .gitignore
echo ".env" >> .gitignore
```