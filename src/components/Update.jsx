import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {  motion } from "framer-motion"

//Animation

const updateVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  }
}


const Update = () => {
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [ID, setID] = useState(null);

  const updateData = async (e) => {
    e.preventDefault();

    await axios.put(`https://6390acc765ff4183111b53e9.mockapi.io/notes/${ID}`, {
      noteTitle,
      noteContent
    });
    navigate("/");
  };

  const getItemsFromStorage = async () => {
    setNoteTitle(localStorage.getItem("Title"));
    setNoteContent(localStorage.getItem("Content"));
    setID(localStorage.getItem("ID"));
  };

  useEffect(() => {
    getItemsFromStorage();
  }, []);

  return (
      <motion.div
        variants={updateVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h2>_edit</h2>
        <form className="form">
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            type="text"
            name="noteTitle"
            placeholder="Title"
            value={noteTitle}
          />
          <textarea
            onChange={(e) => setNoteContent(e.target.value)}
            type="text"
            name="noteContent"
            placeholder="Content"
            value={noteContent}
          />
          <Link to="/">
            <button className="button" onClick={updateData} type="submit">
              Update
            </button>
          </Link>
          <Link to="/">
            <button className="button" type="submit">Back</button>
          </Link>
        </form>
      </motion.div>
  );
};

export default Update;
