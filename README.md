<p  align="center">
   <a  href="https://nextjs.org/"  target="blank"><img  src="https://camo.githubusercontent.com/9771a2d4a7366d3c6d4793e17104eba9e88f0aec82f7165bfe6871455c26cb2c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6461726b5f6261636b67726f756e642e706e67"  width="200"  alt="Nest Logo" /></a>
</p>

# Next.js Crypto Rates App

This application features a Next.js frontend designed to display the most recent cryptocurrency data, sourced from a Nest.js backend service. The frontend includes a straightforward table that retrieves cryptocurrency information via the `/last` endpoint from the Nest.js backend. Each time a user visits the app's root (/) page, a fetch request is sent to the backend to obtain and display the latest cryptocurrency rates.

Furthermore, the Next.js frontend maintains a live connection with the Nest.js backend through WebSocket protocol. It utilizes a real-time provider component that listens for messages emitted by the Nest.js backend. These messages are dispatched to all connected clients following every successful execution of a cron job, which updates the Redis database with the latest data. Upon receiving an update signal, the frontend listener triggers a revalidation process for the clients. This process initiates a partial page refresh, effectively retriggering the fetch request to the backend’s `/last` endpoint for the newest data.

## Features

- Live Cryptocurrency Rates UI: Display the latest cryptocurrency rates from a Nest.js backend.
- Real-time Updates: Utilize WebSocket for live updates of cryptocurrency rates without needing to refresh the page.

## Getting Started

### Installation

1. Clone the repository:
   `git clone git@github.com:razlevio/crypto-frontend.git`

2. Install dependencies:
   `npm install`

## Usage

The application exposes one root page that renders a table with the latest cryptocurrnies rates

- **`/`**: The root page path


### Development

- To start the application in development mode, use `npm run dev`.
- Ensure you have configured paths properly in `/components/realtime-provider.tsx` and `/app/(root)/(routes)/page.tsx` for your development and production environments, instructions resides in the code as comments.

## Deployment

- This application is container-ready. You can deploy it using Docker or to any cloud provider that supports Node.js applications, such as Vercel, Heroku, or AWS.
- This application is kuberenets-ready. You have `k8s` folder with the deployment yaml scripts. You can deploy it to any kuberenets cluster cloud provider like Google Cloud Kuberenets Engine.

## Important

**`Make sure to adjust paths, URLs, and any specific installation or configuration instruction instructions provided above and as comment in the code`**

## Useful Docker and Kuberenets CMD's

```bash
$  docker  build  -t  razlevio/crypto-frontend:latest  .
$  docker  run  -p  3000:3000  --env-file  .env  razlevio/crypto-frontend
$  docker  push  razlevio/crypto-frontend:latest
$  kubectl  apply  -f  k8s/crypto-frontend-deployment.yaml
$  kubectl  apply  -f  k8s/crypto-frontend-service.yaml
```
