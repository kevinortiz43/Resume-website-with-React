import React from "react";
import "./contact.css";
import emailIcon from "@/Assets/email.png"
import linkedInImage from "@/Assets/linkedin.png"



export default function contact() {
  return (
  <>
  
  
    
    <section id="contact">
        <h1 className="title">Contact Me</h1>
        <div className="contact-info-upper-container">
            <div className="contact-info-container">

                <a href="mailto:kevin.ortiz.software@gmail.com?subject=Contact">
                    <img src={emailIcon.src} alt="email icon" className="icon" />
                </a>

                <p>
                    Kevin.ortiz.software&#64;gmail.com
                </p>
            </div>

            <div className="contact-info-container">
                <a href="https://www.linkedin.com" target="_blank">
                    <img src={linkedInImage.src} alt="My LinkedIn profile" className="icon" />
                </a>

                <p>
                    LinkedIn
                </p>
            </div>
        </div>
    </section>

  
  
  </>
  );
}
