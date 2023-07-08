// flag url + countryCode.png

const getCountryData = async () => {
  const url = "https://gist.githubusercontent.com/amitjambusaria/b9adebcb4f256eae3dfa64dc9f1cc2ef/raw/6431d72439c8399b05d2b8e9d51153e5dee7ad3b/countries.json"
  const flagUrl = `https://flagcdn.com/80x60/`

  const res = await fetch(url, { cache: "force-cache" })
  const data = await res.json()
  const countryData = data.map(country => {
    country.flag = flagUrl + country.code.toLowerCase() + ".png"
    return country
  })

  return countryData;
}

export default getCountryData;