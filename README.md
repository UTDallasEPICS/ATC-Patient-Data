# ATC Student Database
## Main Functionality
ATC calls patients "students" and we will be referring to them as such. This is a database in the works for the Autism Treatment Center. It should store data about students, the technicians, parents, and doctors who are involved with said student. There needs to be roles that have certain permissisions depending on what they are. 
### Required Functionalities
#### Note: The folder named analytics is currently useless and doesn't have a function, but Taz says to keep it just in case the idea of the code becomes useful later on.
* Ideal functional requirements for the app are accessibility on Android and Mac Operating System
* There has to be a login page that connects to Auth0. As of now, a developer will be able to sign in/create an account using Google, assuming that they have the Authorization key provided by the instructor. It will be the first thing you see when you open the link provided in the terminal ([auth0].tsx). 
* Upon logging in, you are instantly taken to the Student Search Page. From this page, you can **add**, **edit**, view existing **profiles**, and **search** for students (Found in ATC-Patient-Data\pages\student\search.tsx).
  * Pressing the **ADD NEW** button will result in going to a new page where you can create a new Student component/object with information tied to said objects (ATC-Patient-Data\pages\student\new.tsx).
  * Pressing the **EDIT** button will result in going to a new page where you can edit existing information about a Student that already exists (ATC-Patient-Data\pages\student\edit.tsx).
  * Clicking on a profile link will take you to a page that displays all existing information about said Student (ATC-Patient-Data\pages\student\profile.tsx).
* It also needs to be able to list goals that are added by BCBAs and provide RBTs with the ability to take data on those goals that directly reflect the mastery criteria [PAGES TO BE ADDED WHEN ANUSHA'S PR GOES THROUGH]
* Basic Student information would need to be added such as name, date of birth, diagnosis, any restrictions such as dietary, movement, etc., funding source, and supervising BCBA would need to be added. The app should be able to have a queue of targets for each goal that BCBAs can add.

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
