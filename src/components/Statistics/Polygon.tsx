import * as React from 'react';
import { connect } from 'react-redux'

import './Statistics.scss'
interface IPolygonProps {
    // todos: any[],
    // tomatoes: any[]
    data: any,
    totalFinishedCount: number
}



class Polygon extends React.Component<IPolygonProps> {

    constructor(props: any) {
        super(props)
    }
    point = () => {
        const dates = Object.keys(this.props.data).sort((a, b) =>  Date.parse(a) - Date.parse(b))
        console.log(dates)
        const firstDay = dates[0]
        let finishedY
        let finishedX
        if (firstDay) {
            const range = new Date().getTime() - Date.parse(firstDay)
			let finishedCount = 0
            const pointArr = dates.map(d => {
                const x = (Date.parse(d) - Date.parse(firstDay)) / range * 240
                finishedCount += this.props.data[d].length
               const y = (1 - (finishedCount / this.props.totalFinishedCount)) * 60
                // if(y===0){
                //     y = 60/finishedCount
                // }
                finishedX = x
                finishedY = y
                return `${x},${y}`
            })
            console.log(finishedY)
            return ['0,60',...pointArr,`${finishedX},60`].join(' ')
        } else {
            return "0,60 240,60"
        }
    }

    render() {
        return (
            <div className="polygon" id='polygon'>
                <svg>
                    <polygon fill="rgba(215,78,78,0.1)"
                        stroke="rgba(215,78,78,0.5)" strokeWidth="1"
                        points={this.point()} />
                </svg>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    todos: state.todos,
    tomatoes: state.tomatoes,
})


export default connect(mapStateToProps)(Polygon);