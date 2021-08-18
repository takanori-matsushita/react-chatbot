import { useState, useEffect, useCallback } from "react";
import "./assets/styles/style.css";
import { AnswersList, Chats } from "./components";
import FormDialog from "./components/Forms/FormDialog"
import { db } from "./firebase/config"

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const addChats = (chat) => {
    setChats(prevChats => [...prevChats, chat])
  }

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: "question",
    })
    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'contact'):
        handleClickOpen()
        break
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a')
        a.href = nextQuestionId
        a.target = '_blank'
        a.click()
        break
      default:
        addChats({
          text: selectedAnswer,
          type: "answer",
        })
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500)
        break
    }
  }

  useEffect(() => {
    (async () => {
      const initDataset = {}
      const snapshots = await db.collection('questions').get()
      snapshots.forEach((doc) => {
        initDataset[doc.id] = doc.data()
      })
      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area")
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <div>
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats} />
          <AnswersList answers={answers} select={selectAnswer} />
          <FormDialog open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
        </div>
      </section>
    </div>
  );
};

export default App;
