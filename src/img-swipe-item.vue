<style scoped>
    .img_swipe_item {
        position: absolute;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        width: 100%;
        height: 100%;
        display: none;

    }
    .img_swipe_item img {
        display: block;
        width: 100%;
        height: 100%;
        background-color: #f9f9f9;
    }
    .img_swipe_item.is-active {
        display: block;
        -webkit-transform: none;
        transform: none;
    }
</style>

<template>
    <div class="img_swipe_item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ImgSwipeItem',
        mounted() {
            this.$parent && this.$parent.swipeItemCreated(this);
        },
        destroyed() {
            this.$parent && this.$parent.swipeItemDestroyed(this);
        }
    }
</script>

