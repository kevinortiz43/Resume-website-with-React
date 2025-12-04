import React from "react";
import Link from "next/link";
import classes from "./header.module.css";

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/project">Project</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {/* <li>
            <Link href="/canvas">Canvas</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
