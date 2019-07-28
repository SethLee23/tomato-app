import * as React from 'react';
import TomatoesButton from './tomatoesButton';
import { connect } from 'react-redux'
import { addTomatoes, initTomatoes, updateTomatoes } from 'src/redux/actions'
import './tomatoes.scss'
import axios from 'src/config/axios'

interface ITomatoesProps {
    addTomatoes: (payload: any) => any,
    initTomatoes: (payload: any) => any,
    tomatoes: any[]
    updateTomatoes: (payload: any) => any
}

class Tomatoes extends React.Component<ITomatoesProps> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.getTomatoes()
    }
    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (e) {
            console.error(e)
        }
    }
    startTomatoes = async () => {
        try {
            const response = await axios.post('tomatoes', { duration: 1500000 })
            this.props.addTomatoes(response.data.resource)
        } catch (e) {
            console.error(e)
        }
    }
    updateTomatoes = (payload) => {
        this.props.updateTomatoes(payload)
    }
    get uncompleted() {
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at)[0]
    }
    get completed() {
        return this.props.tomatoes.filter(t => t.description && t.ended_at)
    }
    public render() {

        return (
            <div className="tomatoes" id="tomatoes">
                <h1>番茄闹钟</h1>
                <TomatoesButton
                    uncompleted={this.uncompleted}
                    startTomatoes={this.startTomatoes}
                    updateTomatoes={this.updateTomatoes}
                />
                {this.completed.map(t=>{
                    return <div key={t.id}>{t.description}</div>
                })}
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