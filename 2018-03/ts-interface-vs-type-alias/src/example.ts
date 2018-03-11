type Alias = { num: number }
interface Interface {
  num: number
}
declare function aliased(arg: Alias): Alias
declare function interfaced(arg: Interface): Interface

////

interface PointInterface {
  x: number
  y: number
}

type PointType = {
  x: number
  y: number
}

const getRectangleAreaInterface = (args: PointInterface) => args.x * args.y
const getRectangleAreaAliased = (args: PointType) => args.x * args.y

// TS >=2.0.x
// Argument of type '{ x: number; }' is not assignable to parameter of type 'PointInterface'. Property 'y' is missing in type '{ x: number; }'.
getRectangleAreaInterface({ x: 12 })
// TS 2.0.x
// Argument of type '{ x: number; }' is not assignable to parameter of type '{ x: number; y: number; }'. Property 'y' is missing in type '{ x: number; }'.
// TS >=2.1
// Argument of type '{ x: number; }' is not assignable to parameter of type 'PointType'. Property 'y' is missing in type '{ x: number; }'.
getRectangleAreaAliased({ x: 12 })

////
// extending, implementing with type alias
// interface ThreeDimesions extends PointInterface {
interface ThreeDimesions extends PointType {
  z: number
}
// const xyPoint: PointInterface = {}

const xyzPoint: ThreeDimesions = {
  x: 1,
  y: 2,
  z: 3,
}

class Rectangle implements PointType {
  x = 2
  y = 4
}

class RectanglePrism implements ThreeDimesions {
  x = 2
  y = 3
  z = 4
}
{
  interface Shape {
    area(): number
  }
  type Perimeter = {
    perimiter(): number
  }
  class Rectangle implements PointType, Shape, Perimeter {
    x = 2
    y = 3
    area() {
      return this.x * this.y
    }
    perimiter() {
      return 2 * (this.x + this.y)
    }
  }
}
////
{
  class Point {
    x: number
    y: number
  }
  interface Shape {
    area(): number
  }
  type Perimeter = {
    perimiter(): number
  }

  type RectangleShape = Shape & Perimeter & Point

  class Rectangle implements RectangleShape {
    x = 2
    y = 3
    area() {
      return this.x * this.y
    }
    perimiter() {
      return 2 * (this.x + this.y)
    }
  }
}

{
  class Point {
    x: number
    y: number
  }
  interface Shape {
    area(): number
  }
  type Perimeter = {
    perimiter(): number
  }

  type RectangleShape = Partial<Shape & Perimeter> & Point

  class PartialRectangle implements RectangleShape {
    x = 2
    y = 3
    area() {
      return 12
    }
  }
  //
  //
  //

  const rectangle: RectangleShape = {
    x: 12,
    y: 133,
    areeeea() {
      return 123
    },
    // perimiter() {
    //   return 123
    // },
  }
}

{
  class Point {
    x: number
    y: number
  }
  interface Shape {
    area(): number
  }
  type Perimeter = {
    perimiter(): number
  }
  type RectangleShape = (Shape | Perimeter) & Point
  // type ShapeOrPerimeter = Shape | Perimeter
  // interface RectangleShape extends ShapeOrPerimeter, Point {}

  class Rectangle implements RectangleShape {
    x = 2
    y = 3
    area() {
      return this.x * this.y
    }
  }

  const rectangle: RectangleShape = {
    x: 12,
    y: 133,
    perimiter() {
      return 2 * (rectangle.x + rectangle.y)
    },
    area() {
      return rectangle.x * rectangle.y
    },
  }

  //
  //
  {
    // Declaration merging
    interface Box {
      height: number
      width: number
    }

    interface Box {
      scale: number
    }

    const box: Box = { height: 5, width: 6, scale: 10 }
  }

  {
    // Declaration merging NOPE!
    type Box = {
      height: number
      width: number
    }
    type Box = {
      scale: number
    }
    const box: Box = { height: 5, width: 6, scale: 10 }
  }

  // Hybrid types
  {
    interface Counter {
      (start: number): string
      interval: number
      reset(): void
    }

    const getCounter = () => {
      const counter = ((start: number) => {}) as Counter
      counter.interval = 123
      counter.reset = function() {}
      return counter
    }

    const callable = getCounter()
    callable(10)
    callable.reset()
    callable.interval = 5.0
  }

  {
    type CounterFn = (start: number) => string
    // via interface
    // interface CounterFn {
    //   (start: number): string
    // }
    // type Constructable = new (start: number) => string
    type CounterStatic = {
      interval: number
      reset(): void
    }
    // via interface
    // interface CounterStatic {
    //   interval: number
    //   reset(): void
    // }
    // type Counter = CounterFn & CounterStatic
    interface Counter extends CounterStatic, CounterFn {}

    const getCounter = () => {
      const counter = ((start: number) => {}) as Counter
      counter.interval = 123
      counter.reset = function() {}
      return counter
    }

    const callable = getCounter()
    callable(10)
    callable.reset()
    callable.interval = 5.0
  }
}
////

type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // error! should not pass null or undefined.
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
// ERROR
// TS >=2.1
// Argument of type '"uneasy"' is not assignable to parameter of type 'Easing'.
// TS 2.0.0
// Argument of type '"uneasy"' is not assignable to parameter of type '"ease-in" | "ease-out" | "ease-in-out"'

// button.animate(0, 0, 'uneasy') // error: "uneasy" is not allowed here
