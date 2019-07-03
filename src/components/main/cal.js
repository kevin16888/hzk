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
import "./cal.css";
import Charts from "./charts";

const tabs = [
  { title: "公积金贷款" },
  { title: "商业贷款" },
  { title: "组合贷款" }
];
const titles = ["贷款方式", "贷款年限", "贷款利率"];
const segValues = {
  0: ["按贷款总额", "按面积算"],
  1: ["10", "20", "30"],
  2: ["3.25", "9", "9.5"]
};
class Cal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //回到上一页
  backToMain = () => {
    // console.log("-----");
    const { history } = this.props;
    history.goBack();
  };
  //分段器
  onChange = e => {
    console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  };
  onValueChange = value => {
    console.log(value);
  };
  //计算
  handleCal = () => {
    //获取贷款方式->公积金贷款
    //获取贷款方式->value
    //贷款总额
    //年限
    //利率
    //计算(初中数学)->
    //得到一组结果(本金/利息/本利和)
    //传递
    console.log("btn----cal----");
  };

  render() {
    const formTemplate = titles.map((item, i) => {
      return (
        <Card.Header
          key={i}
          title={item}
          extra={
            <SegmentedControl
              values={segValues[i]}
              onChange={this.onChange}
              onValueChange={this.onValueChange}
            />
          }
        />
      );
    });
    formTemplate.splice(
      1,
      0,
      <Card.Header
        key={"input"}
        title="贷款总额"
        extra={<InputItem placeholder="0.00" extra="¥" />}
      />
    );
    return (
      <div>
        {/* 导航 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.backToMain}
        >
          <span>贷款利率计算</span>
        </NavBar>
        {/* tab切换--link+router--tabber */}
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
          {/* 表单 */}
          <Card full>
            {formTemplate}
            <Button type="ghost" onClick={this.handleCal}>
              计算
            </Button>
          </Card>
          <div>2</div>
          <div>3</div>
        </Tabs>
        {/* 图表 */}
        <Charts />
      </div>
    );
  }
}

export default Cal;
