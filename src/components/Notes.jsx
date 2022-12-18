import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import newIcon from "../icons/add.png"
import pencil from "../icons/pencil.png"
import x from "../icons/x.png"
import { motion } from "framer-motion"


//Animation

const noteVariants = {
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
      duration: 0.2,
      ease: "easeOut"
    }
  }
}


const Notes = () => {
  const [apiData, setApiData] = useState([]);

  const fetchNotes = useCallback(async () => {
    const getData = await axios.get(
      `https://6390acc765ff4183111b53e9.mockapi.io/notes`
    );
    setApiData(getData.data);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const onDelete = async (id) => {
    await axios.delete(
      `https://6390acc765ff4183111b53e9.mockapi.io/notes/${id}`
    );
    fetchNotes();
  };

  const setData = (data) => {
    localStorage.setItem("ID", data.id);
    localStorage.setItem("Title", data.noteTitle);
    localStorage.setItem("Content", data.noteContent);
  };

  return (
    <motion.div
      variants={noteVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="new">
        <Link to="/create">
          <button className="new-button"><img className="new-image" src={newIcon} /></button>
        </Link>
      </div>
      <div className="container">
        {apiData.map((data) => {
          return (
            <motion.div
              variants={noteVariants}
              className="note"
              key={data.id}>
              <div className="note-bar">
                <h3 className="note-bar-title">{data.noteTitle}</h3>
                <div className="note-bar-buttons">
                  <Link to="/update">
                    <button className="note-bar-buttons-update" type="submit" onClick={() => setData(data)}>
                      <img alt="edit-icon" src={pencil} />
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="note-bar-buttons-delete" type="submit" onClick={() => onDelete(data.id)}>
                      <img alt="delete-icon" src={x} />
                    </button>
                  </Link>
                </div>
              </div>
              <p>{data.noteContent}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Notes;
