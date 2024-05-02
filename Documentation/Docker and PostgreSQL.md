# How to Install and Setup **Docker**

* Go to [https://www.docker.com/products/docker-desktop/]
  * Note: Do not make a Docker account, you won't need one.

* Install Docker for your OS

* When Docker is installed, you will also need PostgreSQL installed as well.

# How to Install and Setup **PostgreSQL**

* NOTE: All commands should be run on Git Bash because your computer may reject manual scripting on powershell (there is a way to turn this off, but at the time of writing this, it is unknown).
* run `docker-compose up`
* run `npx prisma migrate reset`
* run `npx prisma db migrate`
* run `npx prisma -v` to verify the installation of Prisma if this doesn't work. If not, you will be prompted to download the stuff for Prisma. Run it again after installation.

  
* **Your container and database should be all set! Remember to always have your database running while you develop.**
