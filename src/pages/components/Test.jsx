import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";

@inject("counterStore")
@observer
class Test extends Taro.Component {
  increment() {
    const { counterStore } = this.props;
    counterStore.increment();
  }

  decrement = () => {
    const { counterStore } = this.props;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { counterStore } = this.props;
    counterStore.incrementAsync();
  };

  render() {
    const { name } = this.props;

    const {
      counterStore: { counter }
    } = this.props;

    return (
      <View>
        <View>hahah, {name}</View>
        <View className='index'>
          <Button onClick={this.increment}>+</Button>
          <Button onClick={this.decrement}>-</Button>
          <Button onClick={this.incrementAsync}>Add async</Button>
          <Text>{counter}</Text>
        </View>
      </View>
    );
  }
}

Test.defaultProps = {
  name: "default"
};

export default Test;
