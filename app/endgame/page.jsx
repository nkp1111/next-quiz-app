"use client";

import { useGlobalContext } from '@/context/app'
import React from 'react'
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Final Score: {score}</h1>
      <button onClick={restartGame}>Start again?</button>
    </div>
  )
}
