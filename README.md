# Crypt

## Frontend
In the frontend we have simple table that fetchs data from the `/api/last` endpoint (we can also use the integerated database to achieve this same functionality)

1. On the current data fecthing from `/api/last` -> time-based revalidation which means automatically revalidate data after a certain amount of time has passed.
2. On db implementation -> utilizng websocket, integrate a websocket that "listens" to db mutations (in the github action sending "ping" request to the websocket to revalidate data on all clients). 


## Backend
Two api routes:
- `/api/crypto` -> this endpoint will be triggered every 10 min using github actions and save the updated crypto data to the MySQL database,
- `/api/last` -> this endpoint get returns the most updated crypto rates

## Deployment
- Deployed on vercel `https://crypt-razlevio.vercel.app/` and github `https://github.com/razlevio/crypt`
- TO UPDATE
