import { JsonObject } from '@liveblocks/client'
import Rectangle from './Rectangle'

export type ShapesNames = 'Rectangle'

export interface IShape extends JsonObject {
  x: number
  y: number
  fill: string
  name: ShapesNames
}

function SelectedShape({ name, x, y, fill }: IShape) {
  if (name === 'Rectangle') {
    return <Rectangle x={x} y={y} fill={fill} />
  }

  return null
}

export default SelectedShape
