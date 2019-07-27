import * as React from 'react';
import TomatoesButton  from './tomatoesButton';
import {connect} from 'react-redux'

import './tomatoes.scss'


class Tomatoes extends React.Component<any> {
	constructor(props){
		super(props)
	}


	public render() {
		return (
			<div className="tomatoes" id="tomatoes">
				<h1>番茄闹钟</h1>
                <TomatoesButton/>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
	...ownProps
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps){Tomatoes};