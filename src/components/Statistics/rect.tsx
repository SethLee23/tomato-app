import * as React from 'react';
import { connect } from 'react-redux'
import { format } from 'date-fns'
import './Statistics.scss'
interface IRectProps {
    width: number;
    data: any,
    totalFinishedCount: number
}

class Rect extends React.Component<IRectProps> {
    constructor(props: any) {
        super(props)

    }
    point = () => {
        const date = new Date()
        const arr: any[] = []
        for (let i = 0; i < 7; i++) {
            const newDate = format(new Date(date.getTime() - i * 24 * 60 * 60 * 1000), 'YYYY-MM-D')
            arr.push(newDate)
        }
        console.log(arr)
        arr.sort((a, b) => Date.parse(a) - Date.parse(b))
        // const dates = Object.keys(this.props.data).sort((a, b) => Date.parse(a) - Date.parse(b))
        const width = this.props.width
        let x = 0
        let finishedCount = 0
        const pointArr = arr.map(d => {
            if (this.props.data[d] === undefined) {
                finishedCount = 0.2
            } else {
                finishedCount = this.props.data[d].length
            }
            x += width / 8
            const y = (1 - (finishedCount / this.props.totalFinishedCount)) * 60
            const height = 60 - y
            return `${x},${y},${height}`
        })
        return pointArr
    }

    render() {
        const coordinate = this.point()
        return (
            <div className="polygon" id='polygon'>
                <svg height="60" width="100%">
                    {
                        coordinate.map((i, index) => {
                            return <rect key={index} fill="rgba(215,78,78,0.5)" x={i.split(',')[0]} y={i.split(',')[1]} width="14.57142857142857" height={i.split(',')[2]} />
                        })
                    }
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


export default connect(mapStateToProps)(Rect);