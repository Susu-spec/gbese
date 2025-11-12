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

style(payments): fix responsive layout for donation cards
feat(auth): add password reset email
fix(api): handle expired tokens
```
#### Note:
We can omit scopes for small or general commits
```bash
style: adjust navbar spacing
fix: prevent button double click
chore: update dependencies
```


## Workflow

1. Branch off `dev`
2. Commit and push changes
3. Open a PR -> target `dev`
4. Keep PRs focused


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
- **Always run a production build before pushing or opening a PR.**
    - Run `npm run build` to verify the project compiles successfully.
    - Builds catch issues that may not appear during `npm run dev`.
