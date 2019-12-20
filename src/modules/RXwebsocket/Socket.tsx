import * as React from "react";
import _ from "lodash"
import styled from 'styled-components'
import {Input} from "antd"
import {webSocket} from "rxjs/webSocket"

import {ChatService} from "./Service"


const {Search} = Input
// const socket = io('ws://192.168.50.97:8001/');
// const ws = new WebSocket("ws://localhost:8001/");

export default class Socket extends React.Component<any, any> {
  refs: { messageBox: any }
  // chatService: ChatService
  ws: any;
  subject: any

  constructor(props: any) {
    super(props)
    this.state = {
      inputText: null,
      messageBox: []
    }
  }

  componentWillMount() {
    this.initChart()
  }

  initChart = () => {
    // this.chatService = new ChatService()
    // this.chatService.subject.subscribe((data) => {
    //   this.showMessage(data.data, data.type)
    // })
    // this.chatService.getMessages().subscribe(this.chatService.subject)

    this.ws = webSocket("ws://localhost:8001/");
    this.subject = this.ws.subscribe(res => {
      this.showMessage(res, res.type)
    });
    this.ws.onclose = function () {
    };


  }

  showMessage = (data, type) => {
    const {messageBox} = this.state
    if (type !== "enterSelf") {
      messageBox.push({data, type})
    } else {
      this.setState({personName: data.name})
    }
    this.setState({messageBox}, () => {
      this.refs.messageBox.scrollTop = this.refs.messageBox.scrollHeight
    })
  }

  send = (inputText) => {
    if (inputText) {
      // this.chatService.sendMessage(inputText)
      this.ws.next(inputText)
      this.setState({sendValue: null})
    }
  }

  renderMessage = (item, index) => {
    const {personName} = this.state
    if (item.type !== "text") {
      return (<TipsPop key={index}>
        <span>{item.data.msg}</span>
      </TipsPop>)
    } else {
      if (personName === item.data.name) {
        return (<div style={{overflow: "hidden"}} key={index}>
          <MessagePop self={true}>
            <p className="message">{item.data.msg}</p>
            <p className="name"><span>{item.data.name}</span></p>
          </MessagePop>
        </div>)
      }
      return (<div style={{overflow: "hidden"}} key={index}>
        <MessagePop>
          <p className="message">{item.data.msg}</p>
          <p className="name"><span>{item.data.name}</span></p>
        </MessagePop>
      </div>)
    }
  }

  renderMessageBox = (messageBox) => {
    return (
      <div ref="messageBox" className="messageBox">
        {_.map(messageBox, (item, index) => {
          return this.renderMessage(item, index)
        })}
      </div>
    )
  }

  reConnect = () => {
    this.subject = this.ws.subscribe(res => {
      this.showMessage(res, res.type)
    });
    // this.chatService.getMessages().subscribe(this.chatService.subject)

  }

  render() {
    const {messageBox} = this.state

    return (<div style={{overflow: "hidden"}}>
        <Chatting>
          <p className="title">J聊天室<a onClick={this.reConnect}>重连</a></p>
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
