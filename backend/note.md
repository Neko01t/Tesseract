## Pacakges installed in Python

1. fastapi

- The main framework.
- Lets you create API endpoints (/users, /login, /properties, etc.).
- Very fast and easy to use.

2. uvicorn[standard]

- The server that runs FastAPI.
- Executes your app when you run:

```sh
uvicorn app.main:app --reload
```

- [standard] adds useful extras like faster networking and web utilities.
  -- report if new Pacakges added in python --

### shift

shifter to flask

- added login and register
  to check login and register works use curl
  commands below
- Register

```sh
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' http://localhost:5000/register
```

you will see the output

```sh
{
  "message": "User registered successfully"
}
```

- Login

```sh
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' http://localhost:5000/login
```

you will see a unique `access-token`
every login secssion will have one access-token and every login creates new access-token
