## DOCKER, PRISMA, POSTGRESQL, AND GIT ARE REQUIRED TO DOWNLOAD
# Instructions to download and set up Docker
    * [https://docs.docker.com/engine/install/](url)
    * Go through the launcher steps, but you do NOT need to create an account, that's a trap.
# Link to download and set up PostgreSQL
    * [https://www.postgresql.org/download/](url)
    
# IMPORTANT!!!! Use Git Bash Console instead of Powershell Console (Your OS may reject scripting using Powershell)

# Building and Running Database
    * run `cd ATC-Patient-Data`
    	* `cd` makes the console "look at" a given file. This is to make sure the console is looking at the ATC-
    * run `docker-compose up` 
    * run `npx prisma db migrate`
    	* You need to have Prisma installed
     	* Check for installation with `npx prisma -v`
      		* You will be prompted to install prisma if you don't have it.
	* Run the database with the Docker application
      
# Build and run project
    * run `npm run dev`
