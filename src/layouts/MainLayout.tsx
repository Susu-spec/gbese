import { Outlet } from "react-router"

export default function MainLayout() {
    return (
        <>
            <header></header>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </>
    )
}