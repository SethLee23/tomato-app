import * as React from 'react';
import { connect } from 'react-redux'

import './Statistics.scss'
interface IPolygonProps {
    // todos: any[],
    // tomatoes: any[]
    width: number;
    data: any,
    totalFinishedCount: number
}



class Polygon extends React.Component<IPolygonProps> {

    constructor(props: any) {
        super(props)
    }
    point = () => {
        const width = this.props.width
        // point = () => {
        //     const date = new Date()
        //     const arr: any[] = []
        //     for (let i = 0; i < 7; i++) {
        //         const newDate = format(new Date(date.getTime() - i * 24 * 60 * 60 * 1000), 'YYYY-MM-D')
        //         arr.push(newDate)
        //     }
        //     arr.sort((a, b) => Date.parse(a) - Date.parse(b))
        //     // const dates = Object.keys(this.props.data).sort((a, b) => Date.parse(a) - Date.parse(b))
        //     const width = this.props.width
        //     let x = 0
        //     let finishedCount = 0
        //     const pointArr = arr.map(d => {
        //         if (this.props.data[d] === undefined) {
        //             finishedCount = 0.2
        //         } else {
        //             finishedCount = this.props.data[d].length
        //         }
        //         x += width / 8
        //         const y = (1 - (finishedCount / this.props.totalFinishedCount)) * 60
        //         const height = 60 - y
        //         return `${x},${y},${height}`
        //     })
        //     return pointArr
        // }
        const dates = Object.keys(this.props.data).sort((a, b) =>  Date.parse(a) - Date.parse(b))
        const firstDay = dates[0]
        let finishedY
        // let finishedX
        if (firstDay) {
            const range = new Date().getTime() - Date.parse(firstDay)
			let finishedCount = 0
            const pointArr = dates.map(d => {
                let x = (Date.parse(d) - Date.parse(firstDay)) / range * width
                finishedCount += this.props.data[d].length
               const y = (1 - (finishedCount / this.props.totalFinishedCount)) * 60
                if(x===0){
                    x = 60
                }
                // finishedX = x
                finishedY = y
                return `${x},${y}`
            })
            return ['0,60',...pointArr,`${width},${finishedY}`,`${width},60`].join(' ')
        } else {
            return "0,60 240,60"
        }
    }

    render() {
        return (
            <div className="polygon" id='polygon'>
                <svg width="100%" height="60" >
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