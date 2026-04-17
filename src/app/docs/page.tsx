"use client";

import Link from "next/link";
import { Divider } from "@/components/docs/ui";
import { ListNavItem } from "@/components/docs/ListNavItem";
import { DocsNavigation } from "@/components/docs/DocsNavigation";
import { DOCS_NAV_ITEMS } from "@/lib/data";
import { usePathname } from "next/navigation";
import LogoGrow from "@/public/icons/growlogo-sm.svg";

export default function DocsPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row w-full mx-auto px-5 pt-5 max-lg:px-[30px] max-md:px-5 overflow-x-hidden">
      <aside className="w-64 shrink-0 max-lg:w-56 max-md:hidden">
        <ListNavItem navLinks={DOCS_NAV_ITEMS} pathname={pathname} />
      </aside>
      <div className="flex flex-col px-5 gap-6 flex-1 max-md:px-0">
        <h2 className="text-sm mt-[6px]">Introduction</h2>
        <LogoGrow />
        <h2 className="text-[32px] leading-[1.05] font-semibold mt-4">
          What is GrowChief?
        </h2>
        <Divider classes="my-0" />
        <p className="text-[16px] font-normal">
          GrowChief helps you to automate all your social media accounts.
        </p>
        <div className="flex flex-row gap-4 pb-10 max-lg:flex-col">
          <Link
            href="/docs/quickstart"
            className="w-[266px] max-lg:w-full p-3.5 rounded-xl border border-neutral-60 bg-neutral-100 hover:bg-neutral-80 transition-colors"
          >
            <p className="text-[16px] font-semibold text-neutral-40">
              Learn how to install the project
            </p>
          </Link>
          <Link
            href="/docs/how-it-works"
            className="w-[266px] max-lg:w-full p-3.5 rounded-xl border border-neutral-60 bg-neutral-100 hover:bg-neutral-80 transition-colors"
          >
            <p className="text-[16px] font-semibold text-neutral-40">
              Learn the architecture
            </p>
          </Link>
        </div>
        <Divider classes="mb-6" />
        <DocsNavigation />
      </div>
      <aside className="w-64 shrink-0 max-lg:hidden"></aside>
    </div>
  );
}
