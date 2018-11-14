<style scoped>
    .img-swipe-container {
        overflow: hidden;
        position: relative;
        height: 100%;
    }

    .img-swipe-wrap {
        overflow: hidden;
        position: relative;
        height: 100%;

        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }

    .img-index {
        position: absolute;
        z-index: 999;
        right: 10px;
        bottom: 10px;
        padding: 2px 3px;
        border-radius: 2px;
        line-height: 1;
        font-size: 10px;
        background-color: #fff;
    }

    .img-swipe-paginations {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%)
    }

    .img-swipe-pagination {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #fff;
        opacity: .3;
        margin: 0 3px
    }

    .img-swipe-pagination.is-active {
        background: #fff;
        opacity: .9;
    }

    .img-swipe-nav .isn-item {
        position: absolute;
        z-index: 999;
        top: 50%;
        margin-top: -19px;

        width: 38px;
        height: 38px;
        border-radius: 19px;
        background: rgba(31, 45, 61, .3);

        text-align: center;
    }

    .img-swipe-nav .isn-item:hover,
    .img-swipe-nav .isn-item:hover {
        cursor: pointer;
        background: rgba(31, 45, 61, .5)
    }

    .img-swipe-nav .prev-item {
        left: 10px;
    }

    .img-swipe-nav .next-item {
        right: 10px;
    }

    .img-swipe-nav .isn-arrow {
        margin-top: 15px;

        vertical-align: middle;
        display: inline-block;
        transform: rotate(-135deg);
        height: 10px;
        width: 10px;
        border-width: 1px 1px 0 0;
        border-color: #fff;
        border-style: solid;
    }

    .img-swipe-nav .left-arrow {
        margin-left: 5px;
        transform: rotate(-135deg);
    }

    .img-swipe-nav .right-arrow {
        margin-right: 5px;
        transform: rotate(45deg);
    }
</style>

<template>

    <div class="img-swipe-container" :style="{height:wrapHeight+'px'}">

        <div class="img-swipe-wrap">
            <slot></slot>
        </div>

        <div class="img-swipe-paginations" v-show="pagination">
            <div class="img-swipe-pagination"
                 v-for="(page, $index) in pages"
                 :class="{ 'is-active': $index === index }"></div>
        </div>

        <div class="img-swipe-nav" v-show="nav">
            <div class="isn-item prev-item" @click="prev">
                <i class="isn-arrow left-arrow"></i>
            </div>
            <div class="isn-item next-item" @click="next">
                <i class="isn-arrow right-arrow"></i>
            </div>
        </div>

        <div class="img-index" v-show="indexNum">
            {{index + 1}}/{{total}}
        </div>

    </div>
</template>

<script>
    import {once,addClass, removeClass} from './dom';

    export default {
        name: 'ImgSwipe',
        props: {
            speed: {
                type: Number,
                default: 300
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            autoPlayTimeout: {
                type: Number,
                default: 3000
            },
            autoHeight: {
                type: Boolean,
                default: true
            },
            continuous: {
                type: Boolean,
                default: true
            },
            pagination: {
                type: Boolean,
                default: true
            },
            nav: {
                type: Boolean,
                default: false
            },
            indexNum: {
                type: Boolean,
                default: false
            },
            prevent: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                ready: false,
                noDrag: false,
                dragging: false,
                userScrolling: false,
                animating: false,
                index: 0,
                total: 0,
                pages: [],
                timer: null,
                reInitTimer: null,
                wrapHeight: 'auto',
                autoInterval: null,

            }
        },
        created () {
            this.dragState = {};
        },
        mounted () {
            this.ready = true

            this.reInitPages()

            let element = this.$el
            element.addEventListener('touchstart', (event) => {
                if (this.prevent) {
                    event.preventDefault();
                }
                if (this.animating) return
                this.dragging = true
                this.userScrolling = false
                this.doOnTouchStart(event)
            })

            element.addEventListener('touchmove', (event) => {
                if (!this.dragging) return
                this.doOnTouchMove(event)
            })

            element.addEventListener('touchend', (event) => {
                if (this.userScrolling) {
                    this.dragging = false;
                    this.dragState = {};
                    return;
                }
                if (!this.dragging) return;
                this.doOnTouchEnd(event)
                this.dragging = false
            });

            this.autoHeightResize()

            if (this.autoPlay) {
                this.setAutoInterval()
            }

        },
        destroyed(){
            if (this.autoPlay) {
                clearInterval(this.autoInterval)
            }
            let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
            window.removeEventListener(resizeEvent, this.initAutoHeight, false);
        },
        computed: {
            pageWidth () {
                return document.documentElement.clientWidth
            }
        },
        methods: {
            swipeItemCreated () {
                if (!this.ready) return;
                clearTimeout(this.reInitTimer);
                this.reInitTimer = setTimeout(() => {
                    this.reInitPages()
                }, 100)
            },
            swipeItemDestroyed() {
                if (!this.ready) return
                clearTimeout(this.reInitTimer)
                this.reInitTimer = setTimeout(() => {
                    this.reInitPages()
                }, 100)
            },
            reInitPages () {
                let children = this.$children
                this.total = children.length

                this.noDrag = children.length === 1
                this.index = 0

                let pages = []
                children.forEach(function (child, index) {
                    pages.push(child.$el);
                    removeClass(child.$el, 'is-active')

                    if (index === 0) {
                        addClass(child.$el, 'is-active')
                    }
                })
                this.pages = pages

                this.initAutoHeight()
            },
            autoHeightResize(){
                let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
                window.addEventListener(resizeEvent, this.initAutoHeight, false);
            },
            initAutoHeight(){
                if (this.autoHeight) {
                    let currentPage = this.$children[this.index]
                    let img = currentPage.$el.querySelector('img')
                    this.getSize(img.src).then((img) => {
                        this.wrapHeight = this.$el.offsetWidth / (img.x / img.y)
                        this.$emit('on-height', this.wrapHeight)
                    })
                }
            },
            setAutoInterval(){
                if (this.autoPlay) {
                    clearInterval(this.autoInterval)
                    this.autoInterval = setInterval(() => {
                        this.next()
                    }, this.autoPlayTimeout)
                }
            },
            doOnTouchStart (event) {
                if (this.noDrag) return

                let element = this.$el
                let dragState = this.dragState
                let touch = event.touches[0]

                dragState.startTime = new Date()
                dragState.startLeft = touch.pageX
                dragState.startTop = touch.pageY
                dragState.startTopAbsolute = touch.clientY

                dragState.pageWidth = element.offsetWidth
                dragState.pageHeight = element.offsetHeight

                let prevPage = this.$children[this.index - 1]
                let dragPage = this.$children[this.index]
                let nextPage = this.$children[this.index + 1]

                if (this.continuous && this.pages.length > 1) {
                    if (!prevPage) {
                        prevPage = this.$children[this.$children.length - 1]
                    }
                    if (!nextPage) {
                        nextPage = this.$children[0]
                    }
                }

                dragState.prevPage = prevPage ? prevPage.$el : null
                dragState.dragPage = dragPage ? dragPage.$el : null
                dragState.nextPage = nextPage ? nextPage.$el : null

                if (dragState.prevPage) {
                    dragState.prevPage.style.display = 'block'
                }

                if (dragState.nextPage) {
                    dragState.nextPage.style.display = 'block'
                }
            },
            doOnTouchMove (event) {
                if (this.noDrag) return

                let dragState = this.dragState
                let touch = event.touches[0]

                dragState.currentLeft = touch.pageX
                dragState.currentTop = touch.pageY
                dragState.currentTopAbsolute = touch.clientY

                let offsetLeft = dragState.currentLeft - dragState.startLeft
                let offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute

                let distanceX = Math.abs(offsetLeft)
                let distanceY = Math.abs(offsetTop)
                if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
                    this.userScrolling = true
                    return
                } else {
                    this.userScrolling = false
                    event.preventDefault()
                }

                let max = Math.max(-dragState.pageWidth + 1, offsetLeft)
                offsetLeft = Math.min(max, dragState.pageWidth - 1);

                let towards = offsetLeft < 0 ? 'next' : 'prev'

                if (dragState.prevPage && towards === 'prev') {
                    this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth)
                }

                this.translate(dragState.dragPage, offsetLeft)

                if (dragState.nextPage && towards === 'next') {
                    this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth)
                }
            },
            doOnTouchEnd () {
                if (this.noDrag) return

                let dragState = this.dragState

                let dragDuration = new Date() - dragState.startTime
                let towards = null

                let offsetLeft = dragState.currentLeft - dragState.startLeft
                let offsetTop = dragState.currentTop - dragState.startTop
                let pageWidth = dragState.pageWidth
                let index = this.index
                let pageCount = this.pages.length

                if (dragDuration < 300) {
                    let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5
                    if (isNaN(offsetLeft) || isNaN(offsetTop)) {
                        fireTap = true
                    }
                    if (fireTap) {
                        this.$children[this.index].$emit('tap')
                    }
                }

                if (dragDuration < 300 && dragState.currentLeft === undefined) return;

                if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
                    towards = offsetLeft < 0 ? 'next' : 'prev'
                }

                if (!this.continuous) {
                    if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
                        towards = null
                    }
                }

                if (this.$children.length < 2) {
                    towards = null
                }

                this.doAnimate(towards, {
                    offsetLeft: offsetLeft,
                    pageWidth: dragState.pageWidth,
                    prevPage: dragState.prevPage,
                    currentPage: dragState.dragPage,
                    nextPage: dragState.nextPage
                })

                this.dragState = {}
            },
            next () {
                this.doAnimate('next')
            },
            prev () {
                this.doAnimate('prev')
            },
            doAnimate (towards, options) {
                if (this.$children.length === 0) return;
                if (!options && this.$children.length <= 1) return;

                let prevPage, nextPage, currentPage, pageWidth, offsetLeft;
                let speed = this.speed || 300;
                let index = this.index;
                let pages = this.pages;
                let pageCount = pages.length;

                if (!options) {
                    pageWidth = this.$el.clientWidth;
                    currentPage = pages[index];
                    prevPage = pages[index - 1];
                    nextPage = pages[index + 1];
                    if (this.continuous && pages.length >= 2) {
                        if (!prevPage) {
                            prevPage = pages[pages.length - 1];
                        }
                        if (!nextPage) {
                            nextPage = pages[0];
                        }
                    }
                    if (prevPage) {
                        prevPage.style.display = 'block';
                        this.translate(prevPage, -pageWidth);
                    }
                    if (nextPage) {
                        nextPage.style.display = 'block';
                        this.translate(nextPage, pageWidth);
                    }
                } else {
                    prevPage = options.prevPage;
                    currentPage = options.currentPage;
                    nextPage = options.nextPage;
                    pageWidth = options.pageWidth;
                    offsetLeft = options.offsetLeft;
                }

                let newIndex;
                let oldPage = this.$children[index].$el;

                if (towards === 'prev') {
                    if (index > 0) {
                        newIndex = index - 1;
                    }
                    if (this.continuous && index === 0) {
                        newIndex = pageCount - 1;
                    }
                } else if (towards === 'next') {
                    if (index < pageCount - 1) {
                        newIndex = index + 1;
                    }
                    if (this.continuous && index === pageCount - 1) {
                        newIndex = 0;
                    }
                }

                let callback = () => {
                    if (newIndex !== undefined) {
                        var newPage = this.$children[newIndex].$el;
                        removeClass(oldPage, 'is-active');
                        addClass(newPage, 'is-active');

                        this.index = newIndex;
                    }

                    if (prevPage) {
                        prevPage.style.display = '';
                    }

                    if (nextPage) {
                        nextPage.style.display = '';
                    }

                    if (this.autoPlay) {
                        this.setAutoInterval()
                    }

                    this.$emit('on-index', {
                        index: this.index,
                        total: this.total
                    })

                }

                setTimeout(() => {
                    if (towards === 'next') {
                        this.translate(currentPage, -pageWidth, speed, callback);
                        if (nextPage) {
                            this.translate(nextPage, 0, speed);
                        }
                    } else if (towards === 'prev') {
                        this.translate(currentPage, pageWidth, speed, callback);
                        if (prevPage) {
                            this.translate(prevPage, 0, speed);
                        }
                    } else {
                        this.translate(currentPage, 0, speed, callback);
                        if (typeof offsetLeft !== 'undefined') {
                            if (prevPage && offsetLeft > 0) {
                                this.translate(prevPage, pageWidth * -1, speed);
                            }
                            if (nextPage && offsetLeft < 0) {
                                this.translate(nextPage, pageWidth, speed);
                            }
                        } else {
                            if (prevPage) {
                                this.translate(prevPage, pageWidth * -1, speed);
                            }
                            if (nextPage) {
                                this.translate(nextPage, pageWidth, speed);
                            }
                        }
                    }
                }, 10);
            },
            translate(element, offset, speed, callback) {
                clearInterval(this.autoInterval)

                if (speed) {
                    this.animating = true;
                    element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
                    setTimeout(() => {
                        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
                    }, 50);

                    let called = false;

                    let transitionEndCallback = () => {
                        if (called) return;
                        called = true;
                        this.animating = false;
                        element.style.webkitTransition = '';
                        element.style.webkitTransform = '';
                        if (callback) {
                            callback.apply(this, arguments);
                        }

                        this.initAutoHeight();
                    };

                    once(element, 'webkitTransitionEnd', transitionEndCallback);
                    setTimeout(transitionEndCallback, speed + 100);
                } else {
                    element.style.webkitTransition = ''
                    element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
                }
            },
            getSize(src){
                return new Promise((resolve, reject) => {
                    var image = new Image();
                    image.onload = function () {
                        var image = this
                        resolve({
                            x: image.width,
                            y: image.height
                        })
                    }
                    image.src = src
                })
            },
        }
    }
</script>
