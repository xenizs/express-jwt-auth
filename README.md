# express-jwt-auth

Template project for express js for authentication, authorization and session management with JWT.

## User model
```typescript
{
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  JWTSession: {refreshTokens: []}
}
```

## How the flow works

### Authentication data flow diagram
![Authentication data flow diagram](./docs/img/authentication-diagram.svg)

### Authorization data flow diagram
![Authentication data flow diagram](./docs/img/authorization-diagram.svg)

### Authorization middleware flowchart
![Authentication data flow diagram](./docs/img/authorization-middleware-diagram.svg)
