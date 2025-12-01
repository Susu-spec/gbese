import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../setup/test-utils';
import { Button } from '@/components/ui/button';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>);

        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('handles click events', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>Click me</Button>);

        const button = screen.getByRole('button', { name: /click me/i });
        await user.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        render(<Button disabled>Disabled Button</Button>);

        const button = screen.getByRole('button', { name: /disabled button/i });
        expect(button).toBeDisabled();
    });

    it('applies variant styles', () => {
        const { rerender } = render(<Button variant="default">Default</Button>);

        let button = screen.getByRole('button');
        expect(button).toHaveClass('bg-primary');

        rerender(<Button variant="destructive">Destructive</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('bg-destructive');
    });

    it('applies size styles', () => {
        const { rerender } = render(<Button size="default">Default Size</Button>);

        let button = screen.getByRole('button');
        expect(button).toHaveClass('h-9');

        rerender(<Button size="sm">Small</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('h-8');
    });

    it('renders as child component when asChild is true', () => {
        render(
            <Button asChild>
                <a href="/test">Link Button</a>
            </Button>
        );

        const link = screen.getByRole('link', { name: /link button/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
    });
});
