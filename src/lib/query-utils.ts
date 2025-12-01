import type { QueryClient } from "@tanstack/react-query";

/**
 * Core queries that almost always need refresh after financial mutations
 */
const CORE_FINANCIAL_QUERIES = [
  ["account", "balance"],
  ["userProfile"],
  ["userTransactions"],
];

/**
 * Invalidates queries after accepting a debt request
 * Affects: incoming requests, active debts, balance
 */
export async function invalidateAfterAcceptDebt(queryClient: QueryClient) {
  await new Promise(resolve => setTimeout(resolve, 100));
  await Promise.all([
    ...CORE_FINANCIAL_QUERIES.map(key => queryClient.invalidateQueries({ queryKey: key })),
    queryClient.invalidateQueries({ queryKey: ["debtRequests", "incoming"] }),
    queryClient.invalidateQueries({ queryKey: ["debtRequests"] }),
    queryClient.invalidateQueries({ queryKey: ["activeDebts"] }),
  ]);
}

/**
 * Invalidates queries after declining a debt request
 * Affects: only incoming requests (no balance/debt change)
 */
export async function invalidateAfterDeclineDebt(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["debtRequests", "incoming"] }),
    queryClient.invalidateQueries({ queryKey: ["debtRequests"] }),
  ]);
}

/**
 * Invalidates queries after transferring a debt
 * Affects: active debts, transferred debts, match list, balance
 */
export async function invalidateAfterTransferDebt(queryClient: QueryClient) {
  await new Promise(resolve => setTimeout(resolve, 100));
  await Promise.all([
    ...CORE_FINANCIAL_QUERIES.map(key => queryClient.invalidateQueries({ queryKey: key })),
    queryClient.invalidateQueries({ queryKey: ["activeDebts"] }),
    queryClient.invalidateQueries({ queryKey: ["transferredDebts"] }),
    queryClient.invalidateQueries({ queryKey: ["debtMatch"] }),
  ]);
}

/**
 * Invalidates queries after applying for credit
 * Affects: active debts, balance, credit providers
 */
export async function invalidateAfterCreditApplication(queryClient: QueryClient) {
  await new Promise(resolve => setTimeout(resolve, 100));
  await Promise.all([
    ...CORE_FINANCIAL_QUERIES.map(key => queryClient.invalidateQueries({ queryKey: key })),
    queryClient.invalidateQueries({ queryKey: ["activeDebts"] }),
    queryClient.invalidateQueries({ queryKey: ["credit-providers"] }),
  ]);
}

/**
 * Invalidates queries after making a debt payment
 * Affects: active debts, balance, transactions
 */
export async function invalidateAfterPayment(queryClient: QueryClient) {
  await new Promise(resolve => setTimeout(resolve, 100));
  await Promise.all([
    ...CORE_FINANCIAL_QUERIES.map(key => queryClient.invalidateQueries({ queryKey: key })),
    queryClient.invalidateQueries({ queryKey: ["activeDebts"] }),
  ]);
}
