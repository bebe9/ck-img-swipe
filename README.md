# ck-img-swipe

A flexible, excellent and smart img swipe component for pc and mobile.

based on vue2.x

基于 Vue2.x 开发的图片轮播组件。支持手机版PC版。
完美支持 自动轮播、无限轮播、手势切换轮播、自适应高度、上一页下一页切换、索引指示、小圆点分页指示等常用功能。

[在线演示](https://bebe9.github.io/ck-img-swipe/)

[说明文档](https://github.com/bebe9/ck-img-swipe)

## Example

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
and then browse to http://localhost:8080


## Import

Import components to your project:

Registe global component in main.js:

``` js
import {ImgSwipe,ImgSwipeItem} from 'ck-img-swipe'

Vue.component('img-swipe', ImgSwipe);
Vue.component('img-swipe-item', ImgSwipeItem);
```

Registe component in page:

``` js
import {ImgSwipe,ImgSwipeItem} from 'ck-img-swipe'

export default {
  components: { ImgSwipe, ImgSwipeItem }
}

```

## Usage

``` html
//基本用法,切换时默认会根据图片自动计算高度

<img-swipe>
    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
</img-swipe>
```

``` html
// 自定义高度，需配置:auto-height="false"

<img-swipe :auto-height="false" style="height: 100px">
    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
</img-swipe>
```

``` html
// 自动播放 :auto-play="true"

<img-swipe :auto-play="true">
    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
</img-swipe>
```


``` html
//显示上下页切换按钮 :nav="true"

<img-swipe :nav="true">
    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
</img-swipe>
```


``` html
// 隐藏分页小原点 :pagination="false"

<img-swipe :pagination="false">
    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
</img-swipe>
```

``` html
// 显示页号  :indexNum="true"

<img-swipe :indexNum="true">
    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
</img-swipe>
```

``` html

//切换时回调事件 @on-index="showInfo"

<img-swipe @on-index="showInfo">
    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
</img-swipe>

//js
export default {
    methods: {
        showInfo(info){
            this.info = info
        }
    }
}
```


## Options

### Props

| Option | Type | Description | Default |
| ----- | ----- | ----- | ----- |
| speed | Number | 图片切换速度 | 300 |
| autoPlay | Boolean | 是否自动播放 | false |
| autoPlayTimeout | Number | 自动播放时间间隔 | 3000 |
| autoHeight | Boolean | 切换时是否根据图片高度自动更新组件高度 | true |
| continuous | Boolean | 无限循环播放 | true |
| pagination | Boolean | 显示小圆点 pagination| true |
| nav | Boolean | 是否显示上一张，下一张按钮 | false |
| indexNum | Boolean | 是否显示 1/5 | false |
| prevent | Boolean | `preventDefault` 触摸事件开始时阻止默认事件 | false |

### Events

| Option  | Description | 	回调参数 |
| ----- | ----- |----- |
| on-index | 图片切换时候触发 | {index:1,total:5} index:当前索引  total:图片数量 |

## Thanks

- [ElemeFE/vue-swipe](https://github.com/ElemeFE/vue-swipe)

## License

The plugin is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Contact

Author:ck

Email:bebe8@qq.com

## 安装失败解决方法


``` js
# 卸载本地安装的webpack-cli，全局安装webpack-cli：
npm uninstall webpack-cli
npm install -g webpack-cli

npm i

```
