import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeStart = () => {
  return (
    <div className="homePage">
        <img src="/homeImage.png" alt="homeImg"/>
        <div className="startArea">
            <h1>Revolutionize Your Career Journey with ResumeUp</h1>
            <button type="button">Start</button>
        </div>
    </div>
  );
};

export default HomeStart;