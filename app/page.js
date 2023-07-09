"use client";

import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "@/context/app"
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { Button, Card } from 'react-bootstrap';

export default function Home() {
  const router = useRouter();
  const { score, setScore } = useGlobalContext();
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  /**
   * @desc get question from api
   * @method GET /api/question
   */
  const getQuestion = () => {
    fetch("/api/question")
      .then(res => res.json())
      .then(data => {
        const { options, question, questionValue, answer } = data;
        setOptions(options)
        setQuestion(question)
        setQuestionValue(questionValue)
        console.log(answer);

        if (question.includes("flag")) {
          setQuestionType("flag");
        } else if (question.includes("currency")) {
          setQuestionType("currency");
        } else if (question.includes("capital")) {
          setQuestionType("capital");
        }
      })
  }

  /**
   * @desc get result after each answer
   * @method POST /api/answer
   * @param {String} option - option selected by player 
   */
  const getAnswer = (option) => {
    if (!loading) {
      setLoading(true);
      fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: option,
          questionType,
          questionValue,
        })
      })
        .then(res => res.json())
        .then(data => {
          const { result, correctAnswer: answer } = data;
          // if correct answer
          // increase score 
          // stop loading allow answer selection
          // get next question
          if (result) {
            setScore(score + 1);
            setLoading(false);
            getQuestion();
          } else {
            setCorrectAnswer(answer);
            // if answer is incorrect
            // redirect to endgame page
            router.push("/endgame");
          }
        })
    }
  }

  useEffect(() => {
    // get first question
    getQuestion();
  }, [])

  return (
    <main>
      {/* background image  */}
      <div className='bg-img-holder'>
        <Image
          src="/background.png"
          alt="background"
          width="1550"
          height="960"
        />
      </div>
      <h1 className='text-center mt-5 fw-bolder'>Country Quiz</h1>
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
          {/* <Image
            src="/undraw_winners_ao2o 2.svg"
            alt="."
            width="300"
            height="200"
          /> */}
        </Card.Header>
        <Card.Body className='py-3'>
          {options.map((option, ind) => (
            <div key={ind} onClick={(e) => getAnswer(option)}
              className={`mb-3 py-2 px-3 d-flex option`}>
              <strong className='d-block me-3'>{["A", "B", "C", "D"][ind]}</strong> {option}
            </div>
          ))}

          <Button className='next-btn my-2 ms-auto d-block px-4 py-2'>Next</Button>
        </Card.Body>
      </Card>
    </main>
  )
}
