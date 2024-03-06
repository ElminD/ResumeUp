import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutUs = () => {
  return (
    <div className="aboutUsPage">
        <div className="ourStory">
            <h1>Our Story</h1>
            <p>
                Welcome to ResumeUp, where our mission is to transform your job search journey through the power of artificial intelligence. 
                Crafting compelling resumes and navigating a competitive job market can be challenging, and we understand the need for a solution that goes beyond the ordinary.
            </p>
            <p>
                At ResumeUp, we leverage AI to revolutionize the way you present your professional self. Our dynamic team, with backgrounds in development and design, 
                is passionate about providing job seekers with an innovative platform. We believe in offering more than just templates; 
                ResumeUp empowers you to customize every aspect of your application materials, reflecting your unique identity.
            </p>
            <p>
                Our AI tools go beyond surface-level design, offering a deeper level of customization. ResumeUp is your guiding companion, 
                providing not only visually appealing resumes but also substantive guidance. 
                Benefit from AI-driven insights, industry trend analyses, and a supportive community that propels you toward success.
            </p>
            <p>
                Discover a new era in resume creation with ResumeUp — where AI meets your professional narrative, opening doors to unprecedented opportunities. 
                Craft resumes that stand out, reflect your individuality, and speak directly to the employers you aim to impress. 
                Welcome to a smarter, more confident job search experience. Welcome to ResumeUp.
            </p>
        </div>
        <div className="teamPictures">
            <img src="Elmin.png" alt="Elmin"/> <a>Elmin Didic</a>
            <img src="Nick.png" alt="Nick"/> <a>Nick Thomas</a>
            <img src="Nedim.png" alt="Nedim"/> <a>Nedim Hodzic</a>
            <img src="Mitch.png" alt="Mitch"/> <a>Mitch Talyat</a>
            <img src="Nathan.png" alt="Nathan"/> <a>Nathan Boldt</a>
            <img src="Sid.png" alt="Sid"/> <a>Sid Prakash</a>
        </div>
    </div>
  );
};

export default AboutUs;