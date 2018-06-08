Streamlined Beauty API
============================
This app supports [Streamlined Beauty](https://github.com/Sakela17/streamlined-beauty-app) web application. See [here](https://github.com/Sakela17/streamlined-beauty-app) for more details.

### Motivation
It was a two-week project for Engineering Immersion program at [Thinkful](https://www.thinkful.com/bootcamp/atlanta/).
The goal was to develop a full-stack project, creating a frontend using React and Redux which communicates with a Node backend.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
#### Installation
* Install [Node](https://nodejs.org/en/), which comes with [NPM](https://www.npmjs.com/)
* Install [Heroku CLI](https://devcenter.heroku.com/categories/command-line)
* Navigate to desired directory and run `git clone https://github.com/Sakela17/streamlined-beauty-app-api.git` to clone this repo
* ```cd``` into the project's folder and run ```npm install``` to install dependencies
* In the root of the project, create ```.env``` file and store a secret key for JWT like so: ```JWT_SECRET="your_own_key"```
* Create `.gitignore` file and add `.env`
* Install PostgresSQL on Mac using [Homebrew](https://brew.sh/) or use [EnterpriseDB installer](https://www.postgresql.org/download/windows/) for Windows
* Follow the instruction to create user name and password for Postgres DB (if applicable)
* Create a database but running `create -U [username] [name-of-DB]`
* In `config.js` add `'postgres://[username]:[password]@localhost/[name-of-DB]'` as a second argument to the `DATABASE_URL` variable. 
It should look similar to this `DATABASE_URL: process.env.DATABASE_URL || 'postgres://[username]:[password]@localhost/[name-of-DB]'`
* Start Postgres server by running `pg_ctl start`
* In project root directory run `psql -U [username] -f ./db/sql-queries.sql -d [name-of-DB]`. This will crate schema for your DB 
and populate few rows of dummy data.
* Run ```npm start``` command to run local server on PORT 8080

Now you can use [Postman](https://www.getpostman.com/) or navigate to `http://localhost:8080` in the browser to test the end points.

#### Deploy on Heroku
These instruction will help you to set up database on mLab and deploy this app on Heroku.
* Create [Heroku](https://signup.heroku.com/identity) account
* Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) command line
* In the terminal, run ```heroku --version``` to confirm the installation
* Type ```heroku login``` and enter your Heroku username and password
* ```cd``` into your project directory
* Create new remote Heroku repository by running ```heroku create``` (make sure to commit beforehand)
* Run ```git push heroku master``` to push the repo to Heroku platform  
__*In the next steps, you will add Postgres database hosted on ElephantSQL to your Heroku application*__ 
* Sign up for free [ElephantSQL](https://customer.elephantsql.com/login) account
* Next, from the dashboard, you'll need to create a new database instance. Choose the free option for plan, and go with the default value for data center
* Once the new instance is created, run `psql -f ./sql-queries.sql -d [URL-value-from-new-instance]` to upload data
* Open [Heroku](https://id.heroku.com/login) homepage and navigate to Personal Apps -> Name_Of_Your_App -> Settings and click on Reveal Config Vars button
* You need to add the following environment variables:
    1. JWT_SECRET
    2. JWT_EXPIRY
    3. DATABASE_URL (use URL value from the instance you created on ElephantSQL earlier)
* Back in [Heroku](https://id.heroku.com/login) click on the project -> 'Open app' button. (optionally: launch the app by running ```heroku open``` in the terminal)

If everything went well, now this app is deployed on Heroku using ElephantSQL to host Postgres database. 
 
 ## Built With
 
 [Node.js](https://nodejs.org/en/)
 
 [Express.js](https://expressjs.com/)
 
 [PostgresSQL](https://www.postgresql.org/)
 
 [Knex](https://knexjs.org/)
 
 [pg](https://www.npmjs.com/package/pg)
 
 [Passport](http://www.passportjs.org/)
 
 [passport-jwt](https://www.npmjs.com/package/passport-jwt)
 
 [passport-local](https://www.npmjs.com/package/passport-local)
 
 [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)
 
 [JWT](https://jwt.io/)
 
 [dotenv](https://www.npmjs.com/package/dotenv)
 
