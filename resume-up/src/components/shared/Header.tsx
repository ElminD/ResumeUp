import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b bg-resumeup text-white">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/Resume_White.svg"
            width={128}
            height={38}
            alt="Resume Up Logo"
          />
        </Link>
        {/* <SignedIn> */}
        <nav className="">
          <NavItems />
        </nav>
        {/* </SignedIn> */}

        {/* <div className="flex w-32 justify-end gap-3">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <MobileNav />
                </SignedIn>
                <SignedOut> 
                    <Button asChild className="rounded-full" size="lg">
                        <Link href="/sign-in">
                            Bar Login
                        </Link>
                    </Button>
                </SignedOut>
            </div> */}
      </div>
    </header>
  );
};

export default Header;
