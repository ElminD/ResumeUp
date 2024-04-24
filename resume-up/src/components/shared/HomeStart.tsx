"use client"

import React from "react";
import Link from "next/link";
import Cookies from "js-cookie"
import Image from "next/image";

const HomeStart = () => {
  const loggedinUser = Cookies.get("loggedinEmail")

  return (
    <div className="flex items-center px-4 py-10">
        <Image src="/homepage.png" alt="homeImg" width={1200} height={1200} className="w-[38%] ml-20" />
        <div className="flex-1 px-10 text-center mr-10">
            <h1 className="text-5xl text-resumeup font-bold">Revolutionize Your Career Journey with ResumeUp</h1>
            <Link href={loggedinUser ? "/Profile" : "/Log_In"}><button className="mt-10 px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-3xl font-semibold rounded-full shadow-lg transition duration-300 ease-in-out">Start</button></Link>
        </div>
    </div>
  );
};

export default HomeStart;