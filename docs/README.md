# Gbese - Peer-to-Peer Credit Transfer System

![Cover Image](/src/assets/images/dashboard-image.png)

## Overview

Gbese is a peer-to-peer credit transfer platform that enables secure, consent-based debt transfers between verified users. Built to disrupt conventional debt systems, it reduces friction in debt restructuring while maintaining transparency, auditability, and compliance-ready transaction tracking.

## Key Features

- **Peer-to-Peer Debt Transfer**: Direct debt transfer between verified users
- **Consent-Based Transactions**: All transfers require explicit consent from all parties
- **User Verification**: Identity verification for platform integrity
- **Transparent Operations**: Full visibility into transaction history and debt status

## How It Works

1. Users register and complete verification
2. Users initiate debt transfer requests
4. All parties approve the transfer
5. Transaction is executed and recorded
6. Parties receive confirmation and can track status


## Tech Stack

### Frontend
- **React** - UI framework
- **Redux** - State management
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **TanStack Query** - Data fetching and caching

### Backend
- **TypeScript**
- **Express**
- **MySQL**
- **Prisma**


## Installation

```bash
# Clone the repository
git clone https://github.com/Susu-spec/gbese.git

# Navigate to project directory
cd gbese

# Install dependencies
npm install

# Set up environment variables
cp .env

# Start development server
npm run dev
```


## Testing

### Test Structure

```
tests/
├── unit/
│   ├── components/     # Component unit tests
|   ├── features/       # Feature tests
│   ├── hooks/          # Custom hooks tests
│   └── utils/          # Utility function tests
├── setup/
│   ├── mocks/          
└── fixtures/
    ├── debts.ts
    ├── transactions.ts 
    └── users.ts 
```


---
