import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import dataExperience from "@data/experience.json";
import dataProjects from "@data/projects.json";

import "./Projects.css";

import ProjectCard from "./ProjectCard";
import ProjectNavigation from "./ProjectNavigation";
import DetailsProjects from "../DetailsProjects/DetailsProjects";

import { formatDate } from "./dateUtils";

const Projects: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

  // Unify projects from both sources
  const experienceProjects = dataExperience.experience.projects || [];
  const personalProjects = dataProjects.projects.personal_projects || [];
  const mergedProjects = [...experienceProjects, ...personalProjects];

  // Prevent errors when accessing undefined indexes
  const currentProject = mergedProjects[currentProjectIndex] || {};
  const media = currentProject.media || [];

  const { ref } = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const startDate = currentProject.start_date ? formatDate(currentProject.start_date) : "";
  const endDate = currentProject.end_date ? formatDate(currentProject.end_date) : "";

  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev - 1);
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < mergedProjects.length - 1) {
      setDirection(1);
      setCurrentImageIndex(0);
      setCurrentProjectIndex((prev) => prev + 1);
    }
  };

  const handleExpandProject = (projectIndex: number) => {
    setExpandedProjectIndex(projectIndex);
  };

  const handleCloseDetails = () => {
    setExpandedProjectIndex(null);
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-col justify-center items-center bg-whi px-4 sm:px-6 py-8 lg:py-0 w-screen min-h-[calc(var(--vh,1vh)*100)]"
    >
      <ProjectCard
        key={currentProjectIndex}
        direction={direction}
        currentProject={currentProject}
        startDate={startDate}
        endDate={endDate}
        media={media}
        currentProjectIndex={currentProjectIndex}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      <ProjectNavigation
        handlePrevProject={handlePrevProject}
        handleNextProject={handleNextProject}
        disablePrev={currentProjectIndex === 0}
        disableNext={currentProjectIndex === mergedProjects.length - 1}
        onExpandProject={() => handleExpandProject(currentProjectIndex)}
      />

      {expandedProjectIndex !== null && (
        <DetailsProjects
          projects={mergedProjects} // Ensure DetailsProjects gets the unified data
          projectIndex={expandedProjectIndex}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default Projects;