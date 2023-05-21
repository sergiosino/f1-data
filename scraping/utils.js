import * as cheerio from 'cheerio'
import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './database/')

export function capitalizeString(text) {
    const newText = text.trim()
    return newText.trim().charAt(0).toUpperCase() + newText.slice(1)
}

export function removeTabsAndNewLines(text) {
    return text.trim().replace(/[\t\n]/g, '')
}

export async function scrape(url) {
	const res = await fetch(url)
	const html = await res.text()
	return cheerio.load(html)
}

export async function writeDatabaseFile(dbName, data) {
	return await writeFile(`${DB_PATH}/${dbName}.json`, JSON.stringify(data, null, 2), 'utf-8')
}

export async function readDBFile(dbName) {
	return await readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse)
}

export async function fetchGet(url) {
    const response = await fetch(url)
    return await response.json()
}
