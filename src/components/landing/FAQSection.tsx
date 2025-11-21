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
            className="w-full bg-gbese-white border-t border-gbese-neutrals-200 py-20 px-5 md:py-20 md:px-20"
        >
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[30px] md:gap-[79px]">
                <h2 className="font-sora font-semibold text-center text-primary-900 text-[28px] leading-10 md:text-[48px] md:leading-[72px] max-w-[336px] md:max-w-[669px]">
                    Got Gbese Questions?
                </h2>

                <p className="font-poppins font-medium text-center text-gbese-black text-lg leading-9 md:text-[24px] md:leading-[42px] max-w-[336px] md:max-w-full md:-mt-12">
                    All your burning questions answered. No long talk.
                </p>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-[376px] md:max-w-7xl flex flex-col gap-4"
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-gbese-neutrals-200 rounded-2xl md:rounded-lg p-2.5 md:px-10 mb-4 data-[state=closed]:bg-[rgba(242,242,242,1)] data-[state=open]:bg-gbese-lilac transition-all duration-300 hover:shadow-md"
                        >
                            <AccordionTrigger className="font-poppins font-medium md:font-semibold text-gbese-black hover:no-underline py-3 md:py-6 text-sm md:text-[24px] leading-5 md:leading-[42px]">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="font-poppins font-medium text-gbese-black/80 pb-3 md:pb-6 text-sm md:text-[24px] leading-5 md:leading-[42px]">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
