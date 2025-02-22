import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import data from "@data/data.json";

interface HeaderDesktopProps {
  formattedTime: string;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({
  formattedTime,
  toggleDarkMode,
  isDarkMode,
}) => {
  const { short_name, rol, location } = data.resume.personal_info;

  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className="top-0 left-0 z-10 absolute flex justify-between bg-transparent px-5 py-3 w-full text-sm transition-colors duration-100 ease-in-out"
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
    >
      <InfoSection title={`${short_name}:`} content={rol} />
      <InfoSection title="Location:" content={`${location} (${formattedTime})`} />
      <NavigationLinks />
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </motion.div>
  );
};

interface InfoSectionProps {
  title: string;
  content: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => (
  <motion.div className="flex flex-col gap-0.5 text-left" variants={fadeIn}>
    <h1 className="font-bold font-rob text-[0.89rem] text-dar">{title}</h1>
    <p className="font-lat text-[0.89rem] text-dar">{content}</p>
  </motion.div>
);

const NavigationLinks: React.FC = () => (
  <motion.div className="flex flex-col gap-0.5 text-left" variants={fadeIn}>
    <h1 className="font-bold font-rob text-[0.89rem] text-dar">Navigation:</h1>
    <p className="font-lat text-[0.89rem] text-dar">
      <Link to="/">Index</Link>,{" "} <Link to="/Contact">Contact</Link>,{" "} <Link to="/Project">Projects</Link>
      {/* <Link to="/Page2">Archive</Link> */}
    </p>
  </motion.div>
);

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => (
  <motion.div className="flex flex-col gap-0.5 text-left" variants={fadeIn}>
    <h1 className="font-bold font-rob text-[0.89rem] text-dar">Theme:</h1>
    <button
      onClick={toggleDarkMode}
      className="font-rob text-[0.89rem] text-dar underline"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  </motion.div>
);

export default HeaderDesktop;
