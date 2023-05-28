import { SCRAPE_URLS } from './constants.js'
import { scrape } from './utils.js'

const { BASE, GRANDS_PRIX_CALENDAR } = SCRAPE_URLS

export async function getGrandsPrix() {
    console.log('Retrieving the list of Grand Prix races')
    const $ = await scrape(`${BASE}/${GRANDS_PRIX_CALENDAR}`)

    const $tableRows = $('.table-default--calendar > tbody > tr')
    const gps = []
    for (const tableRow of $tableRows) {
        const $tableRow = $(tableRow)

        const gpId = $tableRow.prop('data-href').split('/').reverse()[0]
        const gpImage = $tableRow.find('.table__text--primary > img').prop('src').split('/').reverse()[0]
        const gpName = $tableRow.find('.table__text--primary > strong').text()
        const circuitName = $tableRow.find('td > .table__text--secondary').text()
        const date = $tableRow.find('.table__text--date > .table__text--primary').text().split(' ')
        const day = date[0]
        const month = date[1]

        gps.push({
            id: gpId,
            gpImage,
            gpName,
            circuitName,
            day,
            month
        })
    }

    console.log(`A total of ${gps.length} Grand Prix races have been recovered`)
    return gps
}
