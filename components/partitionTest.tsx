import React from 'react'

//import { Partition } from './potionary/layout/src/Partition';
import {Partition} from './potionary/layout/src/index'
//import Svg from './potionary/utils/Svg';
//import Rect from './potionary/utils/Rect'
import { Svg, Rect } from './potionary/elements/src/index';
//import {} from './potionary/layout/lib/Partition'

interface PartitionTestProps {
    separation: Number,
    size: Number[],
    round: Number,
    data: {},
    includeRoot: Boolean,
    sum: FunctionConstructor
}

const PartitionTest: React.FC = ({
    
}) => {
    return (
        <Svg width={400} height={400}>
        <Partition
          data={{
            children: [
              { value: 1, key: '1' },
              { value: 2, key: '2' },
              {
                value: 0,
                key: '3',
                children: [
                  { value: 1, key: 'a1' },
                  { value: 2, key: 'a2' },
                  {
                    value: 0,
                    key: 'a3',
                    children: [
                      { value: 1, key: 'b1' },
                      { value: 2, key: 'b2' },
                      {
                        value: 3,
                        key: 'b3',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >{nodes => nodes.map(({ key, x0, y0, x1, y1 }) => (
          <Rect
            key={key}
            x={x0}
            y={y0}
            width={x1 - x0}
            height={y1 - y0}
            fill="black"
            stroke="white"
          />
        ))}</Partition>
      </Svg>
    )
}

export default PartitionTest
