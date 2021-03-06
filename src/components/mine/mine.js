import React from "react";
import "./index.css";
import axios from "../../http";
import { Grid, Button, Modal, Slider } from "antd-mobile";

import AvatarEditor from "react-avatar-editor";

let gridtext = [
  "看房记录",
  "我的订单",
  "我的收藏",
  "个人资料",
  "身份认证",
  "联系我们"
];

//自定义组件
//选择图片的弹窗》Modal组件
class SelectImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      modal1: false
    };
  }
  componentDidMount = () => {
    // console.log(this.props);
    const { modal1 } = this.props;
    this.setState({
      modal1
    });
  };
  onClose = () => {
    const { close } = this.props;
    //获取file
    const fileData = this.myRef.current.files[0];
    //获取inputDOM元素的type='file'文本域(表单的值)
    // console.log(fileData);

    close(false, fileData);
  };
  render() {
    return (
      <Modal
        visible={this.props.modal1}
        transparent
        maskClosable={true}
        onClose={this.onClose}
        title="选择图片"
        footer={[
          {
            text: "确定",
            onPress: () => {
              this.onClose();
            }
          }
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <input ref={this.myRef} type="file" name="file" />
      </Modal>
    );
  }
}

//裁切图片的弹窗》Modal组件
class CoreImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal2: false,
      scale: 1
    };
  }
  componentDidMount = () => {
    console.log(this.props);
    const { modal2 } = this.props;
    this.setState({
      modal2
    });
  };
  setEditorRef = editor => (this.editor = editor);
  onClose = async () => {
    // console.log(this.props);
    const { close } = this.props;
    //提取图片->图片的结果是第三方组件->API写法
    if (this.editor) {
      //dom元素canvas
      const canvasDOM = this.editor.getImageScaledToCanvas();
      // console.log(canvasDOM);
      const imgRes = canvasDOM.toDataURL();
      // console.log(imgRes);
      //看接口->上传头像
      const res = await axios.post(`my/avatar`, {
        avatar: imgRes
      });
      console.log(res);

      //传递给父组件mine使用
      close(false, imgRes);
    }
  };
  //滑动条值变化
  sliderChange = v => {
    console.log(v); //10~20
    this.setState({
      scale: v * 0.1
    });
  };
  render() {
    return (
      <Modal
        visible={this.props.modal2}
        transparent
        maskClosable={true}
        onClose={this.onClose}
        title="裁切图片"
        footer={[
          {
            text: "确定",
            onPress: () => {
              this.onClose();
            }
          }
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        {/* //裁切组件 */}
        <AvatarEditor
          ref={this.setEditorRef}
          image={this.props.fileData}
          width={150}
          height={150}
          borderRadius={75}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={this.state.scale}
          rotate={0}
        />
        {/* //滑动条Slider */}
        <Slider
          style={{ marginLeft: 30, marginRight: 30 }}
          defaultValue={10}
          min={10}
          max={20}
          onChange={this.sliderChange}
          onAfterChange={this.sliderAfterChange}
        />
      </Modal>
    );
  }
}

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      data: Array.from(new Array(6)).map((_val, i) => ({
        icon:
          "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
        text: `name${i}`
      })),
      isImageModal: false,
      isCoreModal: false,
      fileData: null,
      avatarPath: ""
    };
  }

  componentDidMount = async () => {
    // Grid数据修改
    let data = Array.from(new Array(6)).map((item, i) => {
      return {
        id: i + 1,
        icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
        text: gridtext[i]
      };
    });
    //获取当前用户的信息
    const user_id = localStorage.getItem("uid");
    const res = await axios.post(`my/info`, {
      user_id
    });
    // console.log(res);

    this.setState({
      data,
      uname: res.data.username,
      avatarPath: res.data.avatar
    });
  };
  showImageModal = () => {
    //显示对话框Modal
    this.setState({
      isImageModal: true
    });
  };
  openImageModal = () => {};
  closeImageModal = (isShow, fileData) => {
    this.setState({
      isImageModal: isShow
    });
    //需要一个file
    // console.log(fileData);
    //如果fileData没有》关闭
    if (!fileData) {
      return;
    }
    //如果fileData有》关闭》显示第二个Modal+fileData传递
    this.setState({
      isCoreModal: true,
      fileData
    });
  };
  closeCoreModal = (isShow, imgRes) => {
    this.setState({
      isCoreModal: isShow,
      avatarPath: imgRes
    });
  };
  render() {
    return (
      <div className="my-container">
        {this.state.isImageModal && (
          <SelectImageModal
            modal1={this.state.isImageModal}
            open={this.openImageModal}
            close={this.closeImageModal}
          />
        )}

        {this.state.isCoreModal && (
          <CoreImageModal
            fileData={this.state.fileData}
            modal2={this.state.isCoreModal}
            close={this.closeCoreModal}
          />
        )}

        <div className="my-title">
          <img src={"http://127.0.0.1:8086/" + "public/my-bg.png"} alt="me" />
          <div className="info">
            <div className="myicon">
              <img
                onClick={this.showImageModal}
                src={this.state.avatarPath}
                alt="icon"
              />
            </div>
            <div className="name">{this.state.uname}</div>
            <Button type="ghost" size="small">
              已认证
            </Button>
            <div className="edit">编辑个人资料</div>
          </div>
        </div>
        <Grid square columnNum={3} data={this.state.data} isCarousel />

        <div className="my-ad">
          <img src={"http://127.0.0.1:8086/" + "public/ad.png"} alt="" />
        </div>
      </div>
    );
  }
}

export default Mine;
