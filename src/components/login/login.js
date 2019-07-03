import React, { Component } from "react";
import {
  NavBar,
  Icon,
  Flex,
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast
} from "antd-mobile";
import axios from "../../http";
import "antd-mobile/dist/antd-mobile.css";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      pwd: ""
    };
  }
  changeValue = (k, v) => {
    // console.log(k, v);
    this.setState({
      [k]: v
    });
  };
  handleLogin = async () => {
    // console.log(e);
    const body = this.state;
    const { history } = this.props;
    const res = await axios.post(`users/login`, body);
    console.log(res);
    const { meta, data } = res.data;
    if (meta.status === 200) {
      //保存token
      localStorage.setItem("token", data.token);
      //进入home(js代码改标识专业术语叫'编程式导航')
      history.push("/");
    } else {
      //提示
      Toast.fail(meta.msg, 1);
    }
  };
  render() {
    return (
      <Flex direction="column" justify="center">
        <Flex.Item>
          <WhiteSpace size="lg" />
          {/* 标题 */}
          <WingBlank>
            <NavBar mode="dark">登录</NavBar>
          </WingBlank>
        </Flex.Item>
        <Flex.Item>
          <WhiteSpace size="lg" />
          {/* 表单 */}
          <List>
            <WingBlank>
              <InputItem
                value={this.state.uname}
                onChange={v => {
                  this.changeValue("uname", v);
                }}
              >
                姓名
              </InputItem>
              <InputItem
                value={this.state.pwd}
                onChange={v => {
                  this.changeValue("pwd", v);
                }}
              >
                密码
              </InputItem>
            </WingBlank>
            {/* 提交按钮 */}
            <WingBlank>
              <Button
                onClick={this.handleLogin}
                type="primary"
                style={{ marginTop: "4px" }}
              >
                登录
              </Button>
            </WingBlank>
          </List>
        </Flex.Item>
      </Flex>
    );
  }
}

export default Login;
