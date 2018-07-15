import React, { Component, ErrorInfo } from 'react'

import { Card } from './01'
import { Card as Card2 } from './02'
import { Card as Card2AlternativeAPI } from './02-alternative-api'
import { Card as Card3 } from './03'
import { Toggle } from './04'
import { Toggle as FinalToggle } from './05'
import { Toggle as FinalToggleXor } from './05-bonus'

import { Button } from './button'
import { Switch } from './switch'

export class Demo extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
  }
  render() {
    return (
      <>
        <section>
          <h3>01.</h3>
          <Card>Simple Card</Card>
          {/* <Card /> */}
        </section>

        <section>
          <h3>02.</h3>

          <Card2>
            {{
              header: 'Shiba Inu',
              media: <img src="https://material.angular.io/assets/img/examples/shiba2.jpg" />,
              content: (
                <p>
                  The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
                  from Japan.
                </p>
              ),
              actions: (
                <>
                  <Button>Like</Button>
                  <Button>Share</Button>
                </>
              ),
            }}
          </Card2>
        </section>

        <section>
          <h3>02. alternative API</h3>

          <Card2AlternativeAPI
            header="Hello World"
            media={<img src="..." />}
            actions={
              <>
                <Button>Like</Button>
                <Button>Share</Button>
              </>
            }
          >
            <p>The Shiba Inu is the smallest of ...</p>
          </Card2AlternativeAPI>
        </section>

        <section>
          <h3>03.</h3>

          {/* compile erorr */}
          {/* <Card3/> */}

          <Card3>Simple Card</Card3>

          <Card3>
            {{
              header: 'Shiba Inu',
              content: (
                <p>
                  The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
                  from Japan.
                </p>
              ),
            }}
          </Card3>

          <Card3>
            {{
              header: 'Shiba Inu',
              media: <img src="https://material.angular.io/assets/img/examples/shiba2.jpg" />,
              content: (
                <p>
                  The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
                  from Japan.
                </p>
              ),
              actions: (
                <>
                  <Button>Like</Button>
                  <Button>Share</Button>
                </>
              ),
            }}
          </Card3>
        </section>

        <section>
          <h3>04.</h3>
          <Toggle onToggle={(...args: any[]) => console.log('onToggle', ...args)}>
            {({ on, toggle }) => (
              <div>
                {on ? 'The button is on' : 'The button is off'}
                <hr />
                <Switch on={on} onClick={toggle} />
                <hr />
                <button onClick={toggle}>{on ? 'on' : 'off'}</button>
              </div>
            )}
          </Toggle>
        </section>

        <section>
          <h3>05.</h3>

          <FinalToggle
            onToggle={(value) => console.log('onToggle', value)}
            render={({ on, toggle }) => <button onClick={toggle}>{on ? 'on' : 'off'}</button>}
          />

          <FinalToggle onToggle={(value) => console.log('onToggle', value)}>
            {({ on, toggle }) => <button onClick={toggle}>{on ? 'on' : 'off'}</button>}
          </FinalToggle>

          {/* No compile erorrs when both render and children are used */}
          <FinalToggle
            onToggle={(value) => console.log('onToggle', value)}
            render={({ on, toggle }) => <button onClick={toggle}>{on ? 'on' : 'off'}</button>}
          >
            {({ on, toggle }) => <button onClick={toggle}>{on ? 'on' : 'off'}</button>}
          </FinalToggle>

          <FinalToggle onToggle={(value) => console.log('onToggle', value)}>
            {({ on, toggle }) => (
              <div>
                {on ? 'The button is on' : 'The button is off'}
                <hr />
                <Switch on={on} onClick={toggle} />
                <hr />
                <button onClick={toggle}>{on ? 'on' : 'off'}</button>
              </div>
            )}
          </FinalToggle>
        </section>

        <section>
          <h3>05-Extra</h3>

          <FinalToggleXor
            onToggle={(value) => console.log('onToggle', value)}
            render={({ on, toggle }) => <button onClick={toggle}>{on ? 'on' : 'off'}</button>}
          />

          <FinalToggleXor onToggle={(value) => console.log('onToggle', value)}>
            {({ on, toggle }) => <button onClick={toggle}>{on ? 'on' : 'off'}</button>}
          </FinalToggleXor>

          {/* Compile erorrs when both render and children are used */}
          {/* <FinalToggleXor
            onToggle={(value) => console.log('onToggle', value)}
            render={({ on, toggle }) => (
              <button onClick={toggle}>{on ? 'on' : 'off'}</button>
            )}
          >
            {({ on, toggle }) => (
              <button onClick={toggle}>{on ? 'on' : 'off'}</button>
            )}
          </FinalToggleXor> */}
        </section>
      </>
    )
  }
}

/* const App = () => {
  return (
    <div>
      <h4>Toggle Demo</h4>
      <Toggle onToggle={(value) => console.log('toggle is:', value)}>
        {({ on, toggle }) => (
          <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
        )}
      </Toggle>
    </div>
  )
}
 */
