import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
    const faqs = [
        {
            question: "What is GBESE?",
            answer: "GBESE is a peer-to-peer credit transfer platform that lets you move your debt (aka gbese) to someone else — with their consent. It flips traditional credit models by decentralising who holds debt, giving people more freedom and control.",
        },
        {
            question: "Why would someone accept someone else's debt?",
            answer: "Because it comes with perks. Receivers can earn incentives (cash, tokens, or reputation points), improve their credit profile, or gain influence in our governance system. For users with strong financial capacity, absorbing gbese is a way to give back or game the system.",
        },
        {
            question: "How secure is Gbese?",
            answer: "Gbese uses bank-level encryption to protect all your data and transactions. We're compliant with all financial regulations and never store your sensitive banking information on our servers.",
        },
        {
            question: "What is the \"Wealth Redistribution Index\"?",
            answer: "It's a gamified metric that tracks how much gbese you've shifted upward — from those with less capacity to those with more. It celebrates users who help rebalance the system. You'll see stats, rankings, and community milestones in real time.",
        },
    ];

    return (
        <section
            id="faqs"
            className="w-full bg-gbese-white border-t border-gbese-neutrals-200"
            style={{ padding: "80px" }}
        >
            <div className="mx-auto flex max-w-[1440px] flex-col items-center" style={{ gap: "79px" }}>
                {/* Title */}
                <h2
                    className="font-sora font-semibold text-center text-primary-900"
                    style={{
                        fontSize: "48px",
                        lineHeight: "72px",
                        maxWidth: "669px",
                    }}
                >
                    Got Gbese Questions?
                </h2>

                {/* Subtitle */}
                <p
                    className="font-poppins font-medium text-center text-gbese-black -mt-12"
                    style={{
                        fontSize: "24px",
                        lineHeight: "42px",
                    }}
                >
                    All your burning questions answered. No long talk.
                </p>

                {/* Accordion */}
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    style={{ maxWidth: "1280px", gap: "16px" }}
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-gbese-neutrals-200 rounded-lg px-10 mb-4 data-[state=closed]:bg-[rgba(242,242,242,1)] data-[state=open]:bg-gbese-lilac transition-colors"
                        >
                            <AccordionTrigger
                                className="font-poppins font-semibold text-gbese-black hover:no-underline py-6"
                                style={{
                                    fontSize: "24px",
                                    lineHeight: "42px",
                                }}
                            >
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent
                                className="font-poppins font-medium text-gbese-black/80 pb-6"
                                style={{
                                    fontSize: "24px",
                                    lineHeight: "42px",
                                }}
                            >
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
