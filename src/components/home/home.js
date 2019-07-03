import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import "./home.css";
import Main from "../main/main";
import News from "../news/news";
import Chat from "../chat/chat";
import Mine from "../mine/mine";
import tabBarDataFormJson from './tabBarData.json';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "main",
      hidden: false
    };
  }
  renderContent = () => {
    // console.log(this.state.selectedTab);
    const selectedTab = this.state.selectedTab;
    switch (selectedTab) {
      case "main":
        return <Main history={this.props.history}  />;
        break;
      case "news":
        return <News />;
        break;
      case "chat":
        return <Chat />;
        break;
      case "mine":
        return <Mine />;
        break;
      default:
        break;
    }
  };
  render() {
    const tabBarDataTemplate = tabBarDataFormJson.tabBarData.map((item, i) => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.key}
          icon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:`${item.icon_bg_url}`

              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                `${item.sele_icon_bg_url}`
              }}
            />
          }
          selected={this.state.selectedTab === `${item.selectedPath}`}
          onPress={() => {
            this.setState({
              selectedTab: `${item.selectedPath}`
            });
          }}
        >
          {this.renderContent()}
        </TabBar.Item>
      )
    });
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
        tabBarPosition="bottom"
      >
    {tabBarDataTemplate}
     </TabBar>
    );
  }
}

export default Home;
