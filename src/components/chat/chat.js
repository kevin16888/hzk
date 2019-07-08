import React, { Component } from "react";
import {
  WhiteSpace,
  WingBlank,
  Card,
  Tabs,
  SegmentedControl,
  NavBar,
  Icon,
  InputItem,
  Button
} from "antd-mobile";
import axios from "../../http";
import "./chat.css";
import Chatwindow from "./chatwindow";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShow: false,
      item: {}
    };
  }
  componentDidMount = async () => {
    const {
      data: { list }
    } = await axios.post(`chats/list`);
    this.setState({
      list
    });
  };
  showChatwindow = item => {
    // console.log(this.props);
    // const { history } = this.props;
    // history.push('/chatwindow')>>希望true>chatwindow.js显示
    //改的是列表自己的state>true》显示chatwindow><Chatwindow/>
    this.setState({
      isShow: true,
      item
    });
  };
  render() {
    const listContent = this.state.list.map(item => {
      // console.log(item);
      return (
        <li key={item.id} onClick={this.showChatwindow.bind(this, item)}>
          <div className="avarter">
            <img src={item.avatar} alt="avarter" />
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{item.ctime}</span>
          </div>
        </li>
      );
    });
    return (
      <div>
        {this.state.isShow ? (
          <Chatwindow
            // username={this.state.username}
            item={this.state.item}
            isShow={this.state.isShow}
            cb={isShow => {
              this.setState({
                isShow
              });
            }}
          />
        ) : (
          <div>
            {/* 导航 */}
            <NavBar mode="light">
              <span>{this.props.title}</span>
            </NavBar>
            {/* 列表 */}
            <div className="chat-list">
              <ul>{listContent}</ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Chat;
