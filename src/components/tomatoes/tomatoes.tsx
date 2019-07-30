import * as React from 'react';
import TomatoesButton from './tomatoesButton';
import TomatoList from './tomatoList'
import { connect } from 'react-redux'
import { addTomatoes, initTomatoes, updateTomatoes } from 'src/redux/actions'
import './tomatoes.scss'
import axios from 'src/config/axios'
import _ from 'lodash'
import { format } from 'date-fns'
interface ITomatoesProps {
    addTomatoes: (payload: any) => any,
    // initTomatoes: (payload: any) => any,
    tomatoes: any[]
    updateTomatoes: (payload: any) => any
}

class Tomatoes extends React.Component<ITomatoesProps> {
    constructor(props) {
        super(props)
    }
    startTomatoes = async () => {
        try {
            const response = await axios.post('tomatoes', { duration: 10000 })
            this.props.addTomatoes(response.data.resource)
        } catch (e) {
            console.error(e)
        }
    }
    updateTomatoes = (payload) => {
        this.props.updateTomatoes(payload)
    }

    get uncompleted() {
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
    }
    get completed() {
        const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted)
        const obj = _.groupBy(finishedTomatoes, (tomatoes) => {
            return format(tomatoes.started_at, 'YYYY-MM-D')
        })
        return obj
    }
    public render() {
        return (
            <div className="tomatoes" id="tomatoes">
                <TomatoesButton
                    uncompleted={this.uncompleted}
                    startTomatoes={this.startTomatoes}
                    updateTomatoes={this.updateTomatoes}
                />
                {this.completed?<TomatoList completed={this.completed}/>:<div>还未获取</div>}
                
                {/* {this.completed.map(t => {
                    return <div key={t.id}>{t.description}</div>
                })} */}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
    addTomatoes,
    initTomatoes,
    updateTomatoes
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);