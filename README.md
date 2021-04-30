# Getting Started Guide

### Steps to run the project in the local machine 

#### Pre-Reqs

 - `NodeJS  --->  v14.15.0` 

In case if you don't have node installed in your machine? Get it from [here](https://nodejs.org/download/release/v14.15.0/node-v14.15.0.pkg). Download and install it. 

Step #1 

   Clone this repo and `cd` into the project folder and then run the following to install all the required dependencies:

```cmd
   yarn install 
```

Step #2

 Add/replace the following line the `.env` file:

 - REACT_APP_BE_BASE_URL=http://localhost:3012


Step #3

Before you run this step make sure the backend is up and running. Since frontend is dependent on backend APIs.

Start the local server. Run the following with the project folder

```cmd
yarn start 

```


 ### Steps for making changes in the live server

Add/replace the following line the `.env` file:

 ```env
 REACT_APP_BE_BASE_URL=https://customer-dashboard-be.herokuapp.com
```

Then, make changes and push them to the repo. The deployement will auto trigger and the changes will at [https://hardcore-knuth-8763cf.netlify.app](https://hardcore-knuth-8763cf.netlify.app/)