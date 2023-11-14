## DOCKER, PRISMA, POSTGRESQL, AND GIT ARE REQUIRED TO DOWNLOAD
# Use Git Bash Console instead of Powershell Console
# Building and Running Database
    * run `cd ATC-Patient-Data`
    	* `cd` makes the console "look at" a given file. This is to make sure the console is looking at the ATC-
    * run `docker-compose up` 
    * run `npx prisma db migrate`
    	* You need to have Prisma installed
     	* Check for installation with `npx prisma -v`
      
# Build and run project
    * run `npm run dev`
