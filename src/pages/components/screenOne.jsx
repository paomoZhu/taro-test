import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "../index/index.less";

class ScreenOne extends Taro.Component {
  constructor(props) {
    super(props);

    this.state = {
      topImageHeight: 0,
      charactorHeight: 0
    };
  }
  componentDidMount() {
    Taro.getSystemInfo({
      success: res => {
        this.setState({
          topImageHeight: res.screenWidth / (727 / 264),
          charactorHeight: res.screenWidth / (375 / 348)
        });
      }
    });
  }
  render() {
    const { topImageHeight, charactorHeight } = this.state;
    const { nickName, avatarUrl } = this.props;
    return (
      <View className='screen-one'>
        <Image
          className='top-image'
          style={{ height: topImageHeight + "px" }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/top.png'
        />
        <Image className='avatar' src={avatarUrl} />
        <Text className='username'>{nickName}</Text>
        <Text className='happy-new-year'>给您拜年啦～</Text>
        <Image
          className='charactor'
          style={{ height: charactorHeight + "px" }}
          src='http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/screen-one-v2.png'
        />
      </View>
    );
  }
}

export default ScreenOne;
