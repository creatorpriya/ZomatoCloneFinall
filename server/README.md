# Initial setup
https://github.com/creatorpriya/ZomatoCloneFinall.git

git clone https://github.com/creatorpriya/ZomatoCloneFinall.git
cd zomato clone
mkdir server
cd server
npm i

<!--dependencies-->
npm install express mongoose dotenv

<!--dev dependencies-->
npm i --save-dev nodemon @babel/cli, @babel/core and @babel/preset-env @babel/node.

# API Panning.
- food (food item and their details).
- Resturant (Resturant and their details).
- Menu (Menu and their details).
- order (order and their details).
- images (storing all the images related to the zomato.)
- review (store all the list of reviews).
- user (user related details, username, email and password).

jwt => jsonWebToken
session based application.
   >>token 
      >> for the first time when we visit the application we login or create the account.
         >> at this point of time ->> a new JWT token will be generated.
           >> if we revisit the application after 1day or 10 days or 10 months .... so, we don't need to pass the credentials.
                 insted while making the requiest the generated JWT token will be send to the server.
                  
            >> JWT will be stored in the client or enduser browser-  (cookies, localstorage )
            >> JWT also have expirations it depends on business perspective (1 day ,10 days or 10 years )      