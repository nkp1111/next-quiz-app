"use client";

import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "@/context/app"
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function Home() {
  const router = useRouter();
  const { score, setScore } = useGlobalContext();
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [loading, setLoading] = useState(false);

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
          const { result } = data;
          // if correct answer
          // increase score 
          // stop loading allow answer selection
          // get next question
          if (result) {
            setScore(score + 1);
            setLoading(false);
            getQuestion();
          } else {
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
      <div>
        <h1>Country Quiz</h1>
        <hr />
        {questionType === "flag" ? (
          <div>
            <Image
              src={questionValue}
              alt="flag"
              width="80"
              height="60"
              loading="lazy"
            />
            <h3>{question}</h3>
          </div>
        ) : (
          <div>
            <h3><strong>{questionValue} </strong> {question}</h3>
          </div>
        )}
        <hr />
        {options.map((option, ind) => (
          <div key={ind} onClick={(e) => getAnswer(option)}>
            {["A", "B", "C", "D"][ind]} {option}
          </div>
        ))}

      </div>
    </main>
  )
}
