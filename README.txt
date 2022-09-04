--- SERVER ---
Combining Back & Front Steps

1. Create new DB and new tables
2. db.js: Change the DB we are using (jwttutorial => authtodolist)
3. dashboard.js: Edit router.get("/") to do joins between the two tables
4. dashboard: Copy-paste 'Create a Todo' from perntodo_back. 
    Include 'authorization' route. 
    Change SQL call to take in req.user.id.
5. dashboard: Copy-paste 'Update a Todo'
    [Do same as "createAtodo"]
    Note: As-is, it works, but different users can edit other users' data if they know the todo id.
    To solve this, we must ensure that users can only change todos that match their user_id's.
    Add in a RETURNING statement.
    Add in an "AND" clause and an if statement to respond accorningly.
6. dashboard: Copy-paste "Delete a Todo"
    [Do same as "createAtodo"]
    Basically, same logic as "Update a Todo."

-- HEROKU DEPLOYMENT --

-- Client Build / File Structure --
1. Combine FRONT and BACK files into one directory
2. Run 'npm run build' inside client folder to create 'build' directory.
    This stores a production build of the app. 
    [ Note: There can only be ONE package.json file in the tree path- if build fails, there is
    likely a package.json file in its parent(s). ]
3. Take out all contents of backend folder into root directory.

-- Install New Dependancies --
1. Download Heroku CLI
2. Make sure GIT is installed
3. Add .env and /node_modules to gitignore. Delete .env and /node_modules from github.
4. Push to Github : .git folder should be inside root directory.
    Inside Bash Terminal, reveal hidden folders with command 'ls -a'
    if .git isnt there, run 'git init'

-- Configure index.js Server file --
1. index.js : process.env.PORT : Heroku provides envVars to use.
    Heroku hosts our site- we must use heroku's PORT number
2. index.js : process.env.NODE_ENV : returns if app is in production or not.
    Used for checking when to serve static files.
3. app.use(express.static(path.join(__dirname, "client/build"))); 
    Serves static files from the 'build' folder
    Essentially runs 'client' on localhost:5000.

--- Questions ---
- Whats npm run build? : Runs 'build' from package.json 'scripts' field. 
    Runs 'react-scripts build.' Creates a 'build' directory- a "production build" of your app.
- Dev vs. Prod builds : Dev builds are for dev. 
    Dev builds have Source Maps, Debugging, and one-hot reloading. 
    Prod builds are what run on client's machine. 
    Prod builds combine source files into minimized files. 
- Whats static content? : Any file stored on a server that is the same 
    everytime its delivered to users.
- express.static() : Serves static files like images, CSS, and JS.
    express.static(root, [options]);
- Whats the path library? : Interacts/Manipulates file system paths.
    path.join() formats strings into a filepath structure.
- process.env : Global Variable representing the system emvironment your app on start.
    Also contains .env file data.
- __dirname : Local variable that returns directory name of current module/folder path 
    of current JS file

-- Configure DB Connection --
1. .env : Create envVars for pool objects in db.js
2. db.js : Create new object 'devConfig' that contains pool values.
    Replace the hardcoded pool values with the envVars you just made.
3. db.js : Create new object 'proConfig' that contains DATABASE_URL
4. Edit 'pool' to take in a 'connectionString' object

-- Questions --
- What is a heroku addon?
- What is proConfig, why is it so short compared to devConfig?
- How do you switch between production and development?

-- SetUp Scripts in package.json --
Heroku runs your scripts in a specific order.
heroku-prebuild > npm install > heroku-postbuild > start server
1. Add new scripts to the package.json file.
    [ Note: 'build' folder isnt going to exist by default. We must create it in heroku-postbuild ]
    We want to: cd into client folder > install packages > run 'npm run build' > start server
    "heroku-postbuild": "cd client && npm install && npm run build"
2. package.json: add "engines":{"node": "14.17.3", "npm":"6.14.13" }
    (determines version of Node we are using for this app)

-- Questions --
- Why doesn't build exist by default?

-- Setup Proxy in Client Side --
1. All AJAX calls (to localhost:5000) in client are invalid if server is in production mode.
    To solve this, use a proxy! When sending app to production, proxy is ignored, 
    and our routes will route to the heroku domain.
2. client > package.json > "proxy": "http://localhost:5000/"
3. Register/App/Login/Dashboard/EditTodo/InputTodo/ListTodos : remove 'http://localhost:5000' and it will default to proxy.
4. Reset Cache so client calls target 5000 : Delete client's package-lock and node_modules,
    reinstall all dependancies with 'npm install', restart VSCode.
    If this doesn't work, run 'nodemon index --ignore client' in package.json
5. npm run build

Application is now ready for deployment.

-- Questions --
- Whats a proxy : It's a default URL that is set in package.json. It is ignored in production.
-- Setup Engines in package.json and Catchall Method --

! Catchall method (app.get(*)) isn't working, or maybe it is? index.html seems empty.
! Network tab and localStorage seem to be buggy on static builds...


-- Deploying to Heroku --

1. gitbash > 'heroku login' 
2. 'heroku create appname' (perntodoauth is our appname)
3. Install addon Heroku Postgres, a postgres cloud service : 
    'heroku addons:create heroku-postgresql:hobby-dev -a perntodoauth'
4. Connect with Heroku Postgres(Go inside psql terminal) : 'heroku pg:psql -a perntodoauth'
5. Get Config Vars 'DATABASE_URL' and 'KEY' from Heroku Project Homepage > Settings > ConfigVars

--  Database Management --
[Note: Delete all client devDependancies]
[Add script 'start' to package.json]
1. Create tables within our heroku postgres. Don't create a new DB, it's already made.
2. Align remote with herokus remote URL. (?)
    'heroku git:remote -a perntodoauth'
3. Install heroku buildpacks with 'heroku buildpacks:set heroku/nodejs'
4. npm install --only=dev && npm install && react-scripts build
5. 'git push heroku master' / 'git push heroku main'

DONE!

'heroku open' to open your website!

-- Questions --
- What does "set git remote heroku' mean?

-- Big Brain Observations --

- When deploying app, client should be a child of the server file
- Client should have a 'build' child directory containing the production version of the client.
This makes it so client is smaller and faster to send.
- The server we serve this on is different depending on if were in dev or prod. Dev uses 5000, prod uses heroku's servers. 
- In order to use heroku's servers, we must utilize heroku.