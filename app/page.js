"use client";

import React, { Suspense, useEffect, useState } from 'react'
import { useGlobalContext } from "@/context/app"
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { Button, Card } from 'react-bootstrap';
import Background from "./component/background"


export default function Home() {
  const router = useRouter();
  const { score, setScore } = useGlobalContext();
  const [options, setOptions] = useState(["", "", "", ""]);
  const [question, setQuestion] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [endgame, setEndgame] = useState(false);

  /**
   * @desc get question from api
   * @method GET /api/question
   */
  const getQuestion = () => {
    fetch("/api/question", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Vary": "*",
      }
    })
      .then(res => res.json())
      .then(data => {
        const { options: newOptions, question: newQuestion, questionValue: newQuestionValue } = data;
        setOptions(newOptions)
        setQuestion(newQuestion)
        setQuestionValue(newQuestionValue)

        setAnswer("")
        setCorrectAnswer([])
        setLoading(false);

        if (newQuestion.includes("flag")) {
          setQuestionType("flag");
        } else if (newQuestion.includes("currency")) {
          setQuestionType("currency");
        } else if (newQuestion.includes("capital")) {
          setQuestionType("capital");
        }
      })
  }

  /**
   * @desc get result after each answer
   * @method POST /api/answer
   * @param {String} option - option selected by player 
   */
  const getAnswer = (optionChosen) => {
    if (!loading) {
      setLoading(true);
      setAnswer(optionChosen);
      fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: optionChosen,
          questionType,
          questionValue,
        })
      })
        .then(res => res.json())
        .then(data => {
          const { result, correctAnswers: answerC } = data;
          // if correct answer
          // set correct answer, increase score
          // else start end game 
          setCorrectAnswer(answerC);
          if (result) {
            setScore(score + 1);
          } else {
            setEndgame(true);
          }
        })
    }
  }

  const handleGame = () => {
    if (endgame) {
      router.push("/endgame");
    } else {
      getQuestion();
    }
  }

  useEffect(() => {
    // get first question
    getQuestion();
  }, [])

  return (
    <main>
      <Background />
      <h1 className='text-center mt-5 fw-bolder'>Country Quiz</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Card className='m-auto px-3'>
          <Card.Header className='position-relative border-0 py-2'>
            {questionType === "flag" ? (
              <div className='question'>
                <Image
                  src={questionValue}
                  alt="flag"
                  width="80"
                  height="60"
                  loading="lazy"
                  className='mb-3'
                />
                <Card.Title className='fw-bold'>{question}</Card.Title>
              </div>
            ) : (
              <div className='question'>
                <Card.Title className='fw-bold'><strong>{questionValue}</strong> {question}</Card.Title>
              </div>
            )}

            <div className='card-img-holder'>
              <Image
                src="/undraw_adventure_4hum 1.svg"
                alt="."
                width="200"
                height="100"
              />
            </div>
          </Card.Header>
          <Card.Body className='py-3'>
            {options.map((option, ind) => (
              <div key={ind} onClick={() => getAnswer(option)}
                className={`mb-3 py-2 px-3 d-flex option ${!loading && 'option-hover'}
              ${correctAnswer?.length > 0 && !correctAnswer.includes(answer) && option === answer && "incorrect-option"}
              ${correctAnswer?.length > 0 && correctAnswer.includes(option) && "correct-option"}
              `}
              >
                <strong className='d-block me-3'>{["A", "B", "C", "D"][ind]}</strong> {option}
              </div>
            ))}

            <Button className='next-btn my-2 ms-auto d-block px-4 py-2'
              onClick={handleGame}
              disabled={!loading}>Next</Button>
          </Card.Body>
        </Card>
      </Suspense>
    </main>
  )
}
