
export async function getAllSeasonGps () {
    return fetch('https://f1-data-api.practice-app.workers.dev/gps')
        .then(response => response.json())
}