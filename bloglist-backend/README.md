# Full Stack Open - Blog List Backend

Learning features of Express, MongoDB, and testing.

## Structuring a Backend Project
- Storing application code in `/src`
  - Mongoose schemas, constraints, and `toJSON` transformations in `/models`
  - Custom `Router`s in `/controllers`
  - Mock HTTP requests in `/requests`
  - Tests and test helpers in `/tests`
  - Various utility functions and middleware in `/utils`
  - In `app.js`, instantiating Express, connecting to MongoDB, using middleware, and assigning custom routers to paths
- Configuring `.env` to store secrets
- Setting `NODE_ENV` so we can later use `process.env` to check which we are in (dev, test, prod)
- Using `nodemon` to facilitate dev by auto-restarting the Node app

## Express
- Routing
  - Creating routes for CRUD operations
  - Extracting parameters out of parameterized URLs, using `request.params.id`
  - Sending HTTP responses back to the client using `status()`, `json()`, and `send()`
- Using middleware
  - Enabling CORS middleware to allow the frontend to access the backend's API
  - Enabling JSON middleware to parse JSON payloads
  - Using `morgan` middleware to log details of requests
  - Extracting JSON web tokens out of requests, and decoding them
  - Creating custom error messages, and only using these middleware after all others

## MongoDB and Mongoose
- Learning how a document database stores documents inside collections
- Creating schema using the Mongoose object data modeling (ODM) library
  - Using `ref` inside a field, so it can be `populate`d later using a JOIN-like aggregation operator to reference documents in other collections
  - Applying field constraints such as data type and minimum length
- Using Mongoose functions such as `find()`, `findById()` and `save()`
  - Learning the filtering syntax `{...}` passed as an argument
- Customizing the behavior of `toJSON()`, e.g. to rename `_id` to `id`

## Authentication
- Using `bcrypt` to salt and hash passwords before storing them in the database
- Creating and signing (encrypting) JSON web tokens with an expiration period

## Testing
- Wrapping an Express instance in `supertest`
- Writing various test helpers to reduce duplication
- Making API calls and writing assertions to determine:
  - Length of returned object
  - If response contains certain text content or values
  - If the response has specific fields
  - Status code of failed requests
  - Whether login is enforced when making requests that require authentication