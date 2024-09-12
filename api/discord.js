import { BOT_TOKEN } from '../config.json'

/**
 * API host name.
 */
const HOSTNAME = 'https://discord.com/api'

/**
 * Headers of the requests.
 */
const HEADERS = new Headers()
HEADERS.append('Authorization', `Bot ${BOT_TOKEN}`)
HEADERS.append('Content-Type', 'application/json')

/**
 * Sends a GET request at the given route of the HOSTNAME and returns the response.
 * @param route The route to send the request to.
 * @returns The request response.
 */
async function get(route) {
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
    responseData = data;
  })
  return responseData;
}

async function patch(route, body) {
  let responseData = await fetch(
    HOSTNAME + route, 
    {
      method: 'PATCH',
      headers: HEADERS,
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(body)
    }
  )
  return responseData
}

export default {
  get, 
  patch
}