import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, MemoryRouter } from 'react-router';
import authReducer from '../../src/features/auth/authSlice';
import userReducer from '../../src/features/main/dashboard/userSlice';

// Create a custom render function that includes all providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    preloadedState?: any;
    store?: any;
    route?: string;
    useMemoryRouter?: boolean;
}

function createTestStore(preloadedState?: any) {
    return configureStore({
        reducer: {
            auth: authReducer,
            user: userReducer,
        } as any,
        preloadedState,
    });
}

function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: 0,
            },
            mutations: {
                retry: false,
            },
        },
    });
}

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState,
        store = createTestStore(preloadedState),
        route = '/',
        useMemoryRouter = true,
        ...renderOptions
    }: CustomRenderOptions = {}
) {
    const queryClient = createTestQueryClient();

    function Wrapper({ children }: { children: ReactNode }) {
        const RouterComponent = useMemoryRouter ? MemoryRouter : BrowserRouter;
        const routerProps = useMemoryRouter ? { initialEntries: [route] } : {};

        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterComponent {...routerProps}>
                        {children}
                    </RouterComponent>
                </QueryClientProvider>
            </Provider>
        );
    }

    return {
        store,
        queryClient,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { renderWithProviders as render };
