# ATC Student Database
## Main Functionality
ATC calls patients students and we will be referring to them as such. This is a database in the works for the Autism Treatment Center. It should store data about students, the technicians, parents, and doctors who are involved with said student. There needs to be roles that have certain permissisions depending on what they are. 
### Auxiliary Functionalities


## Third Party Integrations
**Auth0**
* Auth0 stores our user data. The idea of Auth0 is that it checks if who's attempting to log in is who they say they are.
* If the user information sent to Auth0 doesn't match the Auth0's database, the connection is killed.
* If the user information stored in Auth0 doesn't match what's inside the database, the database rejects the connection.



## Getting Started
Before anything, read last semester's final report in Edusouced, read everything in the [documentation](https://github.com/UTDallasEPICS/ATC-Patient-Management-Backend/tree/main/Documentation), and everything in the [wiki](https://github.com/UTDallasEPICS/ATC-Patient-Management-Frontend/wiki).
When creating code, please use comments as you write; it helps during and after writing. 
Before attempting to run the website, please visit [the prerequisites file:](https://github.com/UTDallasEPICS/ATC-Patient-Data/blob/Docu_Cleaning/Documentation/Start%20from%20Scratch.md)


## Run Web Application
1. `cd` to ATC-Patient-Management
2. run `npm run dev` to start the website
    * > NOTE: Back-end must be running, else fetch error when logging in
3. go to `http://localhost:3000` in browser to see the app

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
