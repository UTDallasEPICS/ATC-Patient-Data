# Building and Running Website
1. run `cd ATC-Patient-Management-frontend`
2. run `npm install` if you don't have Node.js installed already (you should)
    * > NOTE: may have upstream dependency conflict
    * run `npm install --force`
    * > NOTE: Read up on `--force` [here:](https://stackoverflow.com/questions/66020820/npm-when-to-use-force-and-legacy-peer-deps)
3. run `npm run dev` to start frontend
    * > NOTE: Back-end must be running, else fetch error when logging in (Check Docker!)
4. go to http://localhost:3000 in browser to see the app and the URL should be given in terminal
