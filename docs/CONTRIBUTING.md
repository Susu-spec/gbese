# Contributing (Internal)

Quick guide for working on Gbese.


## Branching

- `main` -> Production / deploy-ready
- `dev` -> Base branch for all new work
- `feat/<desc>` -> New features
- `fix/<desc>` -> Bug or layout fixes
- `chore/<desc>` -> Cleanup, configs, or dependency additions
### Examples
```bash
feat/debt-transfer-flow
fix/login-responsive-layout
chore/update-tailwind
```


## Naming conventions
### Components, Hooks & Files
| Element | Convention | Example |
|----------|-------------|----------|
| **Components** | PascalCase | `UserCard.tsx`, `PaymentTabs.tsx` |
| **Hooks** | camelCase (start with `use`) | `useAuth.ts`, `useFormState.ts` |
| **Utility files** | camelCase | `formatCurrency.ts`, `fetchData.ts` |
| **Config/constants** | lowerCamelCase | `colorPalette.ts`, `routesConfig.ts` |
| **CSS/Module files** | kebab-case | `navbar.module.css` |

### Branches
Use lowercase and hyphens (`-`) for separators.


## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

| Type | Use for |
| :---- | :----------------------------- |
| `feat:` | New feature |
| `fix:` | Bug fix |
| `style:` | Layout or responsive fixes |
| `refactor:` | Code rework without logic change |
| `chore:` | Maintenance or dependencies |
| `docs:` | Documentation updates |
### Examples
```bash
<type>(<scope>): <short summary>

style(payments): fixes responsive layout for donation cards
feat(auth): adds password reset email
fix(api): handles expired tokens
```
#### Note:
We can omit scopes for small or general commits
```bash
style: adjusts navbar spacing
fix: prevents button double click
chore: updates dependencies
```


## Workflow

1. Branch off `dev`
2. Commit and push changes
3. Open a PR -> target `dev`
4. Keep PRs focused


## Folder Structure

```bash
src/
  features/      <- main feature folders
  pages/         <- route-level pages only
  components/    <- global shared UI components
  layouts/       <- layout wrappers (dashboard, kyc, auth)
  lib/           <- general utilities, helpers, configs
```
- If something belongs to a domain (business logic), it lives in `features/`.
- If something is shared by different features, it lives in a global folder.
- If it's a shared UI component, it lives in `@/components/shared/`

### Example
```bash
src/
  features/
    main/
      types.ts
      schemas/
      dashboard/
        components/
        hooks/
        slices/
          paymentsListSlice.ts
          paymentStatsSlice.ts
        data/
          mockPaymentsData.ts
  pages/
    main/
      dashboard/
        index.tsx
```
### Notes
- If there are multiple slices in a feature:
```bash
  src/features/payments/
    slices/
      paymentListSlice.ts
      paymentDetailSlice.ts
      paymentFiltersSlice.ts
```
They can be combined:
```bash
  export const store = configureStore({
    reducer: {
      payments: combineReducers({
        list: paymentListReducer,
        filters: paymentFiltersReducer,
      })
    }
  });
```


## Merge Rules

- No direct push to `main` or `dev` (always go through the PR)
- Merge with at least one approval


## Notes

- **UI:** Check responsiveness before opening PRs
- **Console:** Keep console clean; no warnings or errors. Remove all `console.log`, `console.warn`, `console.error`(they could slow down scripts, log important info or just generally flood the console)
- **Tailwind:** Use design tokens or Tailwind's predefined scale whenever possible
```bash
    mt-[12px]  # use  mt-3
    py-[14px]  # use py-3.5
    w-[73%]    # use  w-3/4  (or  md:w-[70%] if really necessary)
    h-[138px]  # use h-34.5
    text-[13px] # use text-sm
```
- **Static data:** Keep component-independent objects outside of components (Objects can trigger unnecessary re-renders in children). This applies to anything static that doesn't depend on props/state.
```bash
const dashboardTabs = [
  { key: "overview", label: "Overview" },
  { key: "payments", label: "Payments" },
];

export default function Dashboard() {
  return <Tabs items={dashboardTabs} />;
}
```
```
- **Always run a production build before pushing or opening a PR.**
    - Run `npm run build` to verify the project compiles successfully.
    - Builds catch issues that may not appear during `npm run dev`.
- **Issues:** Create issues to track bugs, planned improvements, or anything noticed that might need fixing later.


## Testing

All code changes should include appropriate tests.

### Running Tests

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Open Cypress for E2E tests
npm run cypress:open

# Run E2E tests headless
npm run cypress:run
```

### Test Requirements

- **New Features:** Must include unit tests and E2E tests for critical user flows
- **Bug Fixes:** Must include a test that would have caught the bug
- **Coverage:** Maintain minimum 80% code coverage
- **All Tests Pass:** Run `npm run test` before opening a PR

### Writing Tests

- **Unit Tests:** Place in `tests/unit/` following the folder structure
- **E2E Tests:** Place in `cypress/e2e/` organized by feature
- **Use Factories:** Import test data factories from `tests/fixtures/`
- **Follow Patterns:** See `tests/README.md` and `cypress/README.md` for examples

### Test Checklist

Before opening a PR:
- [ ] All existing tests pass
- [ ] New tests added for changes
- [ ] Coverage threshold met (80%)
- [ ] E2E tests pass for affected flows
