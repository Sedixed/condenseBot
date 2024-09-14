import { loadJSONFile } from '../util.js'

const config = loadJSONFile('config.json')

/**
 * API host name.
 */
const HOSTNAME = 'https://discord.com/api'

/**
 * Headers of the requests.
 */
const HEADERS = new Headers()
HEADERS.append('Authorization', `Bot ${config.BOT_TOKEN}`)
HEADERS.append('Content-Type', 'application/json')

/**
 * Sends a GET request at the given route of the HOSTNAME and returns the response.
 * @param route The route to send the request to.
 * @returns The request response.
 */
export const get = async (route) => {
  let responseData = ''
  await fetch(
    HOSTNAME + route, 
    {
      method: 'GET',
      headers: HEADERS,
      mode: 'cors',
      cache: 'default'
    }
  ).then(
    response => response.json()
  ).then(data => {
    responseData = data
  })
  return responseData
}