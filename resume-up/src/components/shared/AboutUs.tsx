import React from "react";

const AboutUs = () => {
  return (
    <div className="flex justify-between max-w-6xl mx-auto px-4 py-10">
      <div className="ourStory flex-1 mr-20">
        <h1 className="text-4xl font-bold mb-6">Our Story</h1>
        <p className="text-lg mb-6">
          Welcome to ResumeUp, where our mission is to transform your job search journey through the power of artificial intelligence.
          Crafting compelling resumes and navigating a competitive job market can be challenging, and we understand the need for a solution that goes beyond the ordinary.
        </p>
        <p className="text-lg mb-6">
          At ResumeUp, we leverage AI to revolutionize the way you present your professional self. Our dynamic team, with backgrounds in development and design,
          is passionate about providing job seekers with an innovative platform. We believe in offering more than just templates;
          ResumeUp empowers you to customize every aspect of your application materials, reflecting your unique identity.
        </p>
        <p className="text-lg mb-6">
          Our AI tools go beyond surface-level design, offering a deeper level of customization. ResumeUp is your guiding companion,
          providing not only visually appealing resumes but also substantive guidance.
          Benefit from AI-driven insights, industry trend analyses, and a supportive community that propels you toward success.
        </p>
        <p className="text-lg">
          Discover a new era in resume creation with ResumeUp — where AI meets your professional narrative, opening doors to unprecedented opportunities.
          Craft resumes that stand out, reflect your individuality, and speak directly to the employers you aim to impress.
          Welcome to a smarter, more confident job search experience. Welcome to ResumeUp.
        </p>
      </div>
      <div className="teamPictures flex-1 flex flex-wrap gap-10">
        <div className="flex flex-col items-center">
          <img src="Elmin.png" alt="Elmin" className="w-60 h-60 mb-2" />
          <a className="font-bold">Elmin Didic</a>
        </div>
        <div className="flex flex-col items-center">
          <img src="Nick.png" alt="Nick" className="w-60 h-60 mb-2" />
          <a className="font-bold">Nick Thomas</a>
        </div>
        <div className="flex flex-col items-center">
          <img src="Nedim.png" alt="Nedim" className="w-60 h-60 mb-2" />
          <a className="font-bold">Nedim Hodzic</a>
        </div>
        <div className="flex flex-col items-center">
          <img src="Mitch.png" alt="Mitch" className="w-60 h-60 mb-2" />
          <a className="font-bold">Mitch Talyat</a>
        </div>
        <div className="flex flex-col items-center">
          <img src="Nathan.png" alt="Nathan" className="w-60 h-60 mb-2" />
          <a className="font-bold">Nathan Boldt</a>
        </div>
        <div className="flex flex-col items-center">
          <img src="Sid.png" alt="Sid" className="w-60 h-60 mb-2" />
          <a className="font-bold">Sid Prakash</a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;