// Centralized static data for landing page sections.
import XPTileImage from "@/assets/images/xp-tile.png";
import SpinWheelTileImage from "@/assets/images/spin-the-wheel-tile.png";
import BadgeTileImage from "@/assets/images/badge-tile.png";

export const heroCtaText = "Start Passing Debt Now";

export const howItWorksSteps = [
  {
    step: 1,
    title: "Start or Accept a Gbese",
    description: "Send or accept a debt. Whether you're owing or helping out, it begins with one simple agreement.",
    icon: "send"
  },
  {
    step: 2,
    title: "Transfer or Repay",
    description: "Need help? Shift the debt to someone else. Ready to pay back? Clear it in a tap.",
    icon: "arrow-left-right"
  },
  {
    step: 3,
    title: "Earn XP & Trust",
    description: "Make smart money moves, climb ranks, and unlock rewards in the community.",
    icon: "award"
  }
];

export const whyChooseSlides = [
  {
    icon: "flat-color-icons:debt",
    title: "Debt Made Simple",
    description: "Track your debt, set reminders, and automate payments. No drama, no long talk.",
  },
  {
    icon: "ic:baseline-transfer-within-a-station",
    title: "Transfer Debts",
    description: "Need help paying? Let someone else cover you (with their consent). Stay accountable without the pressure.",
  },
  {
    icon: "token-branded:trust",
    title: "Built for Trust",
    description: "Use cash or crypto; your choice. Smart contracts keep repayments secure on-chain when you want extra peace of mind.",
  },
  {
    icon: "tabler:award",
    title: "Earn While You Help",
    description: "Every good gbe$e deed earns you XP. Transfer debts, pay on time, help others, then watch your rewards rack up.",
  },
];

export const ctaTiles = [
  {
    title: "Rack up XPs",
    description: "Earn XP for every smart move. Debt transfers, and helping others.",
    image: XPTileImage,
    bgColor: "rgba(244, 242, 255, 1)",
    borderColor: "rgba(93, 46, 255, 1)",
    shadowColor: "rgba(135, 67, 226, 0.1)",
  },
  {
    title: "Spin to Win",
    description: "Use XP to spin the rewards wheel and unlock NFTs, perks, and fun surprises.",
    image: SpinWheelTileImage,
    bgColor: "rgba(255, 250, 235, 1)",
    borderColor: "rgba(243, 167, 18, 1)",
    shadowColor: "rgba(250, 183, 121, 0.1)",
  },
  {
    title: "Badge Up",
    description: "Show off profile badges that highlight your cred and activity in the community.",
    image: BadgeTileImage,
    bgColor: "rgba(255, 242, 234, 1)",
    borderColor: "rgba(255, 128, 0, 1)",
    shadowColor: "rgba(240, 25, 17, 0.1)",
  },
];

export const faqs = [
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

export const quickLinks = [
  { label: "Product", href: "#product" },
  { label: "Company", href: "#company" },
  { label: "Web3", href: "#web3" },
  { label: "Legal", href: "#legal" },
];

export const trustLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Security", href: "#security" },
  { label: "Testimonials", href: "#testimonials" },
];

export const contactInfo = [
  { label: "Email", value: "hello@gbese.com", href: "mailto:hello@gbese.com" },
  { label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
  { label: "Address", value: "Lagos, Nigeria" },
];

export const socialIcons = [
  { icon: "proicons:x-twitter", href: "#", label: "Twitter" },
  { icon: "ic:baseline-facebook", href: "#", label: "Facebook" },
  { icon: "ic:baseline-telegram", href: "#", label: "Telegram" },
  { icon: "mdi:instagram", href: "#", label: "Instagram" },
];
