# Base Image with Ver.15 tag
# What about postgres?
FROM node:15

# Sets the Working Directory to '/app' > Creates Folder in Container > Navigates to it
WORKDIR /app

# Copy Everything in Project into a Container Folder '/app'
COPY ./ ./

# Start Server : Run these commands when container is created
CMD [ "node", "index.js" ]

# Build in Terminal: Navigate to Project File
# NOTE: error with 'bcrypt' library when building...
# ... instead, use 'bcryptjs' library.
# run 'docker build . --tag myserver' (--tag used for naming)
# After, run 'docker run myserver'
# 'Containers are isolated and not open to the public, we must expose a port.'

# 'docker run -p 5000:5000 -d myserver'
# [Exposed Port] : [Internal Port]

# Seperate terminal 'curl localhost:5000' to make a GET('/') request

# What's curl?