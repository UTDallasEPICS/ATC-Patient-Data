##### Download Prequisites
* If you download all the elements here, you should be able to run the website on your end.

# Visual Studio Code Installation Guide

### IMPORTANT: Before scripting, use cd to get to filepath ATC-Patient-Data. Also check for nested repos, that can be an issue
* run `cd ATC-Patient-Data` to the terminal
### Note: All scripting should be done in Git Bash rather than powershell because your operating system may reject manual scripting in powershell by default


## Installing VS Code on a Mac

1. **Visit the Official Website:** Go to the [Visual Studio Code website](https://code.visualstudio.com/).

2. **Download the Installer:** Click on the 'Download for Mac' button. This will download a .zip file containing the VS Code installer.

3. **Extract the File:** Once the download is complete, open the .zip file to extract the application.

4. **Move to Applications Folder:** Drag the Visual Studio Code app to the Applications folder. This makes it accessible from the Launchpad.

5. **Launch VS Code:** Open the Launchpad, find Visual Studio Code, and click on it to open.

## Installing VS Code on Windows

1. **Visit the Official Website:** Navigate to the [Visual Studio Code website](https://code.visualstudio.com/).

2. **Download the Installer:** Select the 'Download for Windows' button. An .exe file will be downloaded.

3. **Run the Installer:** Once the download is complete, run the .exe file. This will start the installation process.

4. **Follow Installation Prompts:** Follow the prompts in the installation wizard. This includes agreeing to the license terms, choosing the installation location, and selecting additional tasks (like adding a desktop shortcut).

5. **Complete the Installation:** Click 'Install' and wait for the installation to complete. Once done, click 'Finish' to close the installer.

6. **Launch VS Code:** You can now find Visual Studio Code in the Start menu. Click on it to open.


# Install WSL (Windows Subsystem for Linux)
    * Only for Windows devices
    * Run `wsl --set-default-version 2` in command prompt


# Downloading Git

1. Installation: https://git-scm.com/downloads
2. When downloading Git, make the default path to your compiler, in this case, being VS Code.
3. To make a Git Bash terminal, make a new Terminal and click the arrow or carrot next to the plus sign.

![SwitchToBash1](https://github.com/UTDallasEPICS/ATC-Patient-Data/assets/126997597/8de0f334-d0bf-43a1-8ac2-e18dcad7028b)
![SwitchToBash2](https://github.com/UTDallasEPICS/ATC-Patient-Data/assets/126997597/3af57eaf-bcdb-4128-b2c4-5d3f88acf879)


After Git is downloaded, run these commands:

```bash
git checkout -b [Branch Name] # Create a new branch named whatever you want
git clone UTDallasEPICS/ATC-Patient-Data
```
![BashTerminal](https://github.com/UTDallasEPICS/ATC-Patient-Data/assets/126997597/978488c2-458b-432f-b282-bba42fd9d823)

Every time you start working on code, stash your code with `git stash` and then run `git pull [master] [Branch Name]` to keep your items updated.



# Node.js
1. When installing Node.js, npm will automatically install
2. Type `npm install pnpm` to the console
3. `pnpm -v` or `pnpm –version` to verify installation

# Prisma
- Needs npm (Node.js) installed
- `prisma -v`
    - If prisma not downloaded, you will be prompted to install


# Downloading Docker and PostgreSQL
- Install Docker Engine | [Docker Docs](https://docs.docker.com/engine/install/)
- PostgreSQL: [Downloads](https://www.postgresql.org/download/)
    - Do not make an account; you won’t need one.

![DockerScreenshot](https://github.com/UTDallasEPICS/ATC-Patient-Data/assets/126997597/563bb27e-373a-434b-be85-f95895d012c2)


* If the database does not show up, refer to this
    *   ATC-Patient-Data/Documentation/Docker and PostgreSQL.md at master · UTDallasEPICS/ATC-Patient-Data (github.com), [Link](https://github.com/UTDallasEPICS/ATC-Patient-Data/tree/master/Documentation)
* While coding/developing, the database should always be running.


* After cloning the repository, you should see the entire thing inside of GitHub.
* To run the website, ask your mentor for the AUTH0 key.
* Create a file named .env and copy-paste the example file[https://github.com/UTDallasEPICS/ATC-Patient-Data/blob/master/.env.example].
* Initialize the variable named AUTH0_CLIENT_SECRET to the AUTH0 key provided from the instructor. 
* Run `npm run dev` to your console. 
* If you don't have any issues, the URL will be displayed to the console as the website runs. 

* * Note: To add all new files in the ATC-Patient-Data folder to your Git commit, type `git add .` (PLEASE MAKE SURE YOU ARE ON THE ATC-Patient-Data FOLDER IN THE TERMINAL)