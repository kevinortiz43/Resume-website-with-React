import React from "react";

import  "./home.css";
import professionalPicture from "@/Assets/professional-picture.jpg"
import linkedInImage from "@/Assets/linkedin.png"
import githubImage from "@/Assets/github.png"

export default function home() {
  return (
    <>
    <section id="profile">
        <div className="profile-picture">
            <img src={professionalPicture.src} alt="kevin-ortiz-proffessional-picture"/>
        </div>


        <h1 className="title">Kevin Ortiz</h1>
        <div className="section-text">
            <p className="section-text-p2">Software Engineer</p>

            <div className="btn-container">

                <a href="/Assets/Resume_Kevin_Ortiz.pdf" download="/Assets/Resume_Kevin_Ortiz.pdf">
                    <button className="btn btn-color-2">
                        Resume
                    </button>
                </a>


                <a href="mailto:kevin.ortiz.software@gmail.com?subject=Contact">
                    <button className="btn btn-color-2" href='./kevin/contacts'>
                        Contact Me
                    </button>
                </a>
                
            </div>

            <div id="socials-container">
                <a href="https://www.linkedin.com" target="_blank">
                    <img src={linkedInImage.src} alt="My LinkedIn profile" className="icon" />
                </a>

                <a href="https://github.com/kevinortiz43" target="_blank">
                    <img src={githubImage.src} alt="My GitHub profile" className="icon" />
                </a>

            </div>
        </div>
    </section>
    </>
  );
}
