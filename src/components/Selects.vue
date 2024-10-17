<script setup>
    import { defineProps, defineEmits } from 'vue';
    const props = defineProps(['options']);
    const emit = defineEmits(['chooseScene']);
</script>

<template>
	<ul 
        :class="cn.render"
    >
        <li 
            v-for="option in options" 
            :key="option.id"
        >
            <button 
                v-if="!option.isLink"
                :class="cn.btn"
                @click="emit('chooseScene', option.value)"
            >
                {{ option.label }}
            </button>
            <a
                v-else
                :class="cn.btn"
                :href="option.value"
            >
                {{ option.label }}
            </a>
        </li>
    </ul>
</template>

<style scoped lang="scss" module="cn">
    .render {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        max-width: 341px;
        margin: 16px 0;
        margin-left: auto;
        gap: 6px;
        list-style-type: none;
        padding: 0;
        svg {
            margin-right: 12px;
        }
    }

    .btn {
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        line-height: 22.4px;
        color: var(--c-white);
        background-color: var(--c-pink);
        border-radius: 15px;
        border: 0;
        cursor: pointer;
        padding: 16px 20px;
        transition: all .3s linear;
        text-decoration: none;

        &:hover:not(:active) {
            background-color: #b90c5d;
        }
    }
</style>