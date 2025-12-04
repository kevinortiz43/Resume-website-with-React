/* eslint-disable @next/next/no-img-element */
import React from "react";

// import  "./home.css";
import professionalPicture from "@/Assets/professional-picture.jpg";
import linkedInImage from "@/Assets/linkedin.png";
import githubImage from "@/Assets/github.png";
import style from "./home.module.css";
import Image from "next/image";
export default function home() {
  return (
    <>
      <section id={style.profile}>
        <div className={style.profilepicture}>
          <Image
            src={professionalPicture.src}
            alt="kevin-ortiz-proffessional-picture"
            height={400}
            width={460}
          />
        </div>

        <h1 className={style.title}>Kevin Ortiz</h1>
        <div className={style.sectiontext}>
          <p className={style.sectiontextp2}>Software Engineer</p>

          <div className={style.btncontainer}>
            <a
              href="/Assets/Resume_Kevin_Ortiz.pdf"
              download="/Assets/Resume_Kevin_Ortiz.pdf"
            >
              <button className={`${style.btn} ${style.btncolor2}`}>
                Resume
              </button>
            </a>

            <a href="mailto:kevin.ortiz.software@gmail.com?subject=Contact">
              <button className={`${style.btn} ${style.btncolor2}`}>
                Contact Me
              </button>
            </a>
          </div>

          <div id={style.socialscontainer}>
            <a href="https://www.linkedin.com" target="_blank">
              <img
                src={linkedInImage.src}
                alt="My LinkedIn profile"
                className={style.icon}
              />
            </a>

            <a href="https://github.com/kevinortiz43" target="_blank">
              <img
                src={githubImage.src}
                alt="My GitHub profile"
                className={style.icon}
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
