import { useState, useEffect } from "react";
import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import { AnswersList, Chats } from "./components";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const dataset = defaultDataset
  // const [dataset, setDataset] = useState(defaultDataset);
  // const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId) => {
    const chat = {
      text: dataset[nextQuestionId].question,
      type: "question",
    }
    setAnswers(dataset[nextQuestionId].answers)
    setChats(prevChats => [...prevChats, chat])
    setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        displayNextQuestion(nextQuestionId)
        break
      default:
        const chat = {
          text: selectedAnswer,
          type: "answer",
        }
        setChats(prevChats => [...prevChats, chat])
        displayNextQuestion(nextQuestionId)
        break
    }
  }

  useEffect(() => {
    const initAnswer = ""
    selectAnswer(initAnswer, currentId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats} />
          <AnswersList answers={answers} select={selectAnswer} />
        </div>
      </section>
    </div>
  );
};

export default App;
