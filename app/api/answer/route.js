import getCountryData from '@/lib/getCountryData';
import { NextResponse } from 'next/server'


/**
 * @desc checks whether answer is correct or not
 * @param {} request - request body contains metadata 
 * @param {answer, questionType, questionValue} 
 * @returns {result}
 */
export async function POST(request) {
  const { answer, questionType, questionValue } = await request.json();
  const countryData = await getCountryData();
  let result = false;

  for (let country of countryData) {
    if (country.name === answer) {
      console.log(country, questionValue)
      if (questionType === "flag" && questionValue === country.flag) result = true;
      if (questionType === "currency" && questionValue === country.currency.name) result = true;
      if (questionType === "capital" && questionValue === country.capital) result = true;
    }
  }

  return NextResponse.json({ result });
}
