import { JsonObject } from '@liveblocks/client'
import '../../styles/Rectangle.scss'

export interface IRectangle extends JsonObject {
  x: number
  y: number
  fill: string
}

const Rectangle = ({ x, y, fill }: IRectangle) => {
  return (
    <div
      className="rectangle"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: fill ? fill : '#CCC'
      }}
    ></div>
  )
}

export default Rectangle
