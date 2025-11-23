import GbeseLogo from "@/assets/images/gbese-logo.svg"
import GbeseBrandImage from "@/assets/images/gbese-brand.png"

export default function Sidebar() {
    return (
        <aside 
            className="
                hidden md:max-w-1.5/5
                lg:max-w-2/5 min-h-screen
                bg-primary-900 px-11 py-9.5
                lg:flex flex-col
            "
        >
            <div className="flex flex-col justify-between h-full">
                <div>
                    <img src={GbeseLogo} alt="Gbese" className="h-auto w-26.5" />
                </div>

                <div>
                    <img src={GbeseBrandImage} alt="Mock screen of activity dashboard" />
                </div>

                <div className="text-center flex flex-col gap-4.75 text-gbese-white">
                    <h1 className="text-[2rem] font-sora font-semibold leading-10.5">
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