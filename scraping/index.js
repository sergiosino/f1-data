import { getGrandsPrix } from './grandsPrix.js'
import { getGrandPrixInfo } from './grandPrixInfo.js'
import { getGrandPrixResults } from './grandPrixResults.js'
import { COMMAND_PARAMETERS, FILE_NAMES } from './constants.js'
import { readDBFile, writeDatabaseFile } from './utils.js'

const { GPS, GPS_INFO, GPS_RESULTS } = FILE_NAMES
const { ALL, REFRESH } = COMMAND_PARAMETERS

async function all() {
    const gps = await getGrandsPrix()
    writeDatabaseFile(GPS, gps)

    const gpsInfo = []
    const gpsResults = []
    for (const gp of gps) {
        const { id } = gp

        const gpInfo = await getGrandPrixInfo(id)
        gpsInfo.push(gpInfo)

        const gpResults = await getGrandPrixResults(id)
        gpsResults.push(gpResults)
    }
    writeDatabaseFile(GPS_INFO, gpsInfo)
    writeDatabaseFile(GPS_RESULTS, gpsResults)
}

async function refresh() {
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

    writeDatabaseFile(GPS_RESULTS, updatedGpsResults)
}

// Get first param
const param = process.argv.at(-1)
if (param === ALL) { all() }
else if (param === REFRESH) { refresh() }
