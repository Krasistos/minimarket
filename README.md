Minimarket Project
Description
This project is a Minimarket Management System built using NestJS for the backend, React for the frontend, and Supabase for the PostgreSQL database and file storage (using Supabase's S3-compatible buckets).

The system manages products, inventory, orders, and logs. It uses Prisma to interact with the database and Swagger for API documentation.

Prerequisites
Before starting, ensure you have the following tools installed on your system:

Node.js (v14 or later)

npm or Yarn

Docker (optional for local database setup)

You will also need accounts and setups for:

Supabase: For the database and file storage (S3 buckets).

AWS SDK: For integrating file storage with your NestJS backend (using Supabase's S3-compatible storage).

Prisma: To manage database migrations and interactions.

Project Structure
Frontend: React-based UI (in the frontend/ folder).

Backend: NestJS API (in the root of the project).

Database: PostgreSQL (hosted on Supabase).

Setup Instructions
Step 1: Backend Setup
Clone this repository:

bash
Copy
Edit
git clone https://github.com/krasistos/minimarket.git
Navigate to the project folder:

bash
Copy
Edit
cd minimarket
Install the backend dependencies:

bash
Copy
Edit
npm install
Set up your .env file with the necessary configuration (e.g., Supabase credentials, Prisma connection details, etc.). You can find a sample .env file in the project or ask the project owner for one.

Step 2: Prisma Setup and Database Migrations
Make sure you have the Prisma CLI installed:

bash
Copy
Edit
npm install @prisma/cli --save-dev
Set up the Prisma schema in the prisma/schema.prisma file. You will need to configure the Supabase connection string in your .env file.

Example Prisma connection string (.env file):

env
Copy
Edit
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<dbname>?schema=public"
Replace <user>, <password>, <host>, <port>, and <dbname> with the appropriate credentials for your Supabase project.

Run Prisma's initial migration to create the database schema:

Generate Prisma Client (if you haven't already):

bash
Copy
Edit
npx prisma generate
Run the migrations:

bash
Copy
Edit
npx prisma migrate dev --name init
This will apply the migration to your Supabase database.

After migration, your database schema will be updated based on your prisma/schema.prisma file. You can inspect the schema and run additional migrations for future changes as needed.

Step 3: Frontend Setup
Navigate to the frontend/ directory:

bash
Copy
Edit
cd frontend
Install the frontend dependencies:

bash
Copy
Edit
npm install
To run the frontend in development mode, use:

bash
Copy
Edit
npm start
This will run the React app on port 3001 by default.

Step 4: Running Both Servers
To run both the frontend and backend on separate terminals:

Frontend Terminal:

bash
Copy
Edit
cd frontend
npm start
Backend Terminal:

bash
Copy
Edit
cd minimarket
npm run start:dev
Now, your React app should be running on http://localhost:3001, and the NestJS backend should be running on http://localhost:3000.

Features
Products Management: Add, update, delete, and list products with full details including quantity, price, and category.

Inventory and Orders: Track stock availability and record orders.

Logs: Keep track of sales and orders in the system.

Swagger Documentation: The API is fully documented with Swagger, available at http://localhost:3000/api.

Database
This project uses PostgreSQL hosted on Supabase:

Set up a Supabase account at https://supabase.com.

Create a new project and configure the database credentials in the .env file of the project.

Use Prisma to migrate and manage the database schema.

File Storage
This project uses Supabase S3-compatible storage for handling product images:

Set up an S3 bucket in your Supabase project for storing images.

Integrate the bucket with the backend by configuring the necessary environment variables for AWS SDK in the .env file.

Support
If you have any questions or need support, feel free to open an issue on the GitHub repository or contact me.

License
This project is licensed under the MIT License.
