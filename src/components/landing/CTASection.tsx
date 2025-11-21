import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function CTASection() {
    const tiles = [
        {
            title: "Rack up XPs",
            description: "Earn XP for every smart move. Debt transfers, and helping others.",
            image: "/xp-tile.png",
            bgColor: "rgba(244, 242, 255, 1)",
            borderColor: "rgba(93, 46, 255, 1)",
            shadowColor: "rgba(135, 67, 226, 0.1)",
        },
        {
            title: "Spin to Win",
            description: "Use XP to spin the rewards wheel and unlock NFTs, perks, and fun surprises.",
            image: "/spin-the-wheel-tile.png",
            bgColor: "rgba(255, 250, 235, 1)",
            borderColor: "rgba(243, 167, 18, 1)",
            shadowColor: "rgba(250, 183, 121, 0.1)",
        },
        {
            title: "Badge Up",
            description: "Show off profile badges that highlight your cred and activity in the community.",
            image: "/badge-tile.png",
            bgColor: "rgba(255, 242, 234, 1)",
            borderColor: "rgba(255, 128, 0, 1)",
            shadowColor: "rgba(240, 25, 17, 0.1)",
        },
    ];

    return (
        <section
            id="cta"
            className="w-full bg-gbese-white py-20 px-5 md:py-20 md:px-[180px]"
            style={{
                borderBottom: "1px solid var(--color-primary-200)",
            }}
        >
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 md:gap-14">
                <h2 className="font-sora font-semibold text-center text-primary-900 text-[28px] leading-10 md:text-[48px] md:leading-[72px] max-w-[335px] md:max-w-[974px]">
                    Your Gbese Adventure Starts Here.
                </h2>

                <p className="font-poppins font-medium text-center text-gbese-black text-lg leading-9 md:text-[24px] md:leading-[42px] max-w-[335px] md:max-w-[974px]">
                    Earn XP. Trade debt. Spin wheels. Collect NFTs. It’s debt; but make it fun.
                </p>

                <div className="w-full overflow-x-auto md:overflow-x-visible">
                    <div className="flex gap-5 md:gap-8 justify-start md:justify-center items-stretch px-5 md:px-0 pb-4 md:pb-0">
                        {tiles.map((tile, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center rounded-[30px] shrink-0 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                            style={{
                                width: "305px",
                                height: "346px",
                                backgroundColor: tile.bgColor,
                                border: `0.5px solid ${tile.borderColor}`,
                                boxShadow: `0px 2px 2px 1px ${tile.shadowColor}`,
                                paddingTop: "20px",
                                paddingRight: "20px",
                                paddingBottom: "40px",
                                paddingLeft: "20px",
                                gap: "8px",
                            }}
                        >
                            <img
                                src={tile.image}
                                alt={tile.title}
                                className="w-[150px] h-[150px] object-contain"
                                draggable={false}
                            />

                            <h3 className="font-sora font-semibold text-center text-gbese-black mt-4 text-xl leading-9 md:text-2xl md:leading-9 max-w-[301px]">
                                {tile.title}
                            </h3>

                            <p className="font-poppins font-normal text-center text-gbese-black/80 text-lg leading-[27px] max-w-[279px]">
                                {tile.description}
                            </p>
                        </div>
                    ))}
                    </div>
                </div>

                <Link to="/sign-up">
                    <Button
                        className="bg-primary-900 hover:bg-primary-800 text-white font-poppins font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{
                            width: "304px",
                            height: "60px",
                            fontSize: "16px",
                            lineHeight: "27px",
                            paddingTop: "12px",
                            paddingRight: "24px",
                            paddingBottom: "12px",
                            paddingLeft: "24px",
                        }}
                    >
                        Get in, Let's go
                    </Button>
                </Link>
            </div>
        </section>
    );
}
