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

-- Docker --

7. Create DockerFile
-- Nah screw this
