<script setup>
    defineProps(['message']);
</script>

<template>
	<div :class="cn.render">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#FFF4D0"/>
            <path d="M7.58203 18.1152L19.457 6.86523L17.1133 14.5996L23.832 15.6152L11.957 26.8652L14.2617 19.1699L7.58203 18.1152Z" fill="#FFC421"/>
        </svg>
        <div :class="cn.messages">
            <div :class="[cn.item, item.includes('img') && cn.is_image]" v-for="(item, i) in message" :key="i">
                <div :class="cn.message" v-html="item"/>
            </div>
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
            margin-bottom: 16px;
        }
    }

    .messages {
        flex: auto;
        max-width: 280px;
        min-width: 280px;
     
        display: flex;
        flex-direction: column;
    }
</style>