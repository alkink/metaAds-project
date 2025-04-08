# Backend Structure Document (Node.js/Express Example)

1. **Framework**: Express.js on Node.js will be used.

2. **API Design**: RESTful API principles will be adopted. Data exchange will be in JSON format. Basic endpoints:
   - `POST /api/v1/auth/login`
   - `POST /api/v1/auth/register`
   - `POST /api/v1/chat/start` (Perhaps initiates the first message)
   - `POST /api/v1/chat/message` (Receives user messages, returns AI response)
   - `GET /api/v1/sectors` (Returns the industry list)
   - `POST /api/v1/suggestions/more` (For "Suggest More")

3. **Directory Structure**:
```
/src
├── config/       # Environment variables, database config
├── controllers/  # Request handling logic (req, res)
├── dtos/         # Data Transfer Objects (Request/Response validation schemas - Zod/Joi)
├── middleware/   # Authentication, error handling, logging middleware
├── models/       # Database schemas/models (e.g., Prisma Schema, Mongoose Schemas)
├── routes/       # API endpoint definitions
├── services/     # Business logic, external API calls (AI, DB)
├── utils/        # Helper functions
├── app.js        # Express app initialization
└── server.js     # Server startup
```

4. **Authentication & Authorization**: JWT (JSON Web Tokens) will be used. After login, a token will be generated, and in subsequent requests, the token sent with the Authorization: Bearer <token> header will be verified (middleware/auth.js).

5. **Database Interaction**: Prisma ORM will be used (models/schema.prisma). Database operations will be performed through the service layer.

6. **AI Integration**: Services/aiService.js (or services/suggestionService.js) will handle communication with the AI API (e.g., OpenAI).
   - Prompts will be dynamically created with user inputs.
   - API keys will be stored securely in environment variables (config).
   - Responses from AI will be parsed and formatted according to DTOs and passed to the controller.
   - Rate limiting, timeout, and error handling (AI API errors) will be implemented.

7. **Error Handling**: A central error handling middleware (middleware/errorHandler.js) will be used. Errors will be logged, and meaningful (but not revealing) error messages will be returned to users. Standard HTTP status codes will be used.

8. **Validation**: Incoming request bodies, query parameters, etc. will be validated using schemas defined in dtos (e.g., Zod) (middleware/validator.js or in the controller).

9. **Logging**: A central logging mechanism will be established using a library like winston or pino. Important events (request start/end, errors, AI calls) will be logged.

10. **Environment Variables**: The dotenv library will be used, all configuration (DB connection string, API keys, JWT secret, port) will be managed through the .env file. An .env.example file will be kept in the repo.

11. **TypeScript**: The project will be written in TypeScript throughout. 