import React from "react";
import Link from "next/link";

const HomeStart = () => {
  return (
    <div className="flex items-center px-4 py-10">
        <img src="/homepage.png" alt="homeImg" className="w-1/2 ml-20" />
        <div className="flex-1 px-10 text-center mr-10">
            <h1 className="text-7xl text-resumeup font-bold">Revolutionize Your Career Journey with ResumeUp</h1>
            <Link href={"/Log_In"}><button className="mt-10 px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-3xl font-semibold rounded-full shadow-lg transition duration-300 ease-in-out">Start</button></Link>
        </div>
    </div>
  );
};

export default HomeStart;