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
            className="w-full bg-gbese-white"
            style={{
                paddingTop: "80px",
                paddingRight: "180px",
                paddingBottom: "80px",
                paddingLeft: "180px",
                borderBottom: "1px solid var(--color-primary-200)",
            }}
        >
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14">
                {/* Heading */}
                <h2
                    className="font-sora font-semibold text-center text-primary-900"
                    style={{
                        fontSize: "48px",
                        lineHeight: "72px",
                        maxWidth: "974px",
                    }}
                >
                    Your Gbese Adventure Starts Here.
                </h2>

                {/* Subtitle */}
                <p
                    className="font-poppins font-medium text-center text-gbese-black"
                    style={{
                        fontSize: "24px",
                        lineHeight: "42px",
                        maxWidth: "974px",
                    }}
                >
                    Earn XP. Trade debt. Spin wheels. Collect NFTs. It's debt; but make it fun.
                </p>

                {/* Tiles Grid */}
                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    {tiles.map((tile, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center rounded-[30px]"
                            style={{
                                width: "350px",
                                minHeight: "346px",
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
                            {/* Tile Image */}
                            <img
                                src={tile.image}
                                alt={tile.title}
                                className="w-[150px] h-[150px] object-contain"
                                draggable={false}
                            />

                            {/* Tile Heading */}
                            <h3
                                className="font-sora font-semibold text-center text-gbese-black mt-4"
                                style={{
                                    fontSize: "24px",
                                    lineHeight: "36px",
                                    maxWidth: "301px",
                                }}
                            >
                                {tile.title}
                            </h3>

                            {/* Tile Description */}
                            <p
                                className="font-poppins font-normal text-center text-gbese-black/80"
                                style={{
                                    fontSize: "18px",
                                    lineHeight: "27px",
                                    maxWidth: "279px",
                                }}
                            >
                                {tile.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <Link to="/sign-up">
                    <Button
                        className="bg-primary-900 hover:bg-primary-800 text-white font-poppins font-semibold rounded-lg"
                        style={{
                            width: "304px",
                            height: "60px",
                            fontSize: "18px",
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
