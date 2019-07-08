import React, { Component } from "react";
import { NavBar, Tabs } from "antd-mobile";
import Loader from "./loader";
import './news.css'

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [{ title: "资讯" }, { title: "头条" }, { title: "问答" }]
    };
  }
  changeTab = (tabData, index) => {
    // console.log(index);//0 1 2
    // this.tabOne(index);
    switch (index) {
      case 0:
        this.tabOne(index);
        break;
      case 1:
        this.tabTwo(index);
        break;
      case 2:
        this.tabThree(index);
        break;
      default:
        break;
    }
  };
  tabOne = index => {
    return <Loader type={index + 1} />;
  };
  tabTwo = index => {
    return <Loader type={index + 1} />;
  };
  tabThree = index => {
    return <Loader type={index + 1} />;
  };
  render() {
    // console.log(this.props);
    return (
      <div className="news">
        {/* 导航 */}
        <NavBar mode="light">
          <span>{this.props.title}</span>
        </NavBar>
        {/* tab切换 */}
        <Tabs
          tabs={this.state.tabs}
          initialPage={0}
          animated={false}
          useOnPan={false}
          onChange={this.changeTab}
        >
          {/* 表单 */}
          {this.tabOne(0)}
          {this.tabTwo(1)}
          {this.tabThree(2)}
        </Tabs>
      </div>
    );
  }
}

export default News;
