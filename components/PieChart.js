import React from 'react'
import { Group } from '@visx/group'
import {pie, Pie} from '@visx/shape'
import { Text } from '@visx/text'

export default function PieChart({size, data, placeholder1, placeholder2}) {
    const [active, setActive] = React.useState(null)
    const half = size / 2;

    return (
        <div className='pie-chart'>
            <svg width={size} height={size}>
                <Group top={half} left={half}>
                    <Pie 
                    data={data} 
                    pieValue={(d) => d.value}
                    outerRadius={half}
                    innerRadius={({data}) => {
                        const setSize = active && active.label === data.label ? 11: 7
                        return half - setSize
                    }}
                    padAngle={0.1}
                    >
                        {pie => {
                            return pie.arcs.map((arc) => {
                                return (
                                    <g 
                                    key={arc.data.label} 
                                    onMouseEnter={() => setActive(arc.data)}
                                    onMouseLeave={() => setActive(null)}
                                    >
                                        <path
                                        d={pie.path(arc)}
                                        fill={arc.data.color}
                                        ></path>
                                    </g>
                                )
                            })
                        }}
                    </Pie>
                    <Text 
                    className='pie-text_main' 
                    textAnchor='middle' 
                    fill={active ? active?.color : "#fff"} 
                    dy={-5}
                    >
                        {active ?
                            `${active?.label[0].toUpperCase()+active?.label.substring(1)}`
                         : `${placeholder1}`}
                    </Text>
                    <Text 
                    className='pie-text_desc' 
                    textAnchor='middle' 
                    fill='#888' 
                    dy={20}>
                        {active ?
                            `${Math.round(active?.value)}%`
                         : `${placeholder2}`}
                    </Text>
                </Group>
            </svg>
        </div>
    )
}
