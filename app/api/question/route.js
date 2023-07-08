import getCountryData from "@/lib/getCountryData";
import { NextResponse } from 'next/server';


const getRandomNumber = (n) => Math.floor(Math.random() * n)

export async function GET() {
  const countryData = await getCountryData();
  const optionInd = [];
  while (optionInd.length < 4) {
    const ind = getRandomNumber(countryData.length);
    if (!optionInd.includes(ind)) {
      optionInd.push(ind);
    }
  }

  // options for game
  const options = optionInd.map(option => countryData[option].name)

  // type of question 
  const questionType = ["capital", "currency", "flag"]
  const questionTypeToAsk = questionType[getRandomNumber(3)]

  // get country data index
  const questionInd = optionInd[getRandomNumber(4)]

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

  return NextResponse.json({ options, question, questionValue })
}
