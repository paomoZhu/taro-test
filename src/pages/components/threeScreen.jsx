import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "../index/index.less";

class ScreenThree extends Taro.Component {
  constructor(props) {
    super(props);

    this.state = {
      charactorHeight: 0,
      floHeight: 0,
      titleHeight: 0,
      animation: "",
      isAnimated: false
    };

    this.animation = "";
  }
  titleTransform() {
    const { charactorHeight, titleHeight } = this.state;
    this.animation.top(charactorHeight - titleHeight * 0.2 - 27 + 30).step();

    this.setState({
      animation: this.animation.export()
    });
  }

  shouldComponentUpdate(props, state) {
    const { screenThreeAnimate } = props;
    const { isAnimated } = state;
    if (screenThreeAnimate && !isAnimated) {
      this.setState(
        {
          isAnimated: true
        },
        () => {
          this.titleTransform();
        }
      );
    }
    return true;
  }

  componentDidMount() {
    Taro.getSystemInfo({
      success: res => {
        this.setState({
          charactorHeight: res.screenWidth / (750 / 756),
          floHeight: res.screenWidth / (750 / 511),
          titleHeight: (res.screenWidth / (704 / 171)) * 0.8
        });
      }
    });

    this.animation = Taro.createAnimation({
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
      duration: 500
    });
  }
  render() {
    const { charactorHeight, floHeight, titleHeight, animation } = this.state;
    const { screenThreeAnimate } = this.props;
    console.log(screenThreeAnimate);
    return (
      <View className='screen-three'>
        <Image
          className='charactor'
          style={{ height: charactorHeight + "px" }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/screen-three.png'
        />
        <Image
          className='title'
          animation={animation}
          style={{
            height: titleHeight + "px",
            top: charactorHeight - titleHeight * 0.2 - 27 + "px"
          }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/screen-three-title.png'
        />
        <Image
          className='flower'
          style={{ height: floHeight + "px" }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/bottom.png'
        />
      </View>
    );
  }
}

export default ScreenThree;
