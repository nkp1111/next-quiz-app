import getCountryData from '@/lib/getCountryData';
import { NextResponse } from 'next/server';


/**
 * @desc checks whether answer is correct or not
 * @param {} request - request body contains metadata 
 * @param {answer, questionType, questionValue} 
 * @returns {result}
 */
export async function POST(request) {
  const { answer, questionType, questionValue } = await request.json();

  let countryData = await getCountryData();

  let result = false;
  let correctAnswer;

  for (let country of countryData) {
    if (questionValue === country[questionType]
      || questionValue === country[questionType]["name"]) {
      if (country.name === answer) {
        result = true;
      }
      correctAnswer = country.name;
    }
  }

  return NextResponse.json({ result, correctAnswer });
}
