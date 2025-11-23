import type { AuthHeaderProps } from "../types";
import { Link } from "react-router";

export function AuthHeader({
    title,
    subtitle,
    linkText,
    linkTo
}: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-1.75 md:gap-3">
        <h1 className="font-sora text-2xl md:text-3xl lg:text-5xl font-bold md:font-semibold leading-9 lg:leading-18 text-center">
            {title}
        </h1>

        <p className="text-sm md:text-lg flex flex-wrap gap-1 justify-center">
            {subtitle}
            <Link to={linkTo} className="text-primary-900 font-semibold focus-visible:outline-0">
                {linkText}
            </Link>
        </p>
    </div>
  );
}
