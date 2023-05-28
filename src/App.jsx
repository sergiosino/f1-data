import { useEffect } from 'react'
import './app.css'
import GpCard from './components/GpCard/GpCard'
import { getAllSeasonGps } from './services/gpsService'
import { useState } from 'react'

function App() {

  const [gps, setGps] = useState([])

  useEffect(() => {
    getAllSeasonGps().then(setGps)
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
            {gps.map(({ id, round, image, name, circuitName, start, end, isCompleted, topThree }) => (
              <GpCard
                key={id}
                round={round}
                country={name}
                flag={image}
                name={circuitName}
                start={start}
                end={end}
                isCompleted={isCompleted}
                topThree={topThree}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
