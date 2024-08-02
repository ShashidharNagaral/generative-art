#!/bin/bash

# Check if project name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

PROJECT_NAME=$1
PROJECT_DIR="./$PROJECT_NAME"

# Create project folder in generative-art directory
mkdir -p "$PROJECT_DIR"

# Create index.html in the project folder
echo "<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <link rel=\"stylesheet\" href=\"./styles.css\" />
    <title>$PROJECT_NAME</title>
  </head>
  <body>
    <div id=\"root\"></div>
    <script type=\"module\" src=\"./index.js\"></script>
  </body>
</html>" > "$PROJECT_DIR/index.html"

# Create index.js in the project folder
echo "import React from \"react\";
import { createRoot } from \"react-dom/client\";
import App from \"./src/App\";

const root = createRoot(document.getElementById(\"root\"));
root.render(<App />);" > "$PROJECT_DIR/index.js"

# Create styles.css in the project folder
echo "body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}
#root {
  padding: 0;
}" > "$PROJECT_DIR/styles.css"

# Initialize npm and install dependencies
cd "$PROJECT_DIR" || exit
npm init -y
jq 'del(.main) | del(.keywords) | del(.scripts.test) | .description = "" | .scripts.start = "parcel index.html" | .author = "Shashidhar Nagaral" | .repository = {"type": "git", "url": "https://github.com/ShashidharNagaral/generative-art"}' package.json > package.json.tmp && mv package.json.tmp package.json

npm install parcel react react-dom p5

# Create src folder and App.js file
mkdir -p "src"

echo "const App = () => {
  return <div>Welcome to the $PROJECT_NAME project!</div>;
};

export default App;" > "src/App.js"

echo "Project $PROJECT_NAME setup complete."
