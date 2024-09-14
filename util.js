import fs from 'fs'

/**
 * Loads a JSON file from the given path.
 * @param {string} path The path to the JSON file.
 * @returns An object made from the JSON file.
 */
export const loadJSONFile = (path) => 
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString())