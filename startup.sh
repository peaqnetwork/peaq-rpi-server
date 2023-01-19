#!/bin/bash

# Exit script if any command fails
set -e

# Function to handle errors
error_handler() {
  echo "Error: An error occurred at line $1"
  exit 1
}

# Trap errors
trap 'error_handler $LINENO' ERR

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    # Log message
    echo "Installing Node.js..."

    # Check if nvm is installed
    if ! command -v nvm &> /dev/null
    then
        # Log message
        echo "Installing nvm..."

        # Install nvm
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    fi

    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    # Install the latest stable version of Node.js using nvm
    nvm install stable
fi

# Update package index files
sudo apt-get update

# Check if Nginx is installed
if ! command -v nginx &> /dev/null
then
    # Log message
    echo "Installing Nginx..."

    # Install Nginx
    sudo apt-get install -y nginx
fi

# Create the local script file
# touch local_script.sh

# Make the script executable
# chmod +x local_script.sh

# echo "@reboot ./local_script.sh" | crontab -

# Log message
echo "Cloning Node.js server repository..."

# Clone the Node.js server repository
git clone https://github.com/peaqnetwork/peaq-rpi-server.git

# Navigate to the server directory
cd peaq-rpi-server

# Log message
echo "Installing dependencies..."

# Install dependencies
npm i

# Log message
echo "Installing PM2..."

# Install PM2
npm install pm2@latest -g

# Log message
echo "Starting server using PM2..."

# Create the build

npm run build

# Start the server using PM2

pm2 start build/server.js

# Start the update script using PM2 which will be restarted every 20 seconds (update the time interval to 1 min)
pm2 start bash --exp-backoff-restart-delay=30000  --name "startup-script" -- -c "curl -H 'Cache-Control: no-cache, no-store' -s https://raw.githubusercontent.com/peaqnetwork/peaq-rpi-server/dev/update.sh | bash"

# Save the PM2 process list	
pm2 save

# Extract the Startup Script command from the output of 'pm2 startup'
startup_script=$(pm2 startup | awk '/sudo/ {$1=""; print "sudo " $0}')

# Execute the Startup Script command
eval "$startup_script"

# Save the PM2 process list	
pm2 save

# Log success message	
echo "Script completed successfully!"