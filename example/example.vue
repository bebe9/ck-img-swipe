<style>
    *{
        margin: 0;
        padding: 0;
    }
    body {
        font-family: "Helvetica Neue", Helvetica, "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 14px;
        line-height: 1.428571429;
        color: #333;
        background-color: #f9f9f9;
    }
    .example {
        width: 100%;
        max-width: 500px;
        margin: 50px auto;
        color: #333;
    }
    .my-panel {
        margin-bottom: 50px;
        background-color: #FFFFFF;
        position: relative;
        box-shadow: 2px 3px 4px rgba(0, 0, 0, .06);
    }

    .desc{
        text-align: center;
        margin-bottom: 20px;
    }

    .desc h1{
        color: #333;
        font-size: 28px;
        margin-bottom: 20px;
        font-weight: 500;
    }
    .desc p{
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
    }

    .desc a{
        color: #09f;
    }


    .hd {
        padding: 15px;
        color: #333;
    }
</style>

<template>

    <div class="example">

        <div class="desc">
            <h1>ck-img-swipe</h1>
            <p>基于 Vue2.x 开发的图片轮播组件。支持手机版PC版。完美支持 自动轮播、无限轮播、手势切换轮播、自适应高度、上一页下一页切换、索引指示、小圆点分页指示等常用功能。</p>

            <a href="https://github.com/bebe9/ck-img-swipe" target="_blank">说明文档</a>
        </div>

        <div class="my-panel">
            <div class="hd">基本用法,默认自动计算高度</div>
            <div class="bd">
                <img-swipe>
                    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
                </img-swipe>
            </div>
        </div>

        <div class="my-panel">
            <div class="hd">自定义高度，需配置:auto-height="false"</div>
            <div class="bd">
                <img-swipe :auto-height="false" style="height: 100px">
                    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
                </img-swipe>
            </div>
        </div>

        <div class="my-panel">
            <div class="hd">自动播放 :auto-play="true"</div>
            <div class="bd">
                <img-swipe :auto-play="true">
                    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
                </img-swipe>
            </div>
        </div>

        <div class="my-panel">
            <div class="hd">显示上下页切换按钮 :nav="true"</div>
            <div class="bd">
                <img-swipe :nav="true">
                    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
                </img-swipe>
            </div>
        </div>

        <div class="my-panel">
            <div class="hd">隐藏分页小原点 :pagination="false"</div>
            <div class="bd">
                <img-swipe :pagination="false">
                    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
                </img-swipe>
            </div>
        </div>

        <div class="my-panel">
            <div class="hd">显示页号  :indexNum="true"</div>
            <div class="bd">
                <img-swipe :indexNum="true">
                    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
                </img-swipe>
            </div>
        </div>


        <div class="my-panel">
            <div class="hd">event</div>
            <div class="bd">
                <img-swipe @on-index="showInfo">
                    <img-swipe-item><img src="./img/1.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/2.jpg"></img-swipe-item>
                    <img-swipe-item><img src="./img/3.jpg"></img-swipe-item>
                </img-swipe>
                <p v-if="info">当前{{info.index}},共{{info.total}}张图片</p>
            </div>
        </div>

    </div>
</template>

<script>
    import {ImgSwipe, ImgSwipeItem} from '../src'
    export default {
        name: 'Example',
        components: {ImgSwipe, ImgSwipeItem},
        data(){
            return {
                info: ''
            }
        },
        methods: {
            showInfo(info){
                this.info = info
            }
        }
    }
</script>
