import React from "react";
import "aos/dist/aos.css";
import StyledParagraphWithLink from "../components/StyledParagraphWithLink";
import StyledParagraph from "../components/StyledParagraph";

const DeveloperPage = () => {
    return (
        <div>
            <div className="flex h-full text-black p-4 bg-purple-700">
                <h1
                    className="flex-1 flex-col justify-center text-5xl font-bold mt-20"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    Hi! My name is Alexander and I am a full stack developer from Ukraine.
                    Don't really know how to wink, so I'll do it like this 😉
                </h1>
                <img
                    className="flex-2 flex-col justify-center mt-14 mx-auto h-52 w-auto rounded-md"
                    data-aos="fade-left"
                    data-aos-delay="100"
                    src="/me.png"
                    alt="Developer"
                />
            </div>
            <div
                className="flex flex-col h-full text-black p-4 bg-white"
                data-aos="fade-left"
                data-aos-delay="100"
            >
                <h2
                    className="ml-auto w-3/4 flex-1 flex-col justify-center text-5xl font-bold"
                >
                    About me:
                </h2>
                <p
                    className="ml-auto w-3/4 flex-1 flex-col justify-center text-3xl font-bold"
                >
                    Driven by my dedication to the craft, I'm a detail-oriented developer with
                    over 2 years of experience. I take immense satisfaction in improving people's
                    lives and streamlining tasks through my software development contributions.
                    Proficient in translating design mock-ups into responsive user interfaces and
                    integrating them with server-side logic. My hands-on experience includes
                    developing, testing, and maintaining web applications, collaborating with
                    cross-functional teams. I developed high-load enterprise applications in the
                    medical field, emphasizing detail and rapid feature delivery. I'm eager to
                    take on new challenges and contribute effectively to innovative projects.
                </p>
            </div>
            <div
                className="flex flex-col h-full text-black p-4 bg-teal-300"
                data-aos="fade-right"
                data-aos-delay="100"
            >
                <h2
                    className="w-3/4 flex-1 flex-col justify-center text-5xl font-bold"
                >
                    Skills:
                </h2>
                <StyledParagraph
                    text={"• C# | .NET | JavaScript | HTML | CSS | SQL Server | Node |" +
                        " React | Redux| TypeScript | Git | Jenkins | Redis | RabbitMQ"}
                />
                <StyledParagraph
                    text={"• Microservices | Distributed Systems | Frontend | Backend | Full-Stack"}
                />
                <StyledParagraph
                    text={"• English - reading/writing - B1, speaking - A1 | Ukrainian - C2 |" +
                        " Russian - C2"}
                />
            </div>
            <div
                className="flex flex-col h-full text-black p-4 bg-white"
                data-aos="fade-left"
                data-aos-delay="100"
            >
                <h2
                    className="ml-auto w-3/4 flex-1 flex-col justify-center text-5xl font-bold"
                >
                    Useful links:
                </h2>
                <StyledParagraphWithLink text={"• GIT:"} linkText={"https://github.com/AlexTabu"}/>
                <StyledParagraphWithLink text={"• LinkedIn:"} linkText={"https://www.linkedin.com/in/alexander-taburov-a48b46144/"}/>
            </div>
        </div>
    );
};

export default DeveloperPage;
