import Link from "next/link";
import React from "react";
import "./header";

export default function Header() {
  return (
    <div>
      <Link href="/"> Home</Link>
      <Link href="/about">About</Link>
      <Link href="/canvas">Canvas</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/projects">projects</Link>
    </div>
  );
}
