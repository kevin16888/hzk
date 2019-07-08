import React, { Component } from "react";
import { NavBar, Icon, TextareaItem, Button } from "antd-mobile";
import axios from "../../http";
import "./chatwindow.css";
import handle, { IMEvent } from "./wsclient";

const Chatlist = props => {
  const uid = 1 * localStorage.getItem("uid");
  // 详情聊天列表
  let list = props.listContent.map(item => {
    //如果item的from_user(3)等于当前登录的用户的uid=>right，反之left
    return (
      <li
        key={item.id}
        className={
          item.from_user !== uid ? "chat-info-right" : "chat-info-left"
        }
      >
        <img src={item.avatar} alt="" />
        {/* <span className={'name'}>{item.chat_msg}</span> */}
        <span className={"info"}>{item.chat_msg}</span>
        {/* <span className={'time'}>{item.chat_msg}</span> */}
      </li>
    );
  });
  return list;
};
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      msgContent: "abc",
      client: null
    };
  }
  backtochat = () => {
    // 回到上一页
    //chat.js state isShow
    const { cb, isShow } = this.props;
    cb(!isShow);
  };
  //聊天第二步》接收消息
  receMsg = data => {
    console.log(data); //res->{content:"对方不在线"}
    if (data.content === "对方不在线") {
      return;
    }
    //data->服务端返回的数据一般为JSON字符串，不是JSON对象，所以要把它转换成JSON对象
    let temp = this.state.list;
    temp.push(JSON.parse(data.content));
    this.setState({
      list: temp
    });
  };
  componentDidMount = async () => {
    // console.log(this.props);
    const {
      item: { from_user, to_user }
    } = this.props;
    const {
      data: { list }
    } = await axios.post(`chats/info`, {
      from_user,
      to_user
    });
    // console.log(res);
    this.setState({
      list
    });

    //聊天第一步》注册用户》根据当前用户的uid》获取uid
    const uid = localStorage.getItem("uid");
    //通过handle注册
    let client = handle(uid, data => {
      // console.log(data); //服务端返回的消息
      this.receMsg(data);
    });
    this.setState({
      client
    });
  };
  // 聊天关闭
  closeChat = () => {
    console.log("关闭聊天");
    const { cb, isShow } = this.props;
    cb(!isShow);
  };
  // 发送消息
  sendMsg = () => {
    console.log("发送消息");
    //设置消息的格式和内容
    let { to_user, from_user, avatar } = this.props.item;
    let { list, client, msgContent } = this.state;
    //封装消息数据包
    let pdata = {
      id: Math.random() + "",
      from_user: from_user,
      to_user: to_user,
      avatar: avatar,
      chat_msg: msgContent
    };
    //聊天第三步>>发送消息
    //$.post("url",body)
    //后台要的数据永远是字符串，所以需要转换一下
    client.emitEvent(IMEvent.MSG_TEXT_SEND, JSON.stringify(pdata));
    //处理页面
    let temp = list;
    temp.push(pdata);
    this.setState({
      list: temp
    });
  };
  handleMsgChange = v => {
    this.setState({
      msgContent: v
    });
  };
  render() {
    return (
      <div className="chat-window">
        <NavBar
          className="chat-window-title"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.backtochat}
        >
          <span>{this.props.item.username}</span>
        </NavBar>
        <div className="chat-window-content">
          <ul>
            <Chatlist listContent={this.state.list} />
          </ul>
        </div>
        <div>
          <div className="chat-window-input">
            <TextareaItem
              value={this.state.msgContent}
              onChange={this.handleMsgChange}
              placeholder="请输入内容..."
            />
            <Button type="primary" onClick={this.closeChat}>
              关闭
            </Button>
            <Button onClick={this.sendMsg}>发送</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default ChatWindow;
