
export async function getAllSeasonGps () {
    return fetch('https://f1-data-api.practice-app.workers.dev/gps')
    // return fetch('http://127.0.0.1:8787/gps')
        .then(response => response.json())
}