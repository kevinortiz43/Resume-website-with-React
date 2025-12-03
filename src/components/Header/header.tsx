import Link from "next/link";
import React from "react";
import "./header.css";

export default function Header() {
  return (
    <>
      <section className="p-menu1">
        <nav id="navbar" className="navigation" role="navigation">
          <input id="toggle1" type="checkbox" />
          <label className="hamburger1">
            <div className="top"></div>
            <div className="meat"></div>
            <div className="bottom"></div>
          </label>

          <nav className="menu1">
            <Link href="/"> Home</Link>
            <Link href="/about">About</Link>
            <Link href="/canvas">Canvas</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/projects">projects</Link>
          </nav>
        </nav>
      </section>

      <nav id="desktop-navigation">
        <div className="nav container"></div>
        <div className="nav-links">
          <Link href="/"> Home</Link>
          <Link href="/about">About</Link>
          <Link href="/canvas">Canvas</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/projects">projects</Link>
        </div>
      </nav>
    </>
  );
}
