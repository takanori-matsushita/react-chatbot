import { useState, useEffect } from "react";
import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import { AnswersList } from "./components";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState(defaultDataset);
  const [open, setOpen] = useState(false);

  const initAnswer = () => {
    const initDataset = dataset[currentId]
    const initAnswers = initDataset.answers
    setAnswers(initAnswers)
  }

  useEffect(() => {
    initAnswer()
  })

  return (
    <div>
      <section className="c-section">
        <div className="c-box">
          <AnswersList answers={answers}/>
        </div>
      </section>
    </div>
  );
};

export default App;
