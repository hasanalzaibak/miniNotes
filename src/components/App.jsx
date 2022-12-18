import {
  BrowserRouter as Router
} from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import "../styles.css"
import { motion } from "framer-motion"


//Animation

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  },
  visible: {
    opacity: 1,
    y:0,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  }
}


const App = () => {


  return (
    <>

      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >miniNote</motion.h1>

      <Router >

        <AnimatedRoutes />

      </Router>

    </>
  );
};

export default App;
