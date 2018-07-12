import React, { Component } from 'react'

type Props = {
  level: number
  label: string
}

const getStyle = (level: number) => {
  return {
    border: `2px solid ${colorMap[level]}`,
    padding: `0.5rem`,
    margin: `0.25rem`,
  }
}

const colorMap: { [key: number]: string } = {
  1: 'red',
  2: 'green',
  3: 'blue',
}
export class InjectorBoundary extends Component<Props> {
  render() {
    const { label, level, children } = this.props
    return (
      <section style={getStyle(level)}>
        <h3 style={{ backgroundColor: colorMap[level], margin: 0 }}>{label} Injector</h3>
        {children}
      </section>
    )
  }
}
