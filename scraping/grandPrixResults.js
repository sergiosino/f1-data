import { SCRAPE_URLS } from "./constants.js"
import { fetchGet, scrape } from "./utils.js"

const { BASE } = SCRAPE_URLS

async function getEventResult(url) {
    const $ = await scrape(url)

    const resultsEndpoint = $('.js-race-results').prop('data-feed')
    const urlResultsEndpoint = `${BASE}${resultsEndpoint}`
    const response = await fetchGet(urlResultsEndpoint)

    // Get the main info of the event results
    const results = response.results.map(driverResult => {
        const { driver, team, ...otherDriverInfo } = driverResult
        const { name: driverName, firstName, lastName, nameShort: driverNameShort, nameCode: driverNameCode, nationality } = driver
        const { name: teamName, nameShort: teamNameShort, nameCode: teamNameCode } = team
        
        return {
            ...otherDriverInfo,
            driver: { name: driverName, firstName, lastName, nameShort: driverNameShort, nameCode: driverNameCode, nationality },
            team: { name: teamName, nameShort: teamNameShort, nameCode: teamNameCode }
        }
    })

    return {
        results
    }
}

export async function getGrandPrixResults(gpId) {
    const { BASE, GRAND_PRIX_INFO } = SCRAPE_URLS
    const $ = await scrape(`${BASE}/${GRAND_PRIX_INFO}/${gpId}`)

    const $calendarList = $('.stats-header__calendar > li')
    const events = []
    for (const calendarElement of $calendarList) {
        const $calendarElement = $(calendarElement)

        const longName = $calendarElement.find('.stats-header__calendar-item__subevent--long').text()
        const shortName = $calendarElement.find('.stats-header__calendar-item__subevent--short').text()

        const eventResultsUrl = $calendarElement.find('.stats-header__calendar-item__link')?.prop('href')

        // Get the results if they are available
        if (eventResultsUrl) {
            const eventResults = await getEventResult(eventResultsUrl)
            events.push({
                longName,
                shortName,
                ...eventResults
            })
        }
    }

    // If exists a Race event, the gp is completed
    const isCompleted = !!events.find(event => event.shortName === 'Race')

    console.log(`The results for Grand Prix ${gpId} have been recovered`)
    return {
        id: gpId,
        isCompleted,
        events
    }
}