# Rewards App
This is a rewards app that functions the same as rewards card in coffee shops, where users recieve a free coffee after
a specified amount of coffees. The app is built using React, Node.js, and Auth0 for authentication. It also utilises tailwind for styling.

Some testing has been done with Vitest and React Testing Library.

The idea is that a Cafe will create an account, which will prompt them to specify how many coffees are required for a free coffee.
The cafe will then recieve two NFC tags, one for recieving a reward token, and one for viewing all available and used rewards.

## How it works
### User/Customer
Users will enter a cafe, scan the reward NFC tag **after purchasing a coffee**, and sign up. Upon signing up (and after every subsequent login thereafter), the server will
verify the tag scan, and issue a reward token. If the recieved token results in a free coffee, the user will see a popup at the bottom of the screen.
Then next time they enter the coffee shop, they can instead scan the view NFC tag, which will show them all the tokens they have used and available.
They can show this to the barista, who will then double click the reward and issue a free coffee. This reward will then be marked as used.

Each NFC tag is unique and assigned to each cafe with the cafe's ID embedded in the tag. This allows a scan to only show a users tokens for that cafe.

### Cafe
After a cafe has created an account, they will be able to login via the cafe login page. They can then view all customers, how many times they have visited (and scanned the NFC tag),
their suburb, age, and birth month. They can then segment and filter customers based on these attributes. One filtered, they can select the customers, and click "Copy numbers" to
copy the selected customers phone numbers to the clipboard. This allows them to send out SMS messages to customers, for example, to notify them of a new promotion or sale.

## Setup
To run the app you will need to create a database, and setup Auth0. with a single page application for interfacing with the client, as well as a machine-to-machine application to interface
with the server. You will also need a couple of custom actions to be able to send customer data to your database, and add the appropriate rules to each user/cafe upon signup.

### Auth0
1. Creating roles
    - On the Auth0 dashboard, navigate to `User Management -> Roles`
    - create roles for `cafe` and `user` (don't worry about permissions)
2. Creating a Single Page Application
    - On the Auth0 dashboard, navigate to `Applications -> Applications`
    - Click the `Create Application` button and choose `Single Page Web Applications` and name the application something
    like "client" or "rewards-client".
    - Navigate to the new application's Settings tab and find the `Allowed Callback URLs` section. Add in the callback route from the
    frontend (this would be something like "https://localhost:5173/callback" or "https://{your-public-domain.com}/callback". Just depends where you're running
    the frontend react page from).
    - In the same application settings tab, find the `Allowed Logout URLs` section and add the routes for "/auth/cafe", "/auth/dashboard" and "/auth/rewards" making sure to include the web origin before the routes. 
    - In the same application settings tab, find the `Allowed web origins` section and add the origin route (eg. "https://localhost:5173", "https://{your-public-domain.com}")
    - Save changes
3. Creating a Machine to Machine Application
    - Head to the `APIs` tab and authorise for both the Auth0 management API and the recently created client Single Page Application
4. Creating forms
    - Follow the steps at this [link](https://developer.auth0.com/resources/labs/forms/add-additional-signup-steps#introduction) to create additional signup 
    steps. These give the signup flow additional steps based on the user role. 
    - for the first form, title it appropriately for users, such as "user-form" and add a date/time field for date of birth and a text field for suburb
    - after you have the first form linked up, create another form for cafes titled "cafe-form" and add a text field for cafe name, and a number field for reward frequency.
    - When you get to the render aditional signup form section, this is what I had:
    ```javascript
        /**
        * @param {Event} event - Details about the user and the context in which they are logging in.
        * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
        */
        exports.onExecutePostLogin = async (event, api) => {
          const CAFE_FORM_ID = 'your_cafe_form_id';
          const USER_FORM_ID = 'your_user_form_id';

          // If a cafe logs in and doesn't have a name or rewards frequency and
          // isn't an accidental user login
          if (
            event.request.query.role === "cafe" &&
            !event.user.user_metadata.cafe_name && 
            !event.user.user_metadata.reward_freq &&
            !event.authorization?.roles.includes("user")
            ) {
              api.prompt.render(CAFE_FORM_ID);
          } 
          
          // If a user logs in and doesn't have a dob or suburb
          else if (
            event.request.query.role === "user" &&
            !event.user.user_metadata.dob && 
            !event.user.user_metadata.suburb &&
            !event.authorization?.roles.includes("cafe")
            ) {
              api.prompt.render(USER_FORM_ID);
          }
        }

        /**
        * @param {Event} event - Details about the user and the context in which they are logging in.
        * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
        */
        exports.onContinuePostLogin = async (event, api) => {}
    ```
    
5. Adding role to each user/cafe on first login
    - On the Auth0 dashboard, head to `Actions -> Triggers` and click post-login and add a new action from scratch
    - This is an example of what to add. Essentially, it checks if this is the users first login, and if not, checks what sign in page they've come from,
    and adds a new role to their user account based on that information (either cafe or user role). 
    ```javascript
        const axios = require("axios");
        /**
        * Handler that will be called during the execution of a PostLogin flow.
        *
        * @param {Event} event - Details about the user and the context in which they are logging in.
        * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
        */
        exports.onExecutePostLogin = async (event, api) => {
          
          // Set role if first login
          if (event.stats.logins_count === 1) {

            const ManagementClient = require("auth0").ManagementClient;

            const roles = {
              "user": event.secrets.AUTH0_USERID,
              "cafe": event.secrets.AUTH0_CAFEID
            }

            const newRole = roles[event.request.query.role];

            const management = new ManagementClient({
              domain: event.secrets.AUTH0_DOMAIN,
              clientId: event.secrets.AUTH0_CLIENT_ID,
              clientSecret: event.secrets.AUTH0_CLIENT_SECRET,
            });

            const params = { id: event.user.user_id };

            const data = { "roles": [newRole] };
            try {
              const oldRoles = await management.users.getRoles(params);

              const hasRole = oldRoles.data.length >= 1 ? true : false;
              
              // If a role isn't found, then add it
              if (!hasRole) {
                //await management.users.assignRoles(params, data);
                const namespace = 'https://app.rewards.com';
                api.idToken.setCustomClaim(`${namespace}/role`, event.request.query.role);
                api.accessToken.setCustomClaim(`${namespace}/role`, event.request.query.role);
                await management.users.update(params, { "app_metadata": {
                  "role": event.request.query.role
                  }
                });

                await axios.post("https://6d92-49-180-193-128.ngrok-free.app/api/db/add", {
                  user: event.user,
                  role: event.request.query.role,
                  secret: event.secrets.AUTH0_HOOK_SECRET
                });
              }

            } catch (err) {
              console.log(err);
            }
          }

          // add the custom claim to access role on frontend
          const namespace = 'https://app.rewards.com';
          if (event.authorization) {
            // Set claims 
            api.idToken.setCustomClaim(`${namespace}/role`, event.request.query.role);
          }
        }



        /**
        * Handler that will be invoked when this action is resuming after an external redirect. If your
        * onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
        *
        * @param {Event} event - Details about the user and the context in which they are logging in.
        * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
        */
        // exports.onContinuePostLogin = async (event, api) => {
        // };
    ```
    - NOTE: Make sure the axios post url matches your backend's route, otherwise the user role won't be added to the user in your database. Also, make sure the cafeId and userId match the id's of your auth0 roles (can find them by checking said roles in the roles tab), and the domain, clientId and clientSecret match too.

### Database
The database is a PostgresQL database and currently has the following tables:

#### Users
| Column        | Type              | Description          |
| ------------- | ----------------- | -------------------- |
| `id`          | UUID              | Primary Key          |
| `phoneNumber` | text              | User's phone number  |
| `dob`         | date              | Date of birth        |
| `suburb`      | text              | User's suburb        |
| `createdAt`   | timestamp \| null | Record creation time |
| `updatedAt`   | timestamp \| null | Last update time     |


#### Cafes
| Column        | Type              | Description           |
| ------------- | ----------------- | --------------------- |
| `id`          | UUID              | Primary Key           |
| `name`        | text              | Cafe name             |
| `phoneNumber` | text              | Cafe phone number     |
| `rewardFreq`  | int               | Frequency for rewards |
| `createdAt`   | timestamp \| null | Record creation time  |
| `updatedAt`   | timestamp \| null | Last update time      |


#### Rewards
| Column         | Type              | Description             |
| -------------- | ----------------- | ----------------------- |
| `id`           | UUID              | Primary Key             |
| `userId`       | UUID              | Foreign Key → Users.id  |
| `cafeId`       | UUID              | Foreign Key → Cafes.id  |
| `tokenCount`   | int               | Tokens accumulated      |
| `validRewards` | int               | Number of valid rewards |
| `usedRewards`  | int               | Number of rewards used  |
| `visitCount`   | int               | Total number of visits  |
| `createdAt`    | timestamp \| null | Record creation time    |
| `updatedAt`    | timestamp \| null | Last update time        |


## Client
- Install dependencies: `npm install`
- Add `.env` file with the following variables:
    - VITE_AUTH0_DOMAIN: The domain of Auth0 
    - VITE_AUTH0_CLIENT_ID: The client ID of Auth0
    - VITE_AUTH0_CALLBACK_URL: The callback URL (eg. https://localhost:5173/callback)
    - VITE_AUTH0_CLIENT_URL: The base client URL (eg. https://localhost:5173)
    - VITE_API_SERVER_URL: The base URL of the server (eg. https://localhost:5000/api)
    - VITE_API_AUDIENCE: The audience of Auth0
- dev: `npm run dev`
- tests: `npm run test:ui`

## Server 
- Install dependencies: `npm install`
- Add `.env` file with the following variables:
    - NODE_ENV: `development` or `production`
    - PORT: The port the server will run on
    - DATABASE_URL:  The URL of the database
    - AUTH0_SECRET: The secret used to sign the JWT in Auth0 (generate one yourself and make sure its the same as the secret in the Auth0 adding role
    post login trigger)
    - AUTH0_AUDIENCE: The audience of Auth0
    - AUTH0_DOMAIN: The domain of Auth0
    - ETRNL_KEY: The key for the Etrnl API (NOTE: This currently doesn't work and need to find another solution for verifying tag scans)
- dev: `npm run dev`
- prod: `npm run build` and `npm run start`


## Further notes
Currently a few things could be improved/simlified
- Auth0 is quite time consuming hard to wrap your head around in terms of setting up and adding/changing features. It may be easier to create your own authentication implementation (using JWT's) so that you don't need to rely on a 3rd party service. 
- Need to figure out a way to scan tags and verify they're valid scans. The idea was to use NTAG424 DNA tags as they have authentication built in, but are hard to program.

Also, if you have issues setting up Auth0, (which I did) just look at the documentation for it. It's really useful and provies structrured guides for everything
