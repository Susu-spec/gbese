# Demo Q&A - Frontend Project

## Project Overview Questions

### Q: What is this application about?
**A:** This is Gbese, a peer-to-peer debt management platform. Users can request debts from others, track their debts, make payments, apply for loans, and manage their financial health. The name "Gbese" means "debt" in Yoruba.

### Q: What was the timeline for this project?
**A:** [Mention your actual timeline - e.g., "We worked on this for X weeks as part of our frontend specialization project."]

### Q: How did you split the work among team members?
**A:** [Customize based on your team structure - e.g., "We divided features by domain - one person handled authentication and KYC, another handled debt management features, and we collaborated on state management and testing."]

---

## Tech Stack Questions

### Q: Why did you choose React with TypeScript?
**A:** TypeScript provides type safety which helps catch errors during development rather than runtime. It's especially important in a financial application where data accuracy is critical. React gives us a component-based architecture that's easy to maintain and scale.

### Q: Why Vite instead of Create React App?
**A:** Vite offers significantly faster build times and hot module replacement compared to CRA. The development experience is much smoother, and it's becoming the modern standard for React projects.

### Q: Can you explain your choice of Redux Toolkit?
**A:** Redux Toolkit simplifies Redux setup with less boilerplate. We use it for global state like authentication, user profile, and KYC status - data that needs to persist across different pages and sessions.

### Q: Why did you use TanStack Query (React Query)?
**A:** React Query handles server state separately from client state. It provides automatic caching, background refetching, and optimistic updates out of the box. This is perfect for our API calls where we fetch debts, transactions, and user data.

### Q: What's the purpose of TanStack Form?
**A:** TanStack Form provides type-safe form handling with excellent validation support. We integrated it with Zod schemas for runtime validation, ensuring all form data meets our business rules before submission.

---

## Architecture & Structure Questions

### Q: How did you organize your folder structure?
**A:** We use a feature-based structure. Each major feature (auth, KYC, debt-requests, etc.) has its own folder containing components, state slices, schemas, and types. Shared components live in `src/components/ui`. This makes the codebase scalable and easier to navigate.

### Q: Can you explain your routing structure?
**A:** We have three main route groups: public routes (landing, sign-in, sign-up), protected routes (dashboard and main features), and KYC routes. The `ProtectedRoute` component checks authentication status and redirects unauthenticated users to the landing page.

### Q: What's the difference between the KYC flow and authentication?
**A:** Authentication verifies who you are (email/password). KYC (Know Your Customer) verifies your identity with documents and personal information. In our app, you can be authenticated but not KYC-verified. Certain high-value transactions like large deposits or loan applications require KYC completion.

---

## State Management Questions

### Q: When do you use Redux vs React Query?
**A:** Redux stores client state that needs to persist - authentication tokens, user profile, KYC progress. React Query handles server state - fetching debts, transactions, and making API mutations. This separation keeps concerns clear.

### Q: Why do you persist some Redux slices but not others?
**A:** We persist auth, user, and KYC slices using `redux-remember` because users shouldn't have to re-authenticate or lose their KYC progress on page refresh. We don't persist `debtRequests` because that's server data that should be fresh-fetched.

### Q: How does your store reset work?
**A:** The `resetStore` function clears both Redux state and localStorage persistence. We use it on logout to ensure no user data remains in the browser. It dispatches a `RESET_STORE` action that the root reducer handles by returning `undefined`, which resets all slices to initial state.

---

## Validation & Forms Questions

### Q: Why use Zod for validation?
**A:** Zod provides runtime type validation with excellent TypeScript integration. We can define schemas once and use them for both type inference and runtime validation. The error messages are customizable and user-friendly.

### Q: Can you explain the debt payment validation logic?
**A:** The `payDebtSchema` validates that payment amount doesn't exceed either your account balance OR the remaining debt amount. This prevents overdrafts and overpayments. The schema is dynamic - it receives balance and debt as parameters.

### Q: How do KYC limits work in your deposit schema?
**A:** Non-KYC users can deposit up to ₦200,000, while KYC-verified users can deposit up to ₦1,000,000. The `depositAmountSchema` is a function that takes the KYC status and returns different validation rules. This enforces regulatory compliance.

### Q: What happens if validation fails?
**A:** TanStack Form catches validation errors and displays them inline next to the relevant field. The form won't submit until all validation passes. We also show toast notifications for API-level errors.

---

## Components & UI Questions

### Q: What UI library are you using?
**A:** We're using shadcn/ui components built on Radix UI primitives. They're accessible, customizable, and use Tailwind CSS for styling. We copy components into our codebase rather than importing from npm, giving us full control.

### Q: Can you explain the KycProtectedButton component?
**A:** It's a wrapper component that checks if the user is KYC-verified. If yes, it executes the action. If no, it shows a modal prompting them to complete KYC. This pattern prevents code duplication across features that require KYC.

### Q: How do you handle responsive design?
**A:** We use Tailwind's responsive utilities and a custom `useMobile` hook that detects screen size. The sidebar collapses to a sheet on mobile, and layouts adjust using Tailwind's breakpoint prefixes.

---

## Data Flow Questions

### Q: How do you handle the debt request flow?
**A:** When incoming debt requests are fetched, we use `mapRawIncomingDebtRequest` to transform the API response. This function handles edge cases like missing sender data, calculates the display amount (preferring remaining_balance over principal_amount), and formats dates.

### Q: What's your API error handling strategy?
**A:** We have a centralized `handleApiError` function that maps HTTP status codes to user-friendly messages. It checks for custom error messages from the API first, then falls back to generic messages. All errors trigger toast notifications via Sonner.

### Q: How do you format currency in the app?
**A:** We use the `formatCurrency` utility (assuming you have one) that handles Nigerian Naira formatting with proper thousand separators and the ₦ symbol. Numbers are parsed safely using `parseBalance` which returns 0 for invalid values instead of crashing.

---

## Testing Questions

### Q: What's your testing strategy?
**A:** We focus on business-critical logic rather than 100% coverage. Our tests cover validation schemas (preventing overdrafts, enforcing KYC limits), state management (Redux slices), business logic transformations, and critical components like authentication guards. We aim for 80-90% coverage.

### Q: Why Vitest instead of Jest?
**A:** Vitest is built for Vite and has the same configuration. It's faster, has better ESM support, and provides a cleaner API. The migration from Jest is minimal since it's mostly compatible.

### Q: Can you explain a specific test you wrote?
**A:** In `payDebtSchema.test.ts`, we test that users can't pay more than their account balance or more than the remaining debt. We create the schema with specific balance/debt values and validate different payment amounts. This ensures we never allow overdrafts or overpayments in production.

### Q: Why don't you test every component?
**A:** We follow a pragmatic approach. Testing UI components that just render static content adds little value. We focus on components with logic - like `KycProtectedButton` which conditionally shows modals, or `ProtectedRoute` which handles redirects based on auth state.

---

## API & Integration Questions

### Q: How do you handle authentication tokens?
**A:** Access and refresh tokens are stored in Redux state. The Redux state is persisted to localStorage via `redux-remember`. Our axios interceptor adds the access token to every request header. When the token expires, we handle refresh token logic (or redirect to login if refresh also fails).

### Q: Do you use real API endpoints?
**A:** [Customize: "Yes, we integrated with our backend team's API" OR "We use MSW (Mock Service Worker) for development and testing to simulate API responses"]

### Q: How do you handle loading states?
**A:** React Query provides `isLoading`, `isFetching`, and `isError` states automatically. We show skeleton loaders during initial loads and spinners for mutations. The UI remains interactive during background refetches.

---

## Performance Questions

### Q: How do you optimize re-renders?
**A:** We use React Query's caching to avoid unnecessary API calls. Redux slices are normalized to prevent deep object updates. Components are split by feature to limit render scope. We avoid inline function definitions in render when they're passed as props.

### Q: Do you use code splitting?
**A:** [If implemented: "Yes, we use React.lazy and Suspense for route-based code splitting" OR "Not yet implemented, but it's on our roadmap for the production build"]

### Q: How do you handle large lists?
**A:** [Customize based on implementation: "We implement pagination on debt lists" OR "We use virtualization for long transaction histories" OR "Currently lists are small enough not to need optimization"]

---

## Security Questions

### Q: How do you prevent unauthorized access?
**A:** The `ProtectedRoute` component wraps all authenticated pages and checks for a valid user in Redux state. If no user exists, it redirects to the landing page. On the server side, all API requests require valid JWT tokens.

### Q: How do you handle sensitive data in the frontend?
**A:** We never store passwords in state or localStorage. Only tokens and non-sensitive user data are persisted. Credit card details (if implemented) are handled via secure payment gateways and never stored locally.

### Q: What about XSS protection?
**A:** React escapes all rendered values by default, preventing XSS attacks. We avoid using `dangerouslySetInnerHTML`. User inputs are validated both client-side (Zod schemas) and server-side.

---

## Styling & Design Questions

### Q: Why Tailwind CSS?
**A:** Tailwind provides utility classes that make styling fast and consistent. It eliminates context switching between JS and CSS files. The design system is easy to customize via the config file, and unused styles are purged in production.

### Q: How do you maintain design consistency?
**A:** We defined a color palette, typography scale, and spacing system in `tailwind.config.js`. All components use these design tokens. shadcn/ui components follow consistent patterns, and we have reusable UI primitives in `components/ui`.

### Q: Do you support dark mode?
**A:** [Customize: "Yes, using Tailwind's dark mode with class strategy" OR "Not currently implemented"]

---

## Challenges & Learning Questions

### Q: What was the biggest challenge you faced?
**A:** [Customize based on your experience - e.g., "Implementing the dynamic validation schemas that depend on runtime values like account balance" OR "Coordinating state between Redux and React Query" OR "Setting up proper TypeScript types for all our API responses"]

### Q: What would you do differently if you started over?
**A:** [Be honest but constructive - e.g., "We'd plan the state management architecture earlier" OR "We'd set up error boundaries from the start" OR "We'd implement E2E tests alongside unit tests"]

### Q: What did you learn from this project?
**A:** [Personal reflection - e.g., "How to architect large-scale frontend applications" OR "The importance of type safety in financial applications" OR "How proper testing saves debugging time"]

---

## Future Improvements Questions

### Q: What features would you add next?
**A:** [Some suggestions: "Push notifications for debt reminders" OR "Analytics dashboard with charts" OR "Social features like splitting bills" OR "Recurring debt requests"]

### Q: How would you scale this application?
**A:** We'd implement proper code splitting, add E2E testing with Playwright, set up monitoring with tools like Sentry, optimize images with next-gen formats, and possibly migrate to Next.js for SSR if SEO becomes important.

### Q: What about accessibility?
**A:** We use Radix UI components which have ARIA attributes built in. We ensure proper semantic HTML, keyboard navigation works, and screen reader support. Further improvements would include focus management and skip links.

---

## Deployment & DevOps Questions

### Q: How is the app deployed?
**A:** [Customize: "Deployed on Vercel with automatic deployments from the main branch" OR "Deployed on Netlify" OR "Using GitHub Pages" OR "Not yet deployed"]

### Q: What's your Git workflow?
**A:** We use feature branches for development. Each feature is developed on its own branch (like `feat/debt-requests`), tested, then merged into `dev`. After QA on `dev`, we merge to `main` for production.

### Q: How do you handle environment variables?
**A:** We use `.env` files (gitignored) for local development and set environment variables in our deployment platform. API URLs, feature flags, and other config values are stored as environment variables, not hardcoded.

---

## Best Practices Questions

### Q: How do you ensure code quality?
**A:** We use ESLint for linting, TypeScript for type checking, Prettier for formatting (if configured), and have a test suite with 80%+ coverage. Code reviews happen before merging feature branches.

### Q: What's your component naming convention?
**A:** We use PascalCase for components, camelCase for functions and variables, and SCREAMING_SNAKE_CASE for constants. Files match their default export name. We prefix utility functions with their purpose (e.g., `formatDate`, `parseBalance`).

### Q: How do you document your code?
**A:** Critical business logic has inline comments explaining the "why" not the "what". Complex validation schemas document the business rules they enforce. The README explains setup and architecture. We maintain this DEMO_QA.md for knowledge transfer.

---

## Quick Technical Terms (If Asked)

- **Redux Slice**: A piece of Redux state with its reducers and actions
- **Mutation**: An API call that modifies data (POST, PUT, DELETE)
- **Query**: An API call that fetches data (GET)
- **Suspense**: React feature for handling async loading states
- **HOC**: Higher-Order Component (wraps other components with logic)
- **Reducer**: Function that takes current state and action, returns new state
- **Middleware**: Code that intercepts actions before they reach reducers
- **Hydration**: Restoring state from localStorage on app load
- **Optimistic Update**: Updating UI before server confirms the change

---

## Tips for the Demo

1. **Start with the user flow**: Show sign-up → KYC → debt request → payment flow
2. **Highlight business logic**: Show how KYC gates certain features
3. **Show the code when asked**: Have key files ready (validation schemas, Redux store)
4. **Mention testing**: Demonstrate 1-2 tests to show quality focus
5. **Be honest**: If something isn't implemented, say "That's on our roadmap"
6. **Focus on decisions**: Explain *why* you chose certain approaches
7. **Keep it high-level**: Don't dive into implementation unless asked
8. **Show the architecture diagram**: If you still have the Mermaid diagram, reference it

## Common Follow-up Questions

If they ask deeper questions about:
- **"How exactly does Redux middleware work?"** → "It's a pipeline that actions pass through before reaching reducers, allowing us to intercept for logging, async operations, etc."
- **"What's the exact caching strategy in React Query?"** → "It caches by query key with configurable stale times and uses background refetching to keep data fresh"
- **"How do you handle race conditions?"** → "React Query handles it automatically by canceling outdated requests, and our mutations are tracked by state"

Good luck with your demo! 🚀
