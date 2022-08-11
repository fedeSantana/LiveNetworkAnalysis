import { IShape } from '@/components/Playground/Canvas/Shapes'
import { IShapes } from '@/config/liveBlocks'

const insertRectangle = (shapes: IShapes, shape: IShape) => {
  const shapeId = Date.now().toString()
  const rectangle = {
    x: shape.x,
    y: shape.y,
    fill: shape.fill
  }
  shapes.set(shapeId, rectangle)
}

export default insertRectangle
