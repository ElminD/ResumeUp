import { Button } from "@/components/ui/button"

const page = () => {
    return (
    <div className="flex justify-between max-w-6xl mx-auto px-4 py-10" >
        <div className="ourStory flex-1 mr-20">
          <h1 className="text-4xl font-bold mb-6 text-resumeup">Invest in Your Future</h1>
          <p className="text-lg mb-6">
          Upgrade to our Pro Plan on ResumeUp, and unlock a wealth of resources that elevate your resume creation experience. 
          With an expanded array of professionally crafted templates, our Pro Plan provides unparalleled options, allowing you 
          to tailor your resume to your unique style and career aspirations. Additionally, enjoy an increased number of AI suggestion tokens, 
          empowering you to harness the full potential of artificial intelligence in refining your resume. Stand out effortlessly with the Pro Plan 
          on ResumeUp, where innovation and customization converge to propel your professional journey to new heights.
          </p>
          <div className="flex justify-center mt-4"><Button className="submit-button hover:bg-[#d3d3d3]" disabled>Coming Soon</Button></div>
        </div>
        <div className="homePic flex-1 mr-20">
          <div className="flex flex-col items-center">
            <img src="/homepage.png" alt="Elmin" className="w-100 h-100 mb-2" />
          </div>
          
        </div>
      </div>
    );
  };
  
  export default page;
  