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
  NavBar
} from "antd-mobile";
import axios from "../../http";
import "./main.css";

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
//menuData->[{menu_name:?}]
//data=>[{icon,title}]

//data->没有[]默认值->didMounted->menudata->把menudata中的数据给data

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesData: [],
      menuData: [],
      infoData: [],
      faqData: [],
      data: Array.from(new Array(8)).map((_val, i) => ({
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
        text: `name${i}`
      })),
      houseData: [],
      houseDataNew: [],
      imgHeight: 176
    };
  }
  //获取主页相关数据
  getHomeData = async path => {
    const res = await axios.post(`${path}`);
    const { meta, data } = res;
    if (meta.status === 200) {
      // console.log(data.list);
      return data.list;
    }
  };
  //辅助方法 []>[[2],[2],[3]]
  fn = (arr, ...rest) => {
    let temp = [];
    for (let i = 0; i < rest.length; i++) {
      temp.push(arr.splice(0, rest[i]));
    }
    return temp;
  };
  componentDidMount = async () => {
    //获取轮播数据
    let imagesData = this.getHomeData(`homes/swipe`);
    let menuData = this.getHomeData(`homes/menu`);
    let infoData = this.getHomeData(`homes/info`);
    let faqData = this.getHomeData(`homes/faq`);
    let houseData = this.getHomeData(`homes/house`);
    //统一调用promise>统一改状态
    const datalist = await Promise.all([
      imagesData,
      menuData,
      infoData,
      faqData,
      houseData
    ]);
    // console.log(datalist);
    this.setState(
      {
        imagesData: datalist[0],
        menuData: datalist[1],
        infoData: datalist[2],
        faqData: datalist[3],
        houseData: datalist[4]
      },
      () => {
        //把menudata>data
        let data = this.state.menuData.map((item, i) => {
          return {
            id: i + 1,
            icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
            text: item.menu_name
          };
        });
        //处理houseData
        const houseDataNew = this.fn(this.state.houseData, 2, 2, 3);
        // console.log(houseDataNew);

        this.setState({
          data,
          houseDataNew
        });
      }
    );
  };
  //菜单点击
  changeMenuTab = el => {
    // console.log(el);
    const { history } = this.props;
    const { text, icon, id } = el;
    switch (id) {
      case 1:
      case 2:
      case 3:
      case 4:
        history.push("/detail", { query: { params: { text: text, id: id } } });
        break;
      case 5:
        // console.log(id);
        history.push("/map", { query: { params: { text: text, id: id } } });
        break;
      case 6:
        console.log(id);
        break;
      case 7:
        // console.log(id);
        history.push("/cal", { query: { params: { id: id } } });
        break;
      case 8:
        console.log(id);
        break;
      default:
        break;
    }
  };
  render() {
    //轮播图
    const carouselTemplate = this.state.imagesData.map((item, i) => {
      return (
        <a
          key={i}
          href="/"
          style={{
            display: "inline-block",
            width: "100%",
            height: this.state.imgHeight
          }}
        >
          <img
            src={item.original}
            alt="图片加载中"
            style={{ width: "100%", verticalAlign: "top" }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event("resize"));
              this.setState({ imgHeight: "auto" });
            }}
          />
        </a>
      );
    });
    //好客资讯
    const infoTemplate = this.state.infoData.map((item, i) => {
      return (
        <NoticeBar
          key={i}
          mode="link"
          action={<span>去看看</span>}
          marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}
        >
          {item.info_title}
        </NoticeBar>
      );
    });
    //好客问答
    let faqTemplate = this.state.faqData.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
            title={item.question_name}
            thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
            // extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>
              <Badge text={item.question_tag} style={badgeStyle} />
              <Badge text={item.answer_content} style={badgeStyle} />
              <Badge text={item.atime} style={badgeStyle} />
              <Badge text={item.qnum} style={badgeStyle} />
            </div>
          </Card.Body>
        </Card>
      );
    });
    faqTemplate = [<b key="b">好客问答</b>, ...faqTemplate];
    //房屋资讯
    let houseTemplate = this.state.houseDataNew.map((item1, i) => {
      let houseTemplateItem = item1.map((item2, j) => {
        return (
          <Card key={j}>
            <Card.Header
              thumb="http://127.0.0.1:8086/public/home.png"
              thumbStyle={thumbStyle}
              extra={
                <div>
                  <Badge text={item2.home_name} style={badgeStyle} />
                  <Badge text={item2.home_price} style={badgeStyle} />
                  <Badge text={item2.home_desc} style={badgeStyle} />
                  <Badge text={item2.home_tags} style={badgeStyle} />
                </div>
              }
            />
          </Card>
        );
      });
      let titles = ["最新开盘", "二手精选", "租个家"];
      return (
        <div key={i}>
          <b>{titles[i]}</b>
          {houseTemplateItem}
        </div>
      );
    });
    return (
      <div>
        {/* {搜索框} */}
        <SearchBar placeholder="请输入搜索关键字" />
        <WingBlank>
          {/* 轮播 */}
          <Carousel infinite>{carouselTemplate}</Carousel>
          {/* 菜单->8个 */}
          <Grid
            data={this.state.data}
            isCarousel
            onClick={el => {
              this.changeMenuTab(el);
            }}
          />
          {/* 好客资讯 */}
          {infoTemplate}
          {/* 好客问答 */}
          {faqTemplate}
          {/* 房屋列表 */}
          {houseTemplate}
          <div style={{ height: "50px" }} />
        </WingBlank>
      </div>
    );
  }
}

export default Main;
