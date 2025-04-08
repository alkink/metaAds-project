# Frontend Guidelines Document

1. **Framework**: React.js (along with Next.js) will be used.

2. **State Management**: Zustand library will be preferred for global state management. useState and useReducer can be used for simple component states.

3. **Styling**: Tailwind CSS will be used. The base color palette (primary colors: blue, purple shades; neutral colors: gray shades), typography (readable sans-serif font), and spacing (Tailwind's default scale) will be defined in tailwind.config.js at the beginning of the project. Dark mode support (if applicable) should be specified.

4. **Component Library**: Custom, reusable components for basic UI elements (Button, Input, Chat Bubble, Card, etc.) will be created in a components folder defined at the beginning of the project. Libraries like Radix UI (headless) or Shadcn/ui can be used as a foundation.

5. **API Communication**: axios library will be used. A central API client module will be created for requests, handling base URL, headers, and error management. Loading and error states should be shown in the UI for all API calls.

6. **Code Structure**: A feature-based folder structure will be adopted. E.g., src/features/chat, src/features/auth, src/components, src/hooks, src/lib, src/store.

7. **Linting & Formatting**: ESLint (with recommended React rules) and Prettier will be used and enforced with pre-commit hooks (Husky + lint-staged).

8. **TypeScript**: The project will be written in TypeScript throughout. The any type should be avoided as much as possible. Interfaces should be defined for API responses.

9. **Performance**:
   - React.memo, useCallback, useMemo should be used carefully to avoid unnecessary re-renders.
   - Code splitting (automatically managed by Next.js) and lazy loading (when needed) should be applied.
   - Image optimization (using Next/Image).

10. **Testing**: Unit/integration tests should be written for critical components and hooks using React Testing Library and Jest. 