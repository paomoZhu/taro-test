import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "../index/index.less";

class ScreenTwo extends Taro.Component {
  constructor(props) {
    super(props);

    this.state = {
      charactorHeight: 0,
      floHeight: 0,
      floWidth: 0,
      leftFloAnimation: "",
      rightFloAnimation: "",
      isAnimated: false
    };

    this.leftAnimation = "";
    this.rightAnimation = "";
  }

  leftTransform() {
    this.leftAnimation.left(0).step();

    this.setState({
      leftFloAnimation: this.leftAnimation.export()
    });
  }

  rightTransform() {
    this.rightAnimation.right(0).step();

    this.setState({
      rightFloAnimation: this.rightAnimation.export()
    });
  }

  move() {
    this.leftTransform();
    this.rightTransform();
  }

  shouldComponentUpdate(props, state) {
    const { screenTwoAnimate } = props;
    const { isAnimated } = state;
    if (screenTwoAnimate && !isAnimated) {
      this.setState(
        {
          isAnimated: true
        },
        () => {
          this.move();
        }
      );
    }
    return true;
  }

  componentDidMount() {
    Taro.getSystemInfo({
      success: res => {
        this.setState({
          charactorHeight: res.screenWidth / (750 / 1147),
          floWidth: (154 / 750) * res.screenWidth,
          floHeight: ((154 / 750) * res.screenWidth) / (154 / 532)
        });
      }
    });

    this.leftAnimation = Taro.createAnimation({
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
      duration: 500
    });

    this.rightAnimation = Taro.createAnimation({
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
      duration: 500
    });
  }
  render() {
    const {
      charactorHeight,
      floHeight,
      floWidth,
      leftFloAnimation,
      rightFloAnimation
    } = this.state;
    return (
      <View className='screen-two'>
        <Image
          className='charactor'
          style={{ height: charactorHeight + "px" }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/screen-two-v2.png'
        />
        <Image
          className='flo-left'
          animation={leftFloAnimation}
          style={{
            height: floHeight + "px",
            width: floWidth + "px",
            left: -floWidth + "px"
          }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/left.png'
        />
        <Image
          className='flo-right'
          animation={rightFloAnimation}
          style={{
            height: floHeight + "px",
            width: floWidth + "px",
            right: -floWidth + "px"
          }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/right.png'
        />
      </View>
    );
  }
}

export default ScreenTwo;
