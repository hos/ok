"use client";
import "@/src/styles/globals.css";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { Menu } from "@/src/components/Nav";
import { Shortcuts } from "@/src/components/Shortcuts";

interface LayoutProps {
  children?: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = (props) => {
  const t = (key: string) => key;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Array.from(searchParams?.values() || []);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-row">
          <div className="md:w-3/4 py-8 inline-flex mt-14">
            {props.children}
          </div>
          <Menu
            t={t}
            isLargeMode={searchParams?.get("mode") === "large"}
            navigate={router.push}
            pathname={pathname || "/"}
            slug={params.join()}
          />
          <Shortcuts />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
