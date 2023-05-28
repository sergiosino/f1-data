import PropTypes from 'prop-types'
import './TopThreeDriver.css'

export default function TopThreeDriver(props) {
    const { rank, name, image } = props

    return (
        <div className={`driver-result driver-position-${rank}`}>
            <img className='driver-result-image' src={`drivers/${image}`} alt='Driver third position' />
            <div className='driver-result-name-code'>
                <span className='font-f1-bold'>{name}</span>
            </div>
        </div>
    )
}

TopThreeDriver.propTypes = {
    rank: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string
}
