import { SCRAPE_URLS } from './constants.js'
import { scrape } from './utils.js'

const { BASE, GRANDS_PRIX_CALENDAR } = SCRAPE_URLS

export async function getGrandsPrix() {
    console.log('Retrieving the list of Grand Prix races')
    const $ = await scrape(`${BASE}/${GRANDS_PRIX_CALENDAR}`)

    const $tableRows = $('.table-default--calendar > tbody > tr')
    const gps = []
    let round = 1
    for (const tableRow of $tableRows) {
        const $tableRow = $(tableRow)

        const id = $tableRow.prop('data-href').split('/').reverse()[0]
        const image = $tableRow.find('.table__text--primary > img').prop('src').split('/').reverse()[0]
        const name = $tableRow.find('.table__text--primary > strong').text()
        const circuitName = $tableRow.find('td > .table__text--secondary').text()

        gps.push({
            id,
            round: round++,
            image,
            name,
            circuitName,
        })
    }

    console.log(`A total of ${gps.length} Grand Prix races have been recovered`)
    return gps
}
