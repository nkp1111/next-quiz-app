import redisClient from "@/config/redis"

/**
 * 
 * @returns get country data from redis
 */
const getDataFromRedis = () => {
  return new Promise((resolve, reject) => {
    redisClient.get("countryData", (err, result) => {
      if (err) {
        reject(err);
      }
      // console.log('get redis data');
      resolve(JSON.parse(result));
    })
  })
}


/**
 * 
 * @param {ARRAY} data - set data to redis 
 */
const setDataIntoRedis = (data) => {
  // console.log('set redis data')
  redisClient.set("countryData", JSON.stringify(data));
}

export {
  setDataIntoRedis,
  getDataFromRedis,
}