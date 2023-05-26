import PropTypes from 'prop-types'

export default function GpCard(props) {
  const { round, dayMonthNumber, monthShort, country, flag, name } = props

  return (
    <fieldset className='race-border-container'>
      <legend>ROUND {round}</legend>
      <div className='mt-5'>
        <div className='event-info-date'>
          <div className='date-flag-container'>
            <h2>{dayMonthNumber}</h2>
            <div className='flag-container'>
              <img src={`flags/${flag}`} alt='GP country flag' />
            </div>
          </div>
          <div className='mt-5'>
            <span className='font-f1' style={{ background: 'black', color: 'white', padding: '2px 6px', borderRadius: 4 }}>{monthShort}</span>
          </div>
        </div>
        <div className='event-info-description'>
          <h3>{country}<span className='color-red'>{' >'}</span></h3>
          <p>{name}</p>
        </div>
        <div className='event-info-top-3'>
          <div className='driver-result driver-position-1'>
            <img className='driver-result-image' src='drivers/alo.avif' alt='Driver third position' />
            <div className='driver-result-name-code'>
              <span className='font-f1-bold'>ALO</span>
            </div>
          </div>
          <div className='driver-result driver-position-2'>
            <img className='driver-result-image' src='drivers/ver.avif' alt='Driver first position' />
            <div className='driver-result-name-code'>
              <span className='font-f1-bold'>VER</span>
            </div>
          </div>
          <div className='driver-result driver-position-3'>
            <img className='driver-result-image' src='drivers/per.avif' alt='Driver second position' />
            <div className='driver-result-name-code'>
              <span className='font-f1-bold'>PER</span>
            </div>
          </div>
        </div>
      </div>
    </fieldset >
  )
}

GpCard.propTypes = {
  round: PropTypes.number,
  dayMonthNumber: PropTypes.string,
  monthShort: PropTypes.string,
  country: PropTypes.string,
  flag: PropTypes.string,
  name: PropTypes.string
}