import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import "./map.css";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  //回到上一页
  backToMain = () => {
    // console.log("-----");
    const { history } = this.props;
    history.goBack();
  };
  initMap = () => {
    const BMap = window.BMap;
    let map = new BMap.Map("allmap");
    // 创建地图实例
    let point = new BMap.Point(116.404, 39.915);
    // 创建点坐标
    map.centerAndZoom(point, 15);
    // 初始化地图，设置中心点坐标和地图级别
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
  };
  componentDidMount = () => {
    // console.log(window);
    this.initMap();
    const { text } = this.props.history.location.state.query.params;
    this.setState({
      text
    });
  };
  render() {
    return (
      <div>
        {/* 导航 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.backToMain}
        >
          {this.state.text}
        </NavBar>
        {/* 地图 */}
        <div id="allmap" />
      </div>
    );
  }
}

export default Map;
