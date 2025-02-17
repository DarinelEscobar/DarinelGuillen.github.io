import React from "react";
import { FaServer } from "react-icons/fa";
import { SiNodedotjs, SiLaravel, SiCodeigniter, SiRabbitmq } from "react-icons/si";

const SkillsCard: React.FC = () => {
  return (
    <div className="shadow-lg hover:shadow-xl transition-all duration-500 card">
      {/* Top Card: ícono + título */}
      <div className="top-card flex flex-col justify-center items-center p-6">
        <FaServer size={60} className="text-gray-700" />
        <h2 className="mt-3 font-semibold text-gray-800 text-xl card-title">Backend Development</h2>
      </div>

      {/* Bottom Card: skills */}
      <div className="bottom-card">
        <div className="card-content skill-list">
          {/* Skill 1 */}
          <div className="skill-item">
            <SiNodedotjs size={28} className="text-green-500" />
            <span className="font-medium skill-text">Node.js</span>
          </div>
          {/* Skill 2 */}
          <div className="skill-item">
            <SiLaravel size={28} className="text-red-500" />
            <span className="font-medium skill-text">Laravel</span>
          </div>
          
          {/* Skill 3 */}
          <div className="skill-item">
            <SiCodeigniter size={28} className="text-orange-500" />
            <span className="font-medium skill-text">CodeIgniter</span>
          </div>
          {/* Skill 4 */}
          <div className="skill-item">
            <SiRabbitmq size={28} className="text-blue-500" />
            <span className="font-medium skill-text">RabbitMQ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
