# Run the project
```
// Go to the root directory
npm install
cd client
npm install
cd ../server
npm install
cd ..
npm run dev # This will run both frontend & backend at the same time

// Go to http://localhost:3000 to verify the result
```

# Environment Variables
## 1. Client Environment
  Created `.env` file in /client directory
  ```
  VITE_SERVER_BASE_URL=http://localhost:8000
  ```
## 2. Server Environment
  Created `.env` file in /server directory
  ```
  // Replace these variables with your local PostgreSQL credentials and your own JWT secret key
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=password
  POSTGRES_DB=glass

  TOKEN_SECRET=codychrist
  ```
## 3. DB Migration
    ```
    CREATE TABLE public.merchants (
        id integer NOT NULL,
        store_name character varying(255),
        store_url character varying(255),
        shopify_access_token character varying(255)
    );

    CREATE TABLE public.users (
        id integer NOT NULL,
        name character varying(255),
        email character varying(255),
        password character varying(255),
        merchant_id integer
    );

    ALTER TABLE ONLY public.merchants
        ADD CONSTRAINT merchants_pkey PRIMARY KEY (id);

    ALTER TABLE ONLY public.users
        ADD CONSTRAINT users_pkey PRIMARY KEY (id);

    ALTER TABLE ONLY public.users
        ADD CONSTRAINT users_merchant_id_fkey FOREIGN KEY (merchant_id) REFERENCES public.merchants(id);
    ```

# APIs
## 1. /api/login
    // Request
    curl --location 'http://localhost:8000/api/login' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmVAY3liZXJzcGVlZHdheS5uZXQiLCJtZXJjaGFudF9pZCI6MSwiaWF0IjoxNzEyMTI2MDE2LCJleHAiOjE3MTIxMjk2MTZ9.vyuxrDNdlKQru_Y4cb1fA7ErZqAegqqEwalciKLQA6w' \
    --data-raw '{
        "email": "ane@cyberspeedway.net",
        "password": "123456"
    }'

    // Response
    { token: <string> }
## 2. /api/search?keyword={string}
    // Request
    curl --location --request GET 'http://localhost:8000/api/search?keyword=Low%20Top' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmVAY3liZXJzcGVlZHdheS5uZXQiLCJtZXJjaGFudF9pZCI6MSwiaWF0IjoxNzEyMTI2MDE2LCJleHAiOjE3MTIxMjk2MTZ9.vyuxrDNdlKQru_Y4cb1fA7ErZqAegqqEwalciKLQA6w' \
    --data-raw '{
        "email": "ane@cyberspeedway.net",
        "password": "123456"
    }'

    // Response
    { [ shopify_orders ] }

# Screenshots
## Login Page
![Login Page](./screenshots/login.png)

## Orders Page
![Orders Page](./screenshots/orders.png)

## Database
![Databasee](./screenshots/database.png)