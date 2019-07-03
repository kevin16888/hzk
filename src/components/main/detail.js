import React, { Component } from "react";
import {
  SearchBar,
  Button,
  Carousel,
  WhiteSpace,
  WingBlank,
  Grid,
  NoticeBar,
  Card,
  Badge,
  NavBar,
  Icon
} from "antd-mobile";
import axios from "../../http";
//包含react开发中常用的各种表格形式
import { List } from "react-virtualized";
const badgeStyle = {
  marginLeft: 12,
  padding: "0 3px",
  backgroundColor: "#fff",
  borderRadius: 2,
  color: "#f19736",
  border: "1px solid #f19736"
};
const thumbStyle = {
  width: "125px",
  height: "95px"
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      data: [],
      W: 375,
      H: 667
    };
  }
  backToMain = () => {
    // console.log("-----");
    const { history } = this.props;
    history.goBack();
  };
  componentDidMount = async () => {
    // console.log(this.props);
    // PC不常用->mobile常用
    const W = document.documentElement.clientWidth
    const H = document.documentElement.clientHeight
    const {
      text,
      id: home_type
    } = this.props.history.location.state.query.params;
    // console.log(text);
    const { data } = await axios.post(`homes/list`, {
      home_type: home_type
    });
    // console.log(res);
    this.setState({
      text,
      data,
      W,
      H
    });
  };
  //列表list
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    // console.log(key, index, isScrolling, isVisible, style);
    const item = this.state.data[index];
    // console.log(this.state.data);
    return (
      <Card key={index}>
        <Card.Header
          thumb="http://127.0.0.1:8086/public/home.png"
          thumbStyle={thumbStyle}
          extra={
            <div>
              <Badge text={item.home_name} style={badgeStyle} />
              <Badge text={item.home_price} style={badgeStyle} />
              <Badge text={item.home_desc} style={badgeStyle} />
              <Badge text={item.home_tags} style={badgeStyle} />
            </div>
          }
        />
      </Card>
    );
  };
  render() {
    //模板列表
    let detailTemplate = this.state.data.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
            thumb="http://127.0.0.1:8086/public/home.png"
            thumbStyle={thumbStyle}
            extra={
              <div>
                <Badge text={item.home_name} style={badgeStyle} />
                <Badge text={item.home_price} style={badgeStyle} />
                <Badge text={item.home_desc} style={badgeStyle} />
                <Badge text={item.home_tags} style={badgeStyle} />
              </div>
            }
          />
        </Card>
      );
    });
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
        {/* 列表 */}
        {/* {detailTemplate} */}
        {/* 列表list */}
        <List
          width={this.state.W}
          height={this.state.H}
          rowCount={this.state.data.length}
          rowHeight={100}
          rowRenderer={this.rowRenderer}
        />
      </div>
    );
  }
}

export default Detail;
