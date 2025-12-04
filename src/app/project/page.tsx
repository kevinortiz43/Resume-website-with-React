// app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useThreeModelBuilder } from "@/components/modelView";
import "./projects.css"

interface Project {
  id: string;
  title: string;
  model: string;
  camera: { x: number; y: number; z: number };
  hdrPath?: string;
}

export default function Home() {
  const router = useRouter();
  const { threeDimensionModelBuilder, openPage, cleanupAll } = useThreeModelBuilder();
  const initializedRef = useRef(false);
  
  const projects: Project[] = [
    {
      id: 'snowmanCanvas',
      title: 'Snowman',
      model: 'snowman',
      camera: { x: 0, y: 1, z: 4 },
      hdrPath: 'snowy_hillside_1k'
    },
    {
      id: 'sharkCanvas',
      title: 'Shark',
      model: 'shark',
      camera: { x: 0, y: 0, z: 3.1 }
    },
    {
      id: 'scifiCrateCanvas',
      title: 'Sci-Fi Crate',
      model: 'scifiCrate',
      camera: { x: 0, y: 1, z: 4 },
      hdrPath: 'industrial_sunset_puresky_1k'
    },
    {
      id: 'GladiusCanvas',
      title: 'Gladius',
      model: 'TOC_Gladius',
      camera: { x: 0, y: -1.5, z: 6.5 },
      hdrPath: 'industrial_sunset_puresky_1k'
    },
     {
      id: 'hardDrive',
      title: 'Hard Drive',
      model: 'hardDrive',
      camera: { x: 0, y: -1.5, z: 6.5 },
      hdrPath: 'industrial_sunset_puresky_1k'
    }
  ];

  useEffect(() => {
    // Prevent multiple initializations
    if (initializedRef.current) return;
    
    initializedRef.current = true; // Set this BEFORE loading to prevent race conditions
    
    const timer = setTimeout(() => {
      projects.forEach(project => {
        threeDimensionModelBuilder(
          project.id,
          project.model,
          false,
          'black',
          project.camera.x,
          project.camera.y,
          project.camera.z,
          3,
          2,
          project.hdrPath || ''
        );
      }); // <-- Fixed: removed the erroneous [] here
    }, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      cleanupAll();
    };
  }, []); // <-- Correct: empty dependency array for useEffect

  const handleOpenGitHub = () => {
    openPage('https://github.com/PogodaSoftware/main_frame');
  };

  const handleOpenDemo = (project: Project) => {
    const params = new URLSearchParams({
      model: project.model,
      helpers: 'false',
      color: 'black',
      cameraX: project.camera.x.toString(),
      cameraY: project.camera.y.toString(),
      cameraZ: project.camera.z.toString(),
      hdrPath: project.hdrPath || ''
    });
    
    router.push(`/canvas?${params}`);
  };

  return (
    <div>
      <section id="projects">
        <h1 className="title">Browse my projects</h1>
        <div className="project-details-container">
          <div className="project-containers">
            {projects.map((project) => (
              <div key={project.id} className="details-container color-container">
                <div className="article-container">
                  <canvas
                    id={project.id}
                    aria-label={`Model of a ${project.title.toLowerCase()}`}
                    className="project-image"
                  />
                </div>
                <h2 className="project-sub-title project-title">{project.title}</h2>
                <div className="btn-container">
                  <button
                    className="btn btn-color-2 project-btn"
                    onClick={handleOpenGitHub}
                  >
                    GitHub
                  </button>
                  <button
                    className="btn btn-color-2 project-btn"
                    onClick={() => handleOpenDemo(project)}
                  >
                    Live Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}