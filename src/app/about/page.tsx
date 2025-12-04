import React from "react";
import "./about.css";
import professionalPicture from "@/Assets/professional-picture.jpg";
import experienceIcon from "@/Assets/experience.png";
import educationIcon from "@/Assets/education.png";
import Image from "next/image";
export default function about() {
  return (
    <>
      <section id="profile">
        <div className="profile-picture">
         <Image 
            src={professionalPicture.src}
            alt="kevin-ortiz-proffessional-picture"
            height={400}
            width={460}
          />
        </div>

        <section id="about">
          <div className="about-details-container">
            <div className="about-containers">
              <div className="details-container">
                <img
                  src={experienceIcon.src}
                  alt="Experience icon"
                  className="icon"
                />
                <h3 className="Experience-tag">Experience</h3>
                <p className="first-experience-paragraph">
                  3 + years Software Developer
                </p>
                <br />
                <p className="second-experience-paragraph">
                  2 + years Quality Assurance Engineer
                </p>
                <br />

                <p className="third-experience-paragraph">
                  3 + months DevOps Engineer
                </p>
              </div>

              <div className="details-container">
                <img
                  src={educationIcon.src}
                  alt="Education icon"
                  className="icon"
                />
                <h3 className="Education-tag">Education</h3>
                <p className="first-education-paragraph">
                  B.Sc. in Marine Environmental Science
                </p>{" "}
                <br />
                <p className="second-education-paragraph">
                  Software Engineering training at Perscholas
                </p>{" "}
                <br />
                <p className="third-education-paragraph">
                  Quality Assurance training at FDM Group
                </p>{" "}
              </div>
            </div>
            <div className="text-container">
              {/* <p className="about-me-paragraph-one">
                I am a dynamic and detail-oriented Software engineer with
                experience in front end and back end
              </p>
              <p className="about-me-paragraph-one">
                I am a dynamic and detail-oriented Quality Assurance Engineer
                with a robust background in software testing, DevOps, cloud
                infrastructure, and full-stack development. With experience
                leading QA teams and collaborating across cross-functional Agile
                environments, I bring a proven ability to drive quality and
                efficiency in both manual and automated testing.
              </p>
              <p className="about-me-paragraph-two">
                I have hands-on experience with Selenium, Playwright, TestNG,
                Cucumber, and a variety of DevOps tools, including Docker,
                Kubernetes, Terraform, Jenkins, and Azure. I have demonstrated
                expertise in orchestrating containerized applications, building
                resilient cloud solutions, and automating infrastructure
                deployment. My QA leadership at FDM Group and analytical
                contributions at TD Bank reflect my strong technical insight and
                effective communication skills.
              </p>

              <p className="about-me-paragraph-three">
                As a U.S. Navy veteran and a SUNY Maritime graduate, I bring a
                solid foundation in leadership, discipline, and teamwork. With
                continuous upskilling in Salesforce, Java, Python, React, and
                mobile/app testing platforms, I remain committed to innovation
                and excellence in software quality engineering.
              </p>


               */}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
