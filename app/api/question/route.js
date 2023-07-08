import getCountryData from "@/lib/getCountryData";
import { NextResponse } from 'next/server';

/**
 * @desc Get a random number between 0 and n(not included).
 * @param {Number} n 
 * @returns 
 */
const getRandomNumber = (n) => Math.floor(Math.random() * n);


/**
 * @desc get question for quiz game
 * @method GET /api/question
 * @returns 
 */
export async function GET() {
  const countryData = await getCountryData();

  // choose 4 random options (index only)
  const optionInd = [];
  while (optionInd.length < 4) {
    const ind = getRandomNumber(countryData.length);
    if (!optionInd.includes(ind)) {
      optionInd.push(ind);
    }
  }

  // options for game (country name)
  const options = optionInd.map(option => countryData[option].name)

  // get type of question 
  const questionType = ["capital", "currency", "flag"]
  const questionTypeToAsk = questionType[getRandomNumber(3)]

  // pick one option to be correct (among 4 random options)
  const questionInd = optionInd[getRandomNumber(4)]

  // get question for chosen correct option
  let questionValue;
  let question;
  switch (questionTypeToAsk) {
    case "capital":
      question = "capital of which country?"
      questionValue = countryData[questionInd].capital;
      break;
    case "currency":
      question = "currency of which country?"
      questionValue = countryData[questionInd].currency.name;
      break;
    case "flag":
      question = "Which country does this flag belong to?"
      questionValue = countryData[questionInd].flag;
      break;
    default:
      questionValue = null;
  }

  return NextResponse.json({
    options,
    question,
    questionValue,
    answer: countryData[questionInd].name
  })
}
