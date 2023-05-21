import { SCRAPE_URLS } from "./constants.js"
import { fetchGet, removeTabsAndNewLines, scrape } from "./utils.js"

const { BASE } = SCRAPE_URLS

async function getEventResult(url) {
    const $ = await scrape(url)

    const eventTitle = removeTabsAndNewLines($('.content-field__live > div > div > div > h3').text())
    const eventName = eventTitle.replace('Result ', '').split(' - ')[0]

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
        name: eventName,
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
        const eventResultsUrl = $calendarElement.find('.stats-header__calendar-item__link')?.prop('href')

        // Get the results if they are available
        if (eventResultsUrl) {
            const eventResults = await getEventResult(eventResultsUrl)
            events.push(eventResults)
        }
    }

    // If exists a Race event, the gp is completed
    const isCompleted = !!events.find(event => event.name === 'Race')

    return {
        id: gpId,
        isCompleted,
        events
    }
}