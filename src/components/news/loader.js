import React, { Component } from "react";
import { Card, Badge, Tag, Modal, Button } from "antd-mobile";
import axios from "../../http";
import Tloader from "react-touch-loader";
//tab.css<-.less
import "./tab.css";

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
//三个函数组件
//资讯和头条》前两个tab对应的内容
const NewsOrTopCom = props => {
  const { list } = props;
  let newsTemplate = list.map((item, i) => {
    return (
      <Card key={i}>
        <Card.Header
          thumb="http://127.0.0.1:8086/public/home.png"
          thumbStyle={thumbStyle}
          extra={
            <div>
              <Badge text={item.info_title} style={badgeStyle} />
              <Badge text={item.info_type} style={badgeStyle} />
            </div>
          }
        />
      </Card>
    );
  });
  return <div>{newsTemplate}</div>;
};
//问答
const AnswerCom = props => {
  const { list } = props;
  const templateList = list.map((item, i) => {
    return (
      <Card full key={i}>
        <Card.Body>
          <div>{item.question_name}</div>
        </Card.Body>
        <Card.Footer
          content={item.question_tag}
          extra={
            <div>
              <Badge text={item.question_tag} style={badgeStyle} />
              <Badge text={item.answer_content} style={badgeStyle} />
            </div>
          }
        />
      </Card>
    );
  });
  const showModal = () => {
    Modal.prompt(
      "输入内容",
      "",
      [
        {
          text: "Close",
          onPress: value => console.log("关闭---")
        },
        {
          text: "Hold on",
          onPress: async value => {
            const res = await axios.post(`infos/question`, {
              question: value
            });
            console.log(res);
          }
        }
      ],
      "default",
      null,
      ["请输入留言内容"]
    );
  };
  return (
    <div>
      {[
        <Button
          onClick={showModal}
          icon="check-circle-o"
          size="small"
          type="warning"
          key="btn"
        >
          发起提问
        </Button>,
        ...templateList
      ]}
    </div>
  );
};
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagenum: 0,
      pagesize: 2,
      type: 1,
      list: [],
      total: 0,
      hasMore: 1,
      initializing: 1
    };
  }
  //发axios请求获取首屏数据
  getData = async () => {
    const {
      data: {
        list: { data, total }
      }
    } = await axios.post(`infos/list`, {
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize,
      type: this.state.type
    });
    // console.log(data);
    this.setState(
      {
        list: data,
        total: total
      },
      () => {
        //输出查看改之后的结果
        // console.log(this.state.list, this.state.total);
      }
    );
    return data;
  };
  //处理首屏数据
  componentDidMount = () => {
    // console.log(this.props);
    const { type } = this.props;
    // console.log(type);
    this.setState(
      {
        type
      },
      () => {
        this.getData();
      }
    );
  };
  //下拉刷新>发送第一屏pagenum=0 pagesize=2的请求》this.getDate()
  refresh = (resolve, reject) => {
    // console.log(1111);
    this.setState(
      {
        //设置初始值，防止用户先加载更多再下拉刷新
        pagenum: 0
      },
      () => {
        //改完之后发请求》 回调
        this.getData();
        //刷新之后关闭
        resolve();
      }
    );
  };
  //点击加载更多
  loadMore = resolve => {
    // console.log(22222);
    this.setState(
      {
        pagenum: this.state.pagenum + this.state.pagesize
      },
      async () => {
        const oldArr = this.state.list;
        const newArr = await this.getData();
        this.setState(
          {
            hasMore:
              this.state.pagenum > 0 &&
              this.state.pagenum < this.state.total - this.state.pagesize,
            list: [...oldArr, ...newArr]
          },
          () => {
            resolve();
          }
        );
      }
    );
  };
  render() {
    return (
      <div>
        <Tloader
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={this.state.hasMore}
          initializing={this.state.initializing}
        >
          {/* //自定义组件 */}
          {this.state.type !== 3 ? (
            <NewsOrTopCom list={this.state.list} />
          ) : (
            <AnswerCom list={this.state.list} />
          )}
        </Tloader>
      </div>
    );
  }
}

export default Loader;
