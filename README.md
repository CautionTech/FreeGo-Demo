## Project Name 


    FreeGO: Hazard Free Travel

## Description 
Caut!on Tech, LLC which a is new rising company, Co-Founded by Sulaiman Bada (Sully), that creates technology and platforms to help keep people safe during their day-to-day activities.

In the mists of COVID-19, I realize that I have always valued safety especially being from another country. I wanted a way to make sure that people felt safer in the communities. A platform that keeps people safe during their day to day activities: FreeGo: Hazard Free Travel. This platform encompasses some of the values that I hold dear to me like community, safety, and knowledge through information.

FreeGo is a mobile application that allows the user to travel hazard free! With FreeGo, users will be able to receive live updates on hazards that are occurring in their area and be able to see them on rendered on a map! All hazards are posted by other users in the area that saw and reported that issue as well as hazards reported from external sources such as police department here Minneapolis. This way, users can use this application to keep themselves and others safe during their day-to-day lives.  

Live demo of the project can be found here: https://demo.cautiontechllc.com

## Build With 
<a href="https://www.heroku.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/heroku/heroku-original.svg" height="40px" width="40px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px"></a>
<a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px"></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px"></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px"></a>

# EDA Project
This version uses React, Redux, Express, Passport, PostgreSQL, and Node (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)

Create a new database called `freeGo` and  Copy the content in database.sql file  within the project and paste that into your database editor of your choice and execute that. 

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  REACT_APP_GOOGLE_API_KEY=YOUR_API_KEY
  ```
  *** please note if you want to deploy this project with heroku, you will need to do the following to get this key on heroku:
    - Log into heroku 
    - click on the project name
    - Go to the settings 
    - Click on Reveal Config Vars
    ![Screen Shot 2021-10-21 at 11 48 16 AM](https://user-images.githubusercontent.com/78863626/138321948-2793b162-2881-4602-80d8-180ea07f000f.png)
    - Enter your key name. Please make sure the key name is the same name in your project 
    - Enter your value. This will be the api key from google (geocode).

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


## Usage 
<img width="719" alt="Screen Shot 2021-10-20 at 11 23 23 PM" src="https://user-images.githubusercontent.com/78863626/138211198-bd6bf07c-9659-4a0e-93ce-572f133b0e32.png">
When navigating to the site, the user will be taken to the Login page. An existing user should enter their username and password. To submit this information, a user can click the Log In button.
 -If the username and password are correct, the user will be taken to their respective profile page.
 -If the user tries to submit without completing a required field, an error message pop-up will appear with instructions to complete all fields.
 -If the user enters the incorrect email address or password, an error message pop-up will appear informing them to try again.


 <img width="991" alt="Screen Shot 2021-10-20 at 11 29 52 PM" src="https://user-images.githubusercontent.com/78863626/138211783-24e3232d-b760-4bc9-8c09-72f64a98d70e.png">
 - If the users does not have a username and password, they can register by clicking on the sign up tab to complete their registration. The user will need to accept the terms and condition before they can register  for an account.
 
 <img width="718" alt="Screen Shot 2021-10-20 at 11 33 51 PM" src="https://user-images.githubusercontent.com/78863626/138212087-d6474f9a-bd02-4db9-9cc2-722db3a29357.png"> 
 Once the users logs into the application successfully, they will be brought to thier profile page.From their they can go to different places withing appliation. One option is going to the map to see all the hazards near their location. 


<img width="990" alt="Screen Shot 2021-10-20 at 11 33 03 PM" src="https://user-images.githubusercontent.com/78863626/138212024-ac2ba793-d657-48b2-adcd-86d7cdde8098.png">
In here the, the users will have access to all the hazards being reported by other users and external API resources. 

# Acknowledgement

We would like to thank Prime Digital Academy who equipped and helped us to make this application a reality.

**Caut!on Tech, LLC. Copyright © All Rights Reserved. Caut!on Tech, LLC owns FreeGo: Hazard Free Travel and all its related components**
# Support 
If you would like to support this project, please contact Sulaiman Bada at sulaimanbada8048@gmail.com

Thank you for reading through our project. 

