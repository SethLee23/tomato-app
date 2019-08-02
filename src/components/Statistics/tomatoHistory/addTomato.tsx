import React from 'react'
import { Button, DatePicker, Form, Input, message } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { connect } from 'react-redux'
import { addTomatoes } from 'src/redux/actions'
import './addTomato.scss'
import axios from 'src/config/axios'

const FormItem = Form.Item
interface IProps {
  addTomatoes: (payload: any) => any,
}
interface IState {
  startedAt: string
  endedAt: string
  description: string
}

// interface AddTomato extends ComponentLifecycle<P, S> {

//  }
class AddTomato<P = {}, S = {}> extends React.Component<IProps, IState>{
  constructor(props) {
    super(props)
    this.state = {
      startedAt: '',
      endedAt: '',
      description: '',
    }
  }
  submitNewTomato = async (e: React.FormEvent) => {
    e.preventDefault()
    const { startedAt, endedAt, description } = this.state
    // 表单验证
    if (!this.state.description) {
      message.error('请检查是否已填好番茄描述')
      return
    }
    if (!endedAt || !startedAt) {
      message.error('请检查是否已填好开始/结束时间')
      return
    }
    if (startedAt.valueOf() > endedAt.valueOf()) {
      message.error('不合理的时间设置')
      return
    }
    const response = await axios.post('tomatoes', {
      started_at: startedAt,
      ended_at: endedAt,
      description,
      manually_created: true
    })
    this.props.addTomatoes(response.data.resource)
    this.setState({
      description: '',
    })
  }
  saveStartTime = (e) => {
    if (!e) {
      this.setState({
        startedAt: '',
      })
      return
    }
    const startedAt = e.toDate
    if (e.toDate() !== this.state.startedAt) {
      const { endedAt } = this.state
      if (!endedAt) {
        this.setState({
          startedAt: e.toDate(),
        })
        return
      }
      if (startedAt.valueOf() > endedAt.valueOf()) {
        message.error('不合理的时间设置')
        return
      }
      this.setState({ startedAt })
    }
  }
  saveEndTime = (e) => {
    if (!e) {
      this.setState({
        endedAt: '',
      })
      return
    }
    const endedAt = e.toDate()
    if (e.toDate() !== this.state.endedAt) {
      const { startedAt } = this.state
      if (!startedAt) {
        this.setState({ endedAt })
        return
      }
      if (startedAt > endedAt) {
        message.error('不合理的时间设置')
        return
      }
      this.setState({ endedAt })
    }
  }
  saveDesc = (e) => {
    if (e.target.value !== this.state.description) {
      this.setState({
        description: e.target.value,
      })
    }
  }
  disabledDate = (current) => {
    return current && current.toDate() > new Date()
  }
  public render() {
    return <div className='add_tomato_pane'>
      <Form layout="inline" onSubmit={this.submitNewTomato}>
        <div>
          <FormItem label="番茄日期">
            <DatePicker showTime={true} locale={locale} onChange={this.saveStartTime} disabledDate={this.disabledDate} format='YYYY-MM-DD HH:mm' />
          </FormItem>
        </div>
        <div>
          <FormItem label="结束时间">
            <DatePicker showTime={true} locale={locale} onChange={this.saveEndTime} disabledDate={this.disabledDate} format='YYYY-MM-DD HH:mm' />
          </FormItem>
        </div>
        <div>
          <FormItem label="番茄描述">
            <Input value={this.state.description} onChange={this.saveDesc} />
          </FormItem>
        </div>
        <div className="submitBurtton">
          <FormItem>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </div>
      </Form>

    </div>
  }
}
const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {
  addTomatoes,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTomato);