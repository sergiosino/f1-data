import './app.css'
import GpCard from './components/GpCard'

function App() {

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
          <GpCard />
          <GpCard />
          <GpCard />
        </section>
      </main>
    </>
  )
}

export default App
