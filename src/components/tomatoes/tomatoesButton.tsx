import * as React from 'react';
import {Button} from 'antd'

import './tomatoes.scss'

// interface ILoginState {
// 	account: string,
// 	password: string
// }

class TomatoesButton extends React.Component<any> {
	constructor(props){
		super(props)
		this.state = {
		}
	}


	public render() {
		return (
			<div className="tomatoesButton" id="tomatoesButton">
				<h1>番茄闹钟bbb</h1>
                <Button className="startbutton">开始番茄</Button>
			</div>
		);
	}
}

export default TomatoesButton;