import React, { Component } from 'react'
import { Card } from './02'

export class Demo extends Component<{}, { renderCount: number }> {
  state = {
    renderCount: 0,
  }
  /**
   *  extract projected content so we don't create new VDom object on every render
   *
   * **NOTE: **
   * - This will be called on every render, as getters are lazy but dynamic.
   * - Also this will properly render updated state
   */
  private get cardSlots(): import('./02').Props['children'] {
    console.log('get invoked')
    return {
      content: (
        <>
          <p>The Shiba Inu is the smallest of ...</p>
          <code>count: {this.state.renderCount}</code>
        </>
      ),
    }
  }

  /**
   * **Note:**
   *
   * This will be called only once BUT! state changes won't be reflected as this is one time set operation
   * Use this wisely !
   */
  // private cardSlots: import('./02').Props['children'] = {
  //   content: (
  //     <>
  //       <p>The Shiba Inu is the smallest of ...</p>
  //       <code>count: {this.state.renderCount}</code>
  //     </>
  //   ),
  // }
  render() {
    return (
      <>
        <button onClick={this.forceRender}>trigger re render</button>
        <Card>{this.cardSlots}</Card>
      </>
    )
  }
  private forceRender = () => {
    this.setState((prevState) => ({ renderCount: prevState.renderCount + 1 }))
  }
}
