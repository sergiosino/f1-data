import PropTypes from 'prop-types'
import { shortMonth, startEndDay } from '../../utils/formatDate'
import TopThreeDriver from './TopThreeDriver'
import './gpCard.css'

export default function GpCard(props) {
  const { round, country, flag, name, isCompleted, topThree, start, end } = props

  const date = startEndDay(start, end)
  const month = shortMonth(start)

  return (
    <fieldset className='race-border-container'>
      <legend>ROUND {round}</legend>
      <div className='mt-5'>
        <div className='event-info-date'>
          <div className='date-flag-container'>
            <h2>{date}</h2>
            <div className='flag-container'>
              <img src={`flags/${flag}`} alt='GP country flag' />
            </div>
          </div>
          <div className='mt-5'>
            <span className='font-f1 month-container'>
              {month}
            </span>
          </div>
        </div>
        <div className='event-info-description'>
          <h3>{country}<span className='color-red'>{' >'}</span></h3>
          <p>{name}</p>
        </div>
        {isCompleted && (
          <div className='event-info-top-3'>
            {topThree.map(({ rank, nameCode, image }) => {
              return (
                <TopThreeDriver key={rank} rank={rank} name={nameCode} image={image} />
              )
            })}
          </div>
        )}
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
  name: PropTypes.string,
  isCompleted: PropTypes.bool,
  topThree: PropTypes.array,
  start: PropTypes.string,
  end: PropTypes.string
}