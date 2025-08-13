
#  Replace these values with your actual paths and names.

APP_DIR="/var/www/your-app-directory" # The directory where your app's code is stored
APP_NAME="your-app-name"              # A name to identify your app in PM2
GIT_BRANCH="main"                     # The branch to pull from your GitHub repository

echo "--- Starting deployment for $APP_NAME ---"

# 2. NAVIGATE TO THE APPLICATION DIRECTORY

echo "Navigating to application directory: $APP_DIR"
# The 'cd' command changes the directory. The '||' part ensures the script exits if the directory isn't found.
cd $APP_DIR || { echo "Error: Failed to change directory. Exiting."; exit 1; }


# 3. PULL THE LATEST CODE
#  This command fetches the newest code from your GitHub repository.
echo "Pulling latest code from branch $GIT_BRANCH..."
git pull origin $GIT_BRANCH || { echo "Error: Failed to pull code. Exiting."; exit 1; }


# 4. INSTALL DEPENDENCIES AND BUILD
#    This ensures all Node.js packages are up to date.

echo "Installing/updating Node.js dependencies..."
npm install || { echo "Error: Failed to install dependencies. Exiting."; exit 1; }

# 5. RESTART THE APPLICATION SERVICE
#    - We use PM2 to manage and keep the Node.js process running.
#    - This command restarts the app without downtime.

echo "Restarting application service with PM2..."

# Replace 'server.js' with the name of your main backend entry file.
# The `pm2 restart` command will restart the app if it's already running.
# If not, the '||' part will start a new process.
pm2 restart $APP_NAME || pm2 start server.js --name $APP_NAME

echo "--- Deployment finished successfully! ---"