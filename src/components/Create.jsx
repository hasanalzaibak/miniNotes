import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import mic from "../icons/microphone.png"
import { motion } from "framer-motion"

//Animation

const createVariants = {
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


const Create = () => {
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const sendDataApi = async (e) => {
    e.preventDefault();

    await axios.post(`https://6390acc765ff4183111b53e9.mockapi.io/notes`, {
      noteTitle,
      noteContent
    });
    navigate("/");
  };

  //Speech Settings

  const [languageValue, setLanguageValue] = useState("")

  const { finalTranscript } = useSpeechRecognition()

  useEffect(() => {
    setNoteContent(`${finalTranscript}`)
  }, [finalTranscript])


  const handleSpeech = () => {
    SpeechRecognition.startListening({ language: `${languageValue}` })
  }

  //Return JSX

  return (
      <motion.div
        variants={createVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h2>_new</h2>
        <form>
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            type="text"
            name="noteTitle"
            placeholder="Title"
          />
          <div className="speech">
            <select onChange={(e) => setLanguageValue(e.target.value)}>
              <option value="en-US">EN</option>
              <option value="pt-br">PT</option>
            </select>
            <button onMouseDown={handleSpeech} className="mic-button" type="button">
              <img alt="mic-icon" className="mic" src={mic} />
            </button>
          </div>
          <textarea
            onChange={(e) => setNoteContent(e.target.value)}
            type="text"
            name="noteContent"
            placeholder="Content"
            value={noteContent}
          />
          <Link to="/">
            <button className="button" onClick={sendDataApi} type="submit">
              Add
            </button>
          </Link>
          <Link to="/">
            <button className="button" type="submit">Back</button>
          </Link>
        </form>
      </motion.div>
  );
};

export default Create;
