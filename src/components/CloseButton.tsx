import Link from "next/link";
import { usePathname } from "next/navigation";

export const CloseButton = () => {
  const pathname = usePathname();

  return (
    <div className="absolute top-8 right-8 w-6 h-6 z-20 md:[.focus_&]:opacity-0 transition-opacity duration-500">
      <Link href={{ query: {}, pathname: pathname.split("?")?.[0] }} shallow>
        <svg height="100%" width="100%" viewBox="0 0 32 32">
          <title />
          <g id="cross" stroke="#fff" fill="#fff" strokeWidth={2}>
            <line x1="7" x2="25" y1="7" y2="25" />
            <line x1="7" x2="25" y1="25" y2="7" />
          </g>
        </svg>
      </Link>
    </div>
  );
};
