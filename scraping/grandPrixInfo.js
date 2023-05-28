import { SCRAPE_URLS } from "./constants.js"
import { removeTabsAndNewLines, scrape } from "./utils.js"

const { BASE, GRAND_PRIX_INFO } = SCRAPE_URLS

export async function getGrandPrixInfo(gpId) {
    const $ = await scrape(`${BASE}/${GRAND_PRIX_INFO}/${gpId}`)

    // Gp calendar
    const $calendarList = $('.stats-header__calendar > li')
    const calendar = []
    $calendarList.each((eventIndex, calendarElement) => {
        const $calendarElement = $(calendarElement)

        const shortName = $calendarElement.find('.stats-header__calendar-item__subevent--short').text()
        const longName = $calendarElement.find('.stats-header__calendar-item__subevent--long').text()

        const $timetableRows = $('.table-default--expanded > tbody > tr')
        const startEnd = []
        $timetableRows.each((timeTableRowIndex, eventRow) => {
            if (timeTableRowIndex > eventIndex) return
            const $eventRow = $(eventRow)

            const $times = $eventRow.find('td > time')
            $times.each((timeIndex, time) => {
                const $time = $(time)
                startEnd[timeIndex] = $time.prop('datetime')
            })
        })

        calendar.push({
            shortName,
            longName,
            start: new Date(startEnd[0]).toUTCString(),
            end: new Date(startEnd[1]).toUTCString()
        })
    })

    const $panels = $('.panel')
    let stats = null
    $panels.each((_, panel) => {
        const $panel = $(panel)

        const panelTitle = removeTabsAndNewLines($panel.find('.panel__header__title').text())
        // Gp stats
        if (panelTitle.includes('Stats')) {
            const $tableRows = $panel.find('tbody > tr')
            let statsRows = []
            $tableRows.each((rowIndex, row) => {
                if (rowIndex > 3) return
                const $row = $(row)

                statsRows[rowIndex] = $row.find('.table__text--primary').text()
            })

            stats = {
                firstHeld: statsRows[0],
                laps: statsRows[1],
                circuitLength: statsRows[2],
                fastestRaceLap: statsRows[3],
            }
        }
    })

    console.log(`The information for Grand Prix ${gpId} has been recovered`)
    return {
        id: gpId,
        calendar,
        stats
    }
}
