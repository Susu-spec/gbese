import { Outlet } from "react-router";
import KycSidebar from "./KycSidebar";
import { Separator } from "@/components/ui/separator";
import KycProgressBar from "./KycProgressBar";

export default function KycLayout() {
    return (
        <div className="flex min-h-screen">
            <KycSidebar />
            <main className="flex-1 bg-primary-250 min-h-screen transition-all flex flex-col w-full">
                <Separator className="1200:mt-20"/>
                <div className="px-6 w-full md:max-w-180 md:mx-auto 1200:hidden">
                    <KycProgressBar />
                </div>
                <div className="px-6 md:mx-auto md:max-w-180 py-4.5 md:py-10 1200:mx-[40%]! w-full transition-all">
                    <div className="bg-inherit md:bg-gbese-white md:py-10 md:px-15 md:rounded-4xl md:shadow-[0px_4px_10px_3px_#02134614]">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}