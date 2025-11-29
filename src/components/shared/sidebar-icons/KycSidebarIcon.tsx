import type { SVGProps } from "react";

export default function KycSidebarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="116"
      viewBox="0 0 32 116"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.0001 2.66663C8.66675 2.66663 2.66675 8.66663 2.66675 16C2.66675 23.3333 8.66675 29.3333 16.0001 29.3333C23.3334 29.3333 29.3334 23.3333 29.3334 16C29.3334 8.66663 23.3334 2.66663 16.0001 2.66663ZM16.0001 26.6666C10.1201 26.6666 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33329 16.0001 5.33329C21.8801 5.33329 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6666 16.0001 26.6666ZM22.1201 10.1066L13.3334 18.8933L9.88008 15.4533L8.00008 17.3333L13.3334 22.6666L24.0001 12L22.1201 10.1066Z"
        fill="currentColor"
      />
      <line
        x1="16.75"
        y1="44.7446"
        x2="16.75"
        y2="115.251"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  );
}