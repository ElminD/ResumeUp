import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItemsFooter from "./NavItemsFooter";

const Footer = () => {
  return (
    <footer className="border-t bg-resumeup text-white font-semibold">
      <div className="flex-center wrapper flex-between justify-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image src="/ResumeUpLogo.svg" alt="Logo" width={128} height={128} />
        </Link>
        <div className="flex-between">
          <nav className="me-6">
            <NavItemsFooter />
          </nav>
          <p> 2023 ResumeUp. All Rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
