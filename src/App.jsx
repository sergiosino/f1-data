import { useEffect } from 'react'
import './app.css'
import GpCard from './components/GpCard'
import { getAllSeasonGps } from './services/gpsService'
import { useState } from 'react'

function App() {

  const [gps, setGps] = useState([])
  console.log(gps)

  useEffect(() => {
    getAllSeasonGps()
      .then(gps => setGps(gps))
  }, [])

  return (
    <>
      <header>
        <div className="header">
          <img className='f1-logo' src='f1_logo.svg' alt='Formula 1' />
        </div>
      </header>
      <main>
        <section>
          <div className='title-border-container'>
            <h1>F1 Schedule 2023</h1>
            <p>2023 FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
          </div>
        </section>
        <section>
          <div className='gps'>
            {gps.map((gp, index) => {
              const round = index + 1
              const { circuitName, day, gpImage, id, month } = gp

              return (
                <GpCard
                  key={id}
                  round={round}
                  dayMonthNumber={day}
                  monthShort={month}
                  country='Country'
                  flag={gpImage}
                  name={circuitName}
                />
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
