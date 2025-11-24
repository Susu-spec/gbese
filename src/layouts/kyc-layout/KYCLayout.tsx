import { Outlet } from "react-router";

export default function KYCLayout() {
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