# sakurasample
Scaffolding done with `@sakuraapi/cli`.

For more information on SakuraApi, visit https://github.com/sakuraapi/api

Need to intsalled the docker fot to start the application

To start the project through terminal the command "npm start"

Type in browser "localhost:8001/api"

npm install -g @sakuraapi/cli
sapi help
sapi init — it will create some of the files
initializes the project, it will create basic structure of project.


Below command for creating @Routable
--------------------------------------

sapi g routable src/api/SomeApi


Below command for creating @Model
-------------------------------------

sapi g model src/models/SomeModel


Below command for creating @Injectable(service)
--------------------------------------------------

sapi g service src/services/SomeService


give the database connections in 
----------------------------------

config->bootstrap-->db.ts
