import GbeseLogo from "@/assets/images/gbese-logo.svg"
import GbeseBrandImage from "@/assets/images/gbese-brand.png"

export default function Sidebar() {
    return (
        <aside 
            className="hidden
            top-0 left-0 max-w-123.5 min-h-screen
            bg-primary-900 px-11 py-9.5
            md:flex flex-col"
        >
            <div className="w-full">
                <img src={GbeseLogo} alt="Gbese" className="h-auto w-26.5 "/>
            </div>
            <div className="flex flex-col gap-33.5 pt-52.5 h-full">
                <img src={GbeseBrandImage} alt="Mock screen of activity dashboard" />
                <div className="text-center flex flex-col gap-4.75 text-gbese-white">
                    <h1 
                        className="text-[2rem] font-sora font-semibold 
                         leading-10.5"
                    >
                        Shift Your Debt, Breathe Again.
                    </h1>
                    <p className="text-xl leading-9">
                        Join where credit no be wahala
                    </p>
                </div>
            </div>
        </aside>
    )
}