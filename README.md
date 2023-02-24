# Login_page

To install and set up the web application on your local machine, follow these steps:

Clone the repository: Begin by cloning the repository to your local machine using Git.

Install the dependencies: Open a terminal in the project directory and run the following command to install the dependencies for the backend:

npm install
Next, navigate to the frontend directory by running the following command:

cd frontend
Then, run the following command to install the dependencies for the frontend:

npm install
Set up the database: Next, create a new MySQL database and table for the application. You can use any MySQL client to create the database and table.

Set up environment variables: Create a new .env file in the project directory and set the following environment variables:

makefile
DB_HOST=<database-host>
DB_USERNAME=<database-username>
DB_PASSWORD=<database-password>
DB_NAME=<database-name>
Replace <database-host>, <database-username>, <database-password>, and <database-name> with your MySQL database credentials.

Start the server: To start the backend server, run the following command in the project directory:
sql

npm start
This will start the server on port 5000. You should see a message indicating that the server is running.
