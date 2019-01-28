import Taro from "@tarojs/taro";
import { Canvas, View, Image } from "@tarojs/components";
import "../index/index.less";
import momey from "../index/money.svg";
//https://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/money.svg

function Money(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;

  // this.draw = function(noClear, callback) {
  //   c.save();
  //   c.drawImage(pic, 0, 0, 50, 50, this.x, this.y, 50, 50);
  //   c.draw(noClear);
  //   c.restore();
  //   if (callback instanceof Function) {
  //     callback();
  //   }
  // };

  // this.update = function(noClear, callback) {
  //   // c.clearRect(this.x, this.y, size, size);/
  //   // if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
  //   //   this.dx = -this.dx * friction
  //   // }

  //   // if (this.y + this.radius + this.dy > canvas.height) {
  //   //   this.dy = -this.dy * friction
  //   // } else {
  //   //   this.dy += gravity
  //   // }
  //   this.x = this.x + this.dx;
  //   this.y = this.y + this.dy;
  //   this.draw(noClear, callback);
  // };
}

class Stars extends Taro.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: 300,
      canvasHeight: 150
    };
    this.ctx = null;
    this.coins = [];
  }

  random(a, b) {
    return Math.random() * (b - a) + a;
  }

  animate(context) {
    const { canvasWidth, canvasHeight } = this.state;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < this.coins.length; i++) {
      (index => {
        const coin = this.coins[index];
        coin.x += coin.dx;
        coin.y += coin.dy;
        context.drawImage(this.momey, 0, 0, 50, 50, coin.x, coin.y, 50, 50);
        console.log(index);
        context.draw(true, () => {
          console.log("draw over!");
          const timer = setTimeout(() => {
            this.animate.call(this, context);
            clearTimeout(timer);
          }, 17);
        });
      })(i);
      // this.coins[i].update();
    }
  }

  componentDidMount() {
    this.ctx = Taro.createCanvasContext("money-rain", this.$scope);
    Taro.downloadFile({
      url:
        "http://zhuzhunian-1258431382.cos.ap-shanghai.myqcloud.com/money.png",

      // "http://file-test.kaipao.cc/T3jzhTBydT1R4cSCrK.png",
      success: sres => {
        console.log(sres.tempFilePath);
        this.momey = sres.tempFilePath;

        Taro.getSystemInfo({
          //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
          success: res => {
            this.setState(
              {
                canvasWidth: res.windowWidth,
                canvasHeight: res.windowHeight
              },
              () => {
                for (var i = 0; i < 10; i++) {
                  this.coins.push(
                    new Money(
                      this.random(0, res.windowWidth),
                      this.random(0, res.windowHeight),
                      this.random(3, 6),
                      5
                    )
                  );
                }

                this.animate(this.ctx);
              }
            );
          }
        });
      },
      fail: function(fres) {
        console.log(fres);
      }
    });

    // setTimeout(() => {
    //   // this.animate(this.ctx);
    //   console.log(1);
    //   this.ctx.drawImage(momey, 100, 50, 50, 50);
    //   this.ctx.draw();
    // }, 1000);
  }
  render() {
    const { canvasWidth, canvasHeight } = this.state;
    const imageUrl = this.momey;
    return (
      <View>
        <Image style={{ width: "50px", height: "50px" }} src={imageUrl} />
        <Canvas
          canvasId='money-rain'
          style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }}
          className='modal'
        />
        {/* <Canvas
          canvasId='money-copy'
          style={{ width: "200PX", height: "200PX" }}
          className='modal-copy'
        /> */}
      </View>
    );
  }
}

export default Stars;
