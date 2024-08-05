# installing the project
Install Ubuntu (Windows): https://learn.microsoft.com/en-us/windows/wsl/install
1. Go to command prompt as administrator and type the command 'wsl --install'
2. Restart device to apply the changes
3. Set up your linux user info (use an easily entered password)
	
Install Docker: https://docs.docker.com/engine/install/ubuntu/
follow the instuructions under: “Install using apt repository”

Install NPM: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
Enter the command ‘npm install -g npm’

Clone the code from github’s repository:
1. Open the github page with the repository
2. Click on ‘code’ which is above the list of files
3. Click on the link with the two squares, which also says ‘Copy url to clipboard’
4. Open Ubuntu
5. Type the command ‘git clone [URL link of the repository]’ and press enter

Install Prisma:
1. Check is node.js and npm is installed with the commands
2. node -v
3. npm -v
4. Use the command ‘npm i -g prisma’
5. Use the command ‘npm i @prisma/client’

Instal Headless UI: ‘npm i @headlessui/vue’


# Versions needed for the project:
npm: 10.8.1
node.js: v22.3.0
prisma: 5.17.0
@prisma/client: 5.17.0
docker: 26.1.4, build 5650f9b

# How to run the project?
1. Open a terminal
2. Make sure the project is your working directory
3. Enter the command “sudo docker compose up”
4. Open another terminal
5. Type and enter command “npm run dev”
6. Open a browser
7. Type in the local host link
