import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import "./index.less";
import Test from "../components/Test";
import CanvasDraw from "../components/canvasDraw";

class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  state = {
    painting: null,
    shareImage: ""
  };

  componentWillMount() {}

  componentDidMount() {
    const audio = Taro.createInnerAudioContext();

    audio.src =
      "http://1258431382.vod2.myqcloud.com/1dc8b267vodcq1258431382/98cca9595285890784076478507/DtsJ8sic2f4A.mp3";
    // http://1258431382.vod2.myqcloud.com/1dc8b267vodcq1258431382/98a870745285890784076458351/p4eG7ktsPjoA.mp3
    audio.play();

    console.log();
  }

  onShareAppMessage() {
    return {
      title: "测试！"
    };
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  cq() {}

  eventDraw() {
    Taro.showLoading({
      title: "绘制分享图片中",
      mask: true
    });
    this.setState({
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [
          {
            type: "image",
            url:
              "https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg",
            top: 0,
            left: 0,
            width: 375,
            height: 555,
            timeStmp: +new Date()
          },
          {
            type: "image",
            url:
              "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132",
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: "image",
            url:
              "https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg",
            top: 26.5,
            left: 28,
            width: 57,
            height: 57
          },
          {
            type: "text",
            content: "您的好友【kuckboy】",
            fontSize: 16,
            color: "#402D16",
            textAlign: "left",
            top: 33,
            left: 96,
            bolder: true
          },
          {
            type: "text",
            content: "发现一件好货，邀请你一起0元免费拿！",
            fontSize: 15,
            color: "#563D20",
            textAlign: "left",
            top: 59.5,
            left: 96
          },
          {
            type: "image",
            url:
              "https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg",
            top: 136,
            left: 42.5,
            width: 290,
            height: 186
          },
          {
            type: "image",
            url:
              "https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg",
            top: 443,
            left: 85,
            width: 68,
            height: 68
          },
          {
            type: "text",
            content: "正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人",
            fontSize: 16,
            lineHeight: 21,
            color: "#383549",
            textAlign: "left",
            top: 336,
            left: 44,
            width: 287,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          {
            type: "text",
            content: "￥0.00",
            fontSize: 19,
            color: "#E62004",
            textAlign: "left",
            top: 387,
            left: 44.5,
            bolder: true
          },
          {
            type: "text",
            content: "原价:￥138.00",
            fontSize: 13,
            color: "#7E7E8B",
            textAlign: "left",
            top: 391,
            left: 110,
            textDecoration: "line-through"
          },
          {
            type: "text",
            content: "长按识别图中二维码帮我砍个价呗~",
            fontSize: 14,
            color: "#383549",
            textAlign: "left",
            top: 460,
            left: 165.5,
            lineHeight: 20,
            MaxLineNumber: 2,
            breakWord: true,
            width: 125
          }
        ]
      }
    });
  }

  onTap() {
    console.log(111);
  }

  eventClose() {
    this.setState({
      shareImage: ""
    });
  }

  eventGetImage(ret) {
    Taro.hideLoading();
    const { tempFilePath, errMsg } = ret;
    if (errMsg === "canvasdrawer:ok") {
      this.setState({
        shareImage: tempFilePath
      });
    }
  }

  eventSave() {
    const { shareImage } = this.state;
    Taro.saveImageToPhotosAlbum({
      filePath: shareImage,
      success() {
        Taro.showToast({
          title: "保存图片成功",
          icon: "success",
          duration: 2000
        });
      }
    });
  }

  render() {
    const { painting, shareImage } = this.state;
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Test name='梅梅梅子' />
        <View className='box' />
        <Button openType='share'>点击分享</Button>
        <Button onClick={this.eventDraw.bind(this)}>绘制</Button>

        {shareImage ? (
          <View className='share-image'>
            <Image src={shareImage} />
            <Text onClick={this.eventClose.bind(this)} className='close'>
              x
            </Text>
            <Text onClick={this.eventSave.bind(this)} className='save'>
              保存图片
            </Text>
          </View>
        ) : null}

        <CanvasDraw painting={painting} onGetImage={this.eventGetImage} />
      </View>
    );
  }
}

export default Index;
