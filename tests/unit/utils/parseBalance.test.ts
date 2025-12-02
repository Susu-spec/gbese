import { describe, it, expect } from 'vitest';
import { parseBalance } from '@/lib/utils';

describe('parseBalance', () => {
  it('converts string balance to number', () => {
    expect(parseBalance('50000.00')).toBe(50000);
    expect(parseBalance('1000')).toBe(1000);
  });

  it('handles undefined by returning 0', () => {
    expect(parseBalance(undefined)).toBe(0);
  });

  it('handles null by returning 0', () => {
    expect(parseBalance(null)).toBe(0);
  });

  it('handles empty string by returning 0', () => {
    expect(parseBalance('')).toBe(0);
  });

  it('handles decimal values correctly', () => {
    expect(parseBalance('12345.67')).toBe(12345.67);
    expect(parseBalance('0.99')).toBe(0.99);
  });

  it('handles zero balance', () => {
    expect(parseBalance('0')).toBe(0);
    expect(parseBalance('0.00')).toBe(0);
  });

  it('handles large numbers', () => {
    expect(parseBalance('1000000.00')).toBe(1000000);
    expect(parseBalance('9999999.99')).toBe(9999999.99);
  });

  it('handles negative balances', () => {
    expect(parseBalance('-500.00')).toBe(-500);
  });

  it('handles invalid strings by returning 0', () => {
    expect(parseBalance('invalid')).toBe(0);
    expect(parseBalance('abc123')).toBe(0);
  });
});
