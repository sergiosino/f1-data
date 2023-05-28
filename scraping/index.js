import { getGrandsPrix } from './grandsPrix.js'
import { getGrandPrixInfo } from './grandPrixInfo.js'
import { getGrandPrixResults } from './grandPrixResults.js'
import { COMMAND_PARAMETERS, FILE_NAMES } from './constants.js'
import { readDBFile, writeDatabaseFile } from './utils.js'

const { GPS, GPS_INFO, GPS_RESULTS } = FILE_NAMES
const { ALL, REFRESH } = COMMAND_PARAMETERS

async function all() {
    console.log('The recovery of all data has begun')
    const gps = await getGrandsPrix()

    const gpsInfo = []
    const gpsResults = []
    for (const gp of gps) {
        const { id } = gp

        const gpInfo = await getGrandPrixInfo(id)
        gpsInfo.push(gpInfo)

        const gpResults = await getGrandPrixResults(id)
        gpsResults.push(gpResults)
    }
    
    console.log('The recovery of all data has been completed, and it will be saved in JSON files')
    writeDatabaseFile(GPS, gps)
    writeDatabaseFile(GPS_INFO, gpsInfo)
    writeDatabaseFile(GPS_RESULTS, gpsResults)
    console.log('Process completed')
}

async function refresh() {
    console.log('The data refresh process has begun')
    const gpsResults = await readDBFile(GPS_RESULTS)
    const updatedGpsResults = []

    for (const gpResults of gpsResults) {
        const { id, isCompleted } = gpResults
        let updatedGpResults = { ...gpResults }

        // If the gp is not completed, update the results info
        if (!isCompleted) {
            const updatedGrandPrixResults = await getGrandPrixResults(id)
            updatedGpResults = updatedGrandPrixResults
        }

        updatedGpsResults.push(updatedGpResults)
    }

    console.log('The data refresh process has been completed, and it will be saved in JSON files')
    writeDatabaseFile(GPS_RESULTS, updatedGpsResults)
    console.log('Process completed')
}

// Get first param
const param = process.argv.at(-1)
if (param === ALL) { all() }
else if (param === REFRESH) { refresh() }
