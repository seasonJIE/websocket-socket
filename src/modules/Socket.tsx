import * as React from "react";
import io from "socket.io-client"
import _ from "lodash"
import styled from 'styled-components'
import {Input} from "antd"

const {Search} = Input
// const socket = io('ws://192.168.50.97:8001/');

export default class Socket extends React.Component<any, any> {
  refs: { messageBox: any }
  socket:io
  constructor(props: any) {
    super(props)
    this.state = {
      inputText: null,
      messageBox: []
    }
  }

  componentDidMount() {
    this.initSocket()
  }

  initSocket = () => {
    this.socket = io('ws://localhost:8001/');

    this.socket.on('enter', (data) => {
      this.showMessage(data, "enter")
    });
    this.socket.on('message', (data) => {
      this.showMessage(data, "message")
    });
    this.socket.on('leave', (data) => {
      this.showMessage(data, "leave")
    });
    this.socket.on('enterSelf', (data) => {
      this.setState({personName: data.name})
    });
  }

  showMessage = (data, type) => {
    const {messageBox} = this.state
    messageBox.push({data, type})
    this.setState({messageBox}, () => {
      this.refs.messageBox.scrollTop = this.refs.messageBox.scrollHeight
    })
  }

  send = (inputText) => {
    if (inputText) {
      this.socket.emit('message', inputText);
      this.setState({sendValue: null})
    }
  }

  renderMessage = (item,index) => {
    const {personName} = this.state
    if (item.type !== "message") {
      return (<TipsPop key={index}>
        <span>{item.data.name}</span>{item.type === "leave" ? "离开了" : "进入了"}
      </TipsPop>)
    } else {
      if (personName === item.data.name) {
        return (<div style={{overflow: "hidden"}} key={index}>
          <MessagePop self={true}>
            <p className="message">{item.data.message}</p>
            <p className="name"><span>{item.data.name}</span></p>
          </MessagePop>
        </div>)
      }
      return (<div style={{overflow: "hidden"}} key={index}>
        <MessagePop>
          <p className="message">{item.data.message}</p>
          <p className="name"><span>{item.data.name}</span></p>
        </MessagePop>
      </div>)
    }
  }

  renderMessageBox = (messageBox) => {
    return (
      <div ref="messageBox" className="messageBox">
        {_.map(messageBox, (item,index) => {
          return this.renderMessage(item,index)
        })}
      </div>
    )
  }

  render() {
    const {messageBox} = this.state


    return (<div style={{overflow: "hidden"}}>
        <Chatting>
          <p className="title">J聊天室</p>
          {this.renderMessageBox(messageBox)}
          <Search
            placeholder="请输入要发送的消息"
            enterButton="发送"
            value={this.state.sendValue}
            onChange={(e) => this.setState({sendValue: e.target.value})}
            onSearch={value => this.send(value)}
          />
        </Chatting>
      </div>
    )
  }
}

const Chatting = styled.div `
  margin:40px auto;
  padding: 10px;
  width: 600px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #aaa;
  .title {
  margin: auto;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  }
  .messageBox {
  box-sizing: border-box;
  margin: auto auto 10px auto;
  padding: 10px;
  overflow-y: auto;
  width: 99%;
  height: 380px;
  border: 1px solid #ddd;
  border-radius: 6px;
  }
  
`;

const MessagePop = styled.div `
  overflow: hidden;
  float:  ${props => props.self ? "right" : "left"};
  .name {
    margin: 0;
    display: inline-block;
    padding: 0 6px;
    font-size: 12px;
    border-radius: 10px;
    background: rgba(245,245,245,0.8);
  }
  .message {
     margin:4px 6px;
     display: inline-block;
     padding: 2px 8px;
     border-radius: 4px;
     background: ${props => props.self ? "#c6eeff" : "#ddd"};
  }
`;

const TipsPop = styled.p `
  margin: 4px auto;
  width: 40%;
  background: #fafafa;
  text-align: center;
  font-size: 12px;
  border-radius: 10px;
`;
