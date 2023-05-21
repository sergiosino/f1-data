export default function GpCard() {
    return (
        <fieldset className='race-border-container'>
            <legend>ROUND 1</legend>
            <div style={{ marginTop: 5 }}>
              <div className='event-info-date'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h2>03-05</h2>
                  <div style={{ width: 30, borderRadius: 3 }}>
                    <img src='flags/esp.png' alt='GP country flag' />
                  </div>
                </div>
                <div style={{ marginTop: 5 }}>
                  <span className='font-f1' style={{ background: 'black', color: 'white', padding: '2px 6px', borderRadius: 4 }}>Mar</span>
                </div>
              </div>
              <div className='event-info-description'>
                <h3>Spain <span style={{ color: '#e10600' }}>{'>'}</span></h3>
                <p>FORMULA 1 AWS GRAN PREMIO DE ESPAÑA 2023</p>
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
          </fieldset>
    )
}