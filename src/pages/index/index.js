import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import ScreenOne from "../components/screenOne";
import ScreenTwo from "../components/twoScreen";
import ScreenThree from "../components/threeScreen";
import "./index.less";

class Index extends Component {
  config = {
    navigationBarTitleText: "福猪拜年"
  };

  constructor(props) {
    super(props);

    this.innerAudioContext = null;

    Taro.authorize({
      scope: "scope.userInfo",
      success(res) {
        if (e.type === "getuserinfo" && e.detail.errMsg === "getUserInfo:ok") {
          const { rawData } = e.detail;
          const userInfo = JSON.parse(rawData);
          this.setState({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            readyShare: true
          });
        }
      }
    });

    this.state = {
      pauseMusic: false,
      nickName: "福猪宝宝",
      avatarUrl:
        "http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/logo.png",
      readyShare: false,
      showButton: false,
      screenTwoAnimate: false,
      screenThreeAnimate: false
    };
  }

  onPageScroll(e) {
    // console.log(e);
    const { showButton, screenTwoAnimate, screenThreeAnimate } = this.state;
    const { scrollTop } = e;
    if (!showButton && scrollTop && scrollTop > 170) {
      this.setState({
        showButton: true
      });
    }

    if (!screenTwoAnimate && scrollTop > ((1334 / 2) * 3) / 4) {
      this.setState({
        screenTwoAnimate: true
      });
    }

    if (!screenThreeAnimate && scrollTop > 1275) {
      this.setState({
        screenThreeAnimate: true
      });
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.innerAudioContext = Taro.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
    this.innerAudioContext.loop = true;
    this.innerAudioContext.src =
      "http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/fuqi.mp3";

    Taro.showShareMenu({
      withShareTicket: true
    });
  }

  onShareAppMessage() {
    const { avatarUrl, nickName } = this.state;
    const path = `/pages/index/index?shareAvatarUrl=${avatarUrl}&shareNickName=${nickName}`;

    return {
      title: "有人给您拜大年啦～",
      path
    };
  }

  componentWillUnmount() {}

  getUserInfo(e) {
    Taro.getSetting({
      success: res => {
        if (!res.authSetting["scope.userInfo"]) {
          Taro.authorize({
            scope: "scope.userInfo",
            success() {
              if (
                e.type === "getuserinfo" &&
                e.detail.errMsg === "getUserInfo:ok"
              ) {
                const { rawData } = e.detail;
                const userInfo = JSON.parse(rawData);
                this.setState({
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                  readyShare: true
                });
                Taro.pageScrollTo({
                  scrollTop: 0
                });
              }
            }
          });
        } else {
          if (
            e.type === "getuserinfo" &&
            e.detail.errMsg === "getUserInfo:ok"
          ) {
            const { rawData } = e.detail;
            const userInfo = JSON.parse(rawData);
            this.setState({
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              readyShare: true
            });
            Taro.pageScrollTo({
              scrollTop: 0
            });
          }
        }
      },
      fail: res => {
        console.log(res);
      }
    });
  }

  pause() {
    this.innerAudioContext.pause();
    this.setState({
      pauseMusic: true
    });
  }

  start() {
    this.innerAudioContext.play();
    this.setState({
      pauseMusic: false
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      pauseMusic,
      nickName,
      avatarUrl,
      readyShare,
      showButton,
      screenTwoAnimate,
      screenThreeAnimate
    } = this.state;

    const { shareAvatarUrl, shareNickName } = this.$router.params;

    const retNickName =
      shareNickName && nickName === "福猪宝宝" ? shareNickName : nickName;
    const retAvatarUrl =
      shareAvatarUrl &&
      avatarUrl ===
        "http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/logo.png"
        ? shareAvatarUrl
        : avatarUrl;

    return (
      <View className='wrapper'>
        <View className='index'>
          <View className='music'>
            {!pauseMusic ? (
              <Image
                className='pause'
                onClick={this.pause.bind(this)}
                src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/start.png'
              />
            ) : (
              <Image
                className='start'
                onClick={this.start.bind(this)}
                src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/pause.png'
              />
            )}
          </View>
          <ScreenOne nickName={retNickName} avatarUrl={retAvatarUrl} />
          <ScreenTwo screenTwoAnimate={screenTwoAnimate} />
          <ScreenThree screenThreeAnimate={screenThreeAnimate} />

          {showButton ? (
            readyShare ? (
              <Button type='primary' openType='share' className='special'>
                分享给朋友
              </Button>
            ) : (
              <Button
                type='primary'
                openType='getUserInfo'
                onGetUserInfo={this.getUserInfo.bind(this)}
                onClick={this.getUserInfo.bind(this)}
                className='special'
              >
                定制我的祝福
              </Button>
            )
          ) : null}
        </View>
      </View>
    );
  }
}

export default Index;
