const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777']

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)]
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const insertRectangle = (shapes: any) => {
  const shapeId = Date.now().toString()
  const rectangle = {
    x: getRandomInt(300),
    y: getRandomInt(300),
    fill: getRandomColor()
  }
  shapes.set(shapeId, rectangle)
}

export default insertRectangle
