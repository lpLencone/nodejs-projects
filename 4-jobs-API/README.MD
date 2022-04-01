#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"express-async-errors": "^3.1.1",
"express-rate-limit": "^5.3.0",
"helmet": "^4.6.0",
"http-status-codes": "^2.1.4",
"joi": "^17.4.0",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.13.2",
"rate-limiter": "^0.2.0",
"swagger-ui-express": "^4.1.6",
"xss-clean": "^0.1.1",
"yamljs": "^0.3.0"
