import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <>
            <header>Sign in?</header>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </>
    )
}