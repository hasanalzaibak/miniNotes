import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Notes from "./Notes";
import Create from "./Create";
import Update from "./Update";
import "../styles.css"
import { motion } from "framer-motion"


//Animation

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3
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
        <Routes>
          <Route path="/create" exact element={<Create />} />
          <Route path="/" exact element={<Notes />} />
          <Route path="/update" exact element={<Update />} />
          <Route path="/*" exact element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
