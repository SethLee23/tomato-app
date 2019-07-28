import * as React from 'react';
import { format } from 'date-fns'
import './tomatoList.scss'
interface ITomatoListProps {
    completed: any
}
const TodoItem = function(props){
    return (
        <div className="tomatoItem">
            <span className="timeRange">{format(props.started_at,'H:mm')}--{format(props.ended_at,'H:mm')}</span>
            <span className="tomatoDescription">{props.description}</span>
        </div>
    )
}
class TomatoList extends React.Component<ITomatoListProps> {
    constructor(props) {
        super(props)
    }
    get dates() {
        const dates = Object.keys(this.props.completed)
        return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).slice(0,3)
    }
    public render() {
        const list = this.dates.map(d => {
            const tomatoes = this.props.completed[d]
            return (
                <div key={d} className="dailyTomatoes">
                    <div className="title">
                    <span className="dateTime">{format(d,'M月DD日')}</span>
                    <span className="finishedCount">完成了{tomatoes.length}个番茄</span>
                    </div>
                    {
                        tomatoes.map(t=>{
                            return <TodoItem key={t.id} {...t}/>
                        })
                    }
                </div>
            )
        })
        return (
            <div className="tomatoList" id="tomatoList">
                <div>{list}</div>
            </div>
        );
    }
}


export default TomatoList;