"use client";

import { useGlobalContext } from '@/context/app'
import React from 'react'
import { useRouter } from "next/navigation";
import { Card, Container, Image } from 'react-bootstrap';
import Background from "../component/background"

export default function EndGame() {
  const router = useRouter();
  const { score, setScore } = useGlobalContext();

  /**
   * @desc Restarts the game 
   */
  const restartGame = () => {
    setScore(0);
    router.push("/")
  }

  return (
    <main className='d-flex align-items-center justify-content-center flex-column h-100'>
      <Background />
      <h1 className='fw-bolder'>Country Quiz</h1>
      <Card className='mx-auto p-3 text-center'>
        <Image
          src="/undraw_winners_ao2o 2.svg"
          alt="."
          width="300"
          height="200"
          className="mb-2"
        />
        <Card.Title className='fw-bold mb-2'>Results</Card.Title>
        <Card.Text className="mb-4">You got <span className='show-score text-success fw-bold fs-5'>{score}</span> correct answers</Card.Text>
        <button onClick={restartGame} className='restart-game-btn py-2 mb-2 fw-bold'>Try again</button>
      </Card>
    </main>
  )
}
