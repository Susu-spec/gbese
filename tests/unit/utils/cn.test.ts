import { describe, it, expect } from 'vitest';
import { cn } from '../../../src/lib/utils';

/**
 * Example utility function test
 * 
 * This demonstrates testing utility functions from @/lib/utils
 */

describe('cn utility function', () => {
    it('merges class names correctly', () => {
        const result = cn('class1', 'class2');
        expect(result).toContain('class1');
        expect(result).toContain('class2');
    });

    it('handles conditional classes', () => {
        const isActive = true;
        const result = cn('base', isActive && 'active');
        expect(result).toContain('base');
        expect(result).toContain('active');
    });

    it('handles false conditional classes', () => {
        const isActive = false;
        const result = cn('base', isActive && 'active');
        expect(result).toContain('base');
        expect(result).not.toContain('active');
    });

    it('merges Tailwind classes correctly', () => {
        const result = cn('px-2 py-1', 'px-4');
        // Should keep the last px value (px-4)
        expect(result).toContain('px-4');
        expect(result).toContain('py-1');
    });
});

/**
 * Add more utility function tests here
 * 
 * Examples:
 * - formatCurrency
 * - formatDate
 * - validatePhone
 * - etc.
 */
