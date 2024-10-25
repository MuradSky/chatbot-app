<script setup>
    import { reactive } from 'vue';
    import Fancybox from './Fancybox.vue';
    const props = defineProps(['data']);
    const data = reactive(props.data.map((item, i) => ({
        ...item, id: i + 1,
        isMore: false,
    })));

    const showMore = (id) => {
        const item = data.find(item => item.id === id);
        item.isMore = true;
    }
</script>

<template>
    <div :class="cn.render">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#FFF4D0"/>
            <path d="M7.58203 18.1152L19.457 6.86523L17.1133 14.5996L23.832 15.6152L11.957 26.8652L14.2617 19.1699L7.58203 18.1152Z" fill="#FFC421"/>
        </svg>
        <div :class="cn.messages">
            <Fancybox
                :options="{
                    Carousel: {
                        infinite: false,
                    },
                }"
            >
                <div :class="cn.wrap" v-for="item in data" :key="item.id">
                    <div :class="cn.item" v-if="item.status">
                        🎉 Поздравляем! Ваша работа принята к участию в конкурсе
                    </div>
                    <div :class="cn.item" v-else-if="!item.status">
                        😟 К сожалению, ваша работа не прошла модерацию
                    </div>

                    <div :class="cn.image" v-if="item.status">
                        <a data-fancybox="gallery" :href="item.work">
                            <picture>
                                <img :src="item.work" alt="" :width="243" :height="162">
                            </picture>
                        </a>
                    </div>

                    <div :class="[cn.item, cn.fail]" v-else-if="!item.status">
                        <div :class="cn.image">
                            <picture>
                                <img :src="item.work" alt="" :width="243" :height="162">
                            </picture>

                            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.75 35C8.75 20.5025 20.5025 8.75 35 8.75C49.4976 8.75 61.25 20.5025 61.25 35C61.25 49.4976 49.4976 61.25 35 61.25C20.5025 61.25 8.75 49.4976 8.75 35Z" stroke="white" stroke-width="5.83333"/>
                                <path d="M26.25 26.25L43.75 43.75M43.75 26.25L26.25 43.75" stroke="white" stroke-width="5.83333" stroke-linecap="round"/>
                            </svg>
                        </div>

                        <div :class="[cn.desc, item.isMore && cn.isMore]">
                            {{ item.text }}
                        </div>

                        <button :class="cn.more" v-if="!item.isMore" @click="showMore(item.id)">
                            еще
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.593 15.8051C19.0376 15.4776 19.1326 14.8516 18.8051 14.4069C18.5507 14.0615 18.2963 13.7332 18.0731 13.4472C17.6276 12.8764 17.0143 12.1118 16.3479 11.3444C15.6859 10.5819 14.9518 9.79361 14.2666 9.18811C13.9251 8.88637 13.5721 8.60888 13.2279 8.4014C12.9112 8.21046 12.476 8 11.9999 8C11.5238 8 11.0885 8.21046 10.7718 8.4014C10.4276 8.60888 10.0747 8.88637 9.7332 9.18811C9.04791 9.79361 8.31387 10.5819 7.65183 11.3444C6.98548 12.1118 6.37216 12.8764 5.92664 13.4472C5.70347 13.7332 5.44902 14.0615 5.19463 14.4069C4.86712 14.8516 4.96211 15.4776 5.4068 15.8051C5.58556 15.9368 5.79362 16.0002 5.99982 16L11.9999 16L17.9999 16C18.2061 16.0002 18.4142 15.9368 18.593 15.8051Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </Fancybox>
        </div>
    </div>
</template>

<style scoped lang="scss" module="cn">
    .render {
        display: flex;
        align-items: flex-end;
        svg {
            margin-right: 12px;
        }
    }

    .wrap {
        &:not(:last-child) {
            margin-bottom: 32px;
        }
    }
    .item {
        background-color: var(--c-gray);
        border-radius: 10px;
        padding: 16px;

        &.is_image {
            max-width: 240px;
            padding: 0;
            background: transparent;
        }

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    .messages {
        flex: auto;
        max-width: 280px;
        min-width: 280px;
     
        display: flex;
        flex-direction: column;
    }

    .fail {
        .image {
            position: relative;
            opacity: .5;
            pointer-events: none;
            &::before {
                position: absolute;
                content: "";
                top: 0;
                left: 0;
                z-index: 10;
                width: 100%;
                height: 100%;
                background-color: rgba($color: #000000, $alpha: .3);
                border-radius: 10px;
            }

            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 100;
                transform: translate(-50%, -50%);
            }
        }
    }

    .image {
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
        }
    }

    .desc {
        margin-top: 16px;

        color: #373A40;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
       
        &:not(.isMore) {
             -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical; 
            overflow: hidden; 
        }
    }

    .more {
        margin-top: 24px;
        font-size: 14px;
        line-height: 120%;
        display: flex;
        align-items: center;
        gap: 2px;

        svg {
            transform: rotate(180deg);
            width: 10px;
            height: 10px;
        }
    }
</style>