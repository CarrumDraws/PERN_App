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

-- File Structure --
1. Combine FRONT and BACK files into one directory
2. Take out all contents of backend folder into root directory.

-- New Dependancies --
1. Download Heroku CLI

-- Configure Server --
    package.json
        1. "scripts": {"heroku-postbuild": "cd client && npm install && npm run build"}
            (Generates Build File)
        2. "engines": { "node": "14.17.3", "npm": "6.14.13" }
    index.js
        1. process.env.PORT : Use Heroku's PORT envVar.
        2. process.env.NODE_ENV : returns if app is in production or not.
        3. Serve static 'build' files with app.use(express.static(path.join(__dirname, "client/build"))); 
            (Runs 'client' on localhost:5000)
        4. Add .env and /node_modules to gitignore. Delete .env and /node_modules from github.
    db.js 
        1. Reconfigure 'pool' to use process.env.DATABASE_URL
    .gitignore
        1. Add /node_modules and .env

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
    - process.env : Global Variable representing the system emvironment your app on start.
        Also contains .env file data.
    - __dirname : Local variable that returns directory name of current module/folder path 
        of current JS file
    - Why doesn't build exist by default?

-- Configure Client --
All AJAX calls (to localhost:5000) in client are invalid if server is in production mode.
To solve this, use a proxy! When sending app to production, proxy is ignored, 
and our routes will route to the heroku domain.
    package.json
        1. "proxy": "http://localhost:5000/"
    Register/App/Login/Dashboard/EditTodo/InputTodo/ListTodos
        1. 'http://localhost:5000/auth/login' > '/auth/login'
    Reset Cache so client calls target 5000
        Delete client's package-lock and node_modules,
        reinstall all dependancies with 'npm install', restart VSCode.
        If this doesn't work, run 'nodemon index --ignore client' in package.json
    Delete devDependancies/reinstall as Dependancies

-- Questions --
    - Whats a proxy : It's a default URL that is set in package.json. It is ignored in production.

-- Deploying to Heroku [Done in Gitbash] --
    Prepare for Heroku
        1. Login to Heroku: 'heroku login' 
        2. Create Heroku App: 'heroku create projName' (perntodoauth is our appname)
        3. Install heroku buildpacks with 'heroku buildpacks:set heroku/nodejs'
        4. Add envVars in .env file as configVars in Heroku

    Heroku-Postgres
        1. Install Heroku-Postgres under Hobby Plan: 
            'heroku addons:create heroku-postgresql:hobby-dev -a projName'
        2. Connect with Heroku Postgres(Enable psql commands) : 'heroku pg:psql -a projName'
        3. Create tables. Don't create a new DB, it's already made.

-- Pushing to Heroku --
    1. Set git remote repo to heroku: 'heroku git:remote -a perntodoauth'
    2. Push to Github : .git folder should be inside root directory.
        Inside Bash Terminal, reveal hidden folders with command 'ls -a'
        if .git isnt there, run 'git init'
    3. git add . > git commit -m "Final" > (Optional) git push
    4. 'git push heroku master' / 'git push heroku main'

Done! 'heroku open' to open your website!
