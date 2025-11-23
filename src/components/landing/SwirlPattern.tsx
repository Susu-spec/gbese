export default function SwirlPattern() {
    return (
        <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="swirlGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(172, 188, 240, 0.8)" />
                    <stop offset="50%" stopColor="rgba(131, 154, 232, 1)" />
                    <stop offset="100%" stopColor="rgba(172, 188, 240, 0.8)" />
                </linearGradient>
            </defs>
            <path 
                d="M0,32 C280,12 400,12 560,38 C720,28 860,18 1120,42 C1280,34 1360,26 1440,38 L1440,64 L0,64 Z" 
                fill="rgb(249, 250, 251)"
                opacity="1"
            />
            <path 
                d="M0,32 C280,12 400,12 560,38 C720,28 860,18 1120,42 C1280,34 1360,26 1440,38" 
                fill="none" 
                stroke="url(#swirlGradient)" 
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path 
                d="M0,32 C280,12 400,12 560,38 C720,28 860,18 1120,42 C1280,34 1360,26 1440,38" 
                fill="none" 
                stroke="url(#swirlGradient)" 
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
            />
        </svg>
    );
}
