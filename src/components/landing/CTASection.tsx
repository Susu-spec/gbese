import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    const tiles = [
        { title: "Rack up XPs", description: "Earn XP for every smart move. Debt transfers, and helping others.", image: "/xp-tile.png", variant: "xp" },
        { title: "Spin to Win", description: "Use XP to spin the rewards wheel and unlock NFTs, perks, and fun surprises.", image: "/spin-the-wheel-tile.png", variant: "spin" },
        { title: "Badge Up", description: "Show off profile badges that highlight your cred and activity in the community.", image: "/badge-tile.png", variant: "badge" },
    ];

    return (
        <section
            id="cta"
            className="w-full bg-gbese-white py-20 px-0 md:py-20 md:px-10 lg:px-[180px] border-b border-primary-200"
        >
            <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-10 md:gap-14">
                <h2 className="font-sora font-semibold text-center text-primary-900 text-[1.75rem] leading-10 md:text-[3rem] md:leading-18 max-w-sm sm:max-w-xl md:max-w-4xl">
                    Your Gbese Adventure Starts Here.
                </h2>

                <p className="font-medium text-center text-lg leading-9 md:text-[1.5rem] md:leading-10.5 max-w-sm sm:max-w-xl md:max-w-4xl">
                    Earn XP. Trade debt. Spin wheels. Collect NFTs. It's debt; but make it fun.
                </p>

                <div className="w-full overflow-x-auto lg:overflow-x-visible">
                    <div className="flex gap-5 lg:gap-8 justify-start lg:justify-center items-stretch pl-5 pr-5 lg:px-0 pb-4 lg:pb-0">
                        {tiles.map((tile, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center rounded-[30px] shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer gap-2 ${tile.variant === 'xp' ? 'tile-xp' : tile.variant === 'spin' ? 'tile-spin' : 'tile-badge'}`}
                        >
                            <img
                                src={tile.image}
                                alt={tile.title}
                                className="w-32 sm:w-36 md:w-[150px] h-32 sm:h-36 md:h-[150px] object-contain"
                                draggable={false}
                            />

                            <h3 className="font-sora font-semibold text-center mt-4 text-xl leading-9 md:text-2xl md:leading-9 max-w-xs">
                                {tile.title}
                            </h3>

                            <p className="font-normal text-center text-gbese-black/80 text-lg leading-[1.688rem] max-w-[260px] sm:max-w-xs">
                                {tile.description}
                            </p>
                        </div>
                    ))}
                    </div>
                </div>

                <Link to="/sign-up">
                    <Button
                        size="lg"
                        className="bg-primary-900 hover:bg-primary-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-80"
                    >
                        Get in, Let's go
                    </Button>
                </Link>
            </div>
        </section>
    );
}
