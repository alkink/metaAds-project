# Tech Stack Document

This document outlines the estimated technology stack based on the video and general web technology trends:

## Frontend:

### Framework/Library: 
- **React.js** or **Vue.js** (Suitable for dynamic, component-based chat interface). The vercel.app extension in the video suggests deployment of a framework like React (Next.js) or Vue (Nuxt.js) on Vercel.

### State Management: 
- **Zustand** or **Redux Toolkit** (if React) / **Pinia** (if Vue) (For managing chat state, user inputs, and AI responses).

### Styling: 
- **Tailwind CSS** or **Material UI (MUI)** / **Chakra UI** (For rapid and consistent UI development. The appearance in the video resembles custom CSS or a utility-first approach like Tailwind).

### API Communication: 
- **Axios** or **Fetch API** (For communication with the backend).

## Backend:

### Framework: 
- **Node.js** (Express.js or NestJS) OR **Python** (Flask or FastAPI). (JavaScript frontend pairs well with Node.js, while Python is rich in AI/ML libraries).

### API Type: 
- **RESTful API** or **GraphQL** (To provide the data needed by the frontend).

## Database:

### Primary DB: 
- **PostgreSQL** or **MongoDB** (For user information, industry list, possibly past queries. PostgreSQL for relational structure, MongoDB for flexibility).

### Vector DB (Potential): 
- **Pinecone**, **Weaviate**, or **ChromaDB** (If the AI model uses vector embeddings for industry/interest matching).

## Artificial Intelligence (AI):

### Model/API: 
- **Mistral AI API** (using models like Mistral-7B or Mixtral). (An LLM API is used for generating relevant Meta Ads format-compatible interest suggestions based on industry and age information).

### Prompt Engineering: 
- Backend-side logic for creating structured prompts that the LLM will understand and use to generate output in the desired format.

## Infrastructure & Deployment:

### Hosting: 
- **Vercel** (For frontend, URL hint in the video), **AWS** (EC2, Lambda, Fargate), **Google Cloud** (Cloud Run, App Engine), or **Azure** (App Service).

### Containerization (Optional): 
- **Docker** (To package application dependencies and provide consistent environments).

### Web Server (If self-hosted): 
- **Nginx** or **Apache** (Reverse proxy for backend API and static file serving). 