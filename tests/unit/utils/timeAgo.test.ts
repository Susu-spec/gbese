import { describe, it, expect } from 'vitest';
import { timeAgo } from '@/lib/utils';

describe('timeAgo', () => {
  // Mock Date.now() for consistent testing
  const mockNow = new Date('2024-12-02T12:00:00Z');

  beforeEach(() => {
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for very recent times', () => {
    const fiveSecondsAgo = new Date('2024-12-02T11:59:55Z').toISOString();
    expect(timeAgo(fiveSecondsAgo)).toBe('just now');
  });

  it('returns seconds for times under 1 minute', () => {
    const thirtySecondsAgo = new Date('2024-12-02T11:59:30Z').toISOString();
    expect(timeAgo(thirtySecondsAgo)).toBe('30s ago');
  });

  it('returns minutes for times under 1 hour', () => {
    const fifteenMinutesAgo = new Date('2024-12-02T11:45:00Z').toISOString();
    expect(timeAgo(fifteenMinutesAgo)).toBe('15m ago');
  });

  it('returns hours for times under 24 hours', () => {
    const fiveHoursAgo = new Date('2024-12-02T07:00:00Z').toISOString();
    expect(timeAgo(fiveHoursAgo)).toBe('5h ago');
  });

  it('returns days for times under 1 week', () => {
    const threeDaysAgo = new Date('2024-11-29T12:00:00Z').toISOString();
    expect(timeAgo(threeDaysAgo)).toBe('3d ago');
  });
});
