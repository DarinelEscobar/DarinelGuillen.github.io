import React from "react";
import SkillsCard from "./SkillsCard";
import './skills.css'

const SomePage: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <SkillsCard />
    </div>
  );
};

export default SomePage;
