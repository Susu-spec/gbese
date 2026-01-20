# Gbese - Peer-to-Peer Credit Transfer System

![Cover Image](/src/assets/images/dashboard.png)

## Overview

Gbese is a peer-to-peer credit transfer platform that enables secure, consent-based debt transfers between verified users. The platform is designed to reduce friction in debt restructuring while maintaining **state consistency**, **transaction transparency**, and **audit-friendly tracking**.

From an engineering perspective, Gbese focuses on **predictable data flow**, **guarded state mutations**, and **clear separation between UI, domain logic, and asynchronous data operations**, making it suitable for fintech-style workflows where correctness is critical.

---

## Problem Statement

Traditional debt restructuring processes are often manual, opaque, and error-prone. In peer-to-peer scenarios, inconsistent state updates (for example, wallet balances not matching debt records) can lead to financial inaccuracies and loss of trust.

Gbese addresses this by enforcing:
- Explicit user consent at every transfer stage  
- Centralized state management for financial data  
- Validation checks before any transaction is executed  

---

## Key Features

- **Peer-to-Peer Debt Transfer**  
  Enables direct debt transfers between verified users with clear ownership and traceability.

- **Consent-Based Transactions**  
  All debt transfers require explicit approval from all involved parties before execution.

- **User Verification Flow**  
  Ensures platform integrity and prevents unauthorized participation.

- **Transparent Transaction History**  
  Users can view debt status, transfer history, and confirmation states at all times.

---

## System Design & Data Flow (Frontend)

Gbese uses a **predictable, system-oriented frontend architecture** to ensure financial correctness.

### State Management

- **Redux Toolkit** manages global financial state such as:
  - wallet balances  
  - outstanding debts  
  - transfer requests  
  - transaction status  

- State mutations are **guarded** to prevent:
  - negative balances  
  - duplicate transfers  
  - partial updates across related entities  

### Async Data Handling

- **TanStack Query** handles all server-state concerns:
  - fetching and syncing user data  
  - managing loading, success, and error states  
  - caching and retries  

This separation ensures UI state and server state remain consistent without race conditions.

---

## Debt Transfer Workflow

1. User initiates a debt transfer request  
2. Request is validated client-side before submission  
3. All involved parties review and approve the request  
4. Redux state updates occur only after successful confirmation  
5. Wallet balances, debt records, and transaction logs are synchronized  
6. Users receive confirmation and can track transfer status  

This flow was intentionally designed to prevent financial inconsistencies during concurrent operations.

---

## Tech Stack

### Frontend
- **React** — component-based UI development  
- **Redux Toolkit** — predictable global state management  
- **Tailwind CSS** — utility-first styling  
- **shadcn/ui** — accessible, reusable UI components  
- **TanStack Query** — server-state management and caching  

### Backend (Integration)
- **TypeScript**  
- **Express**  
- **MySQL**  
- **Prisma**  

*The frontend consumes backend services via REST APIs and focuses on validation, state flow, and correctness rather than backend ownership.*

---

## Testing Strategy

The project follows a structured testing approach to ensure reliability and correctness.

### Test Directory Structure

```text
tests/
├── unit/
│   ├── components/     # UI component tests
│   ├── features/       # Feature-level logic tests
│   ├── hooks/          # Custom hook tests
│   └── utils/          # Utility function tests
├── setup/
│   └── mocks/          # API and state mocks
└── fixtures/
    ├── debts.ts
    ├── transactions.ts
    └── users.ts
```


Tests focus on:
- component behavior  
- feature correctness  
- predictable state transitions  

---

## Engineering Tradeoffs & Lessons Learned

### 1. Centralized State vs Local State

**Tradeoff:**  
Global state management with Redux Toolkit was chosen over heavy reliance on component-level state.

**Lesson Learned:**  
Centralizing critical domain state makes complex flows easier to reason about and reduces the risk of subtle financial inconsistencies.

---

### 2. Client-Side Validation vs Server-Only Validation

**Tradeoff:**  
Strict client-side validation was implemented alongside server validation.

**Lesson Learned:**  
Client-side validation improves UX and prevents unnecessary requests, but must complement—not replace—server-side guarantees.

---

### 3. Redux vs Async State in Components

**Tradeoff:**  
Redux handles synchronous domain state, while TanStack Query manages async server state.

**Lesson Learned:**  
Separating these responsibilities simplifies caching, retries, and state predictability.

---

### 4. Optimistic Updates vs Confirmed State Updates

**Tradeoff:**  
Optimistic UI updates were avoided for debt transfers.

**Lesson Learned:**  
In correctness-critical systems, confirmed state updates are safer than optimistic patterns.

---

### 5. UI Abstraction vs System Clarity

**Tradeoff:**  
Early over-abstraction was avoided in favor of explicit flows.

**Lesson Learned:**  
Clear, readable logic is more valuable than premature abstractions in complex systems.

---

## Known Limitations

### 1. Limited Concurrency Handling

The current design assumes low-to-moderate concurrent interactions.

**Future Improvement:**  
Add server-side locking and idempotency for high-concurrency scenarios.

---

### 2. Simplified Error Recovery

Some failures rely on retries rather than resumable workflows.

**Future Improvement:**  
Implement resumable transfer states tied to backend transaction logs.

---

### 3. Basic Role & Permission Modeling

Role-based access control currently supports only core user flows.

**Future Improvement:**  
Adopt a more flexible policy-based permission system.

---

### 6. Test Coverage Scope

Testing focuses on unit and feature-level correctness rather than full end-to-end financial simulations.

**Future Improvement:**  
Add end-to-end tests covering complete multi-user transfer flows.

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Susu-spec/gbese.git

# Navigate to project directory
cd gbese

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
