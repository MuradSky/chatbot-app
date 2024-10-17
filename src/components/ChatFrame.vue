<script setup>
    import { store } from '../store';
    import RenderMessage from './RenderMessage.vue';
    import Selects from './Selects.vue';
    import ConfirmForm from './ConfirmForm.vue';
    
    const chooseScene = (value) => {
        store.scene = value;
    };

    const toBack = () => {
        if (store.scene !== 'breeding') {
            store.scene = 'breeding';
        };
    };

</script>

<template>
	<div :class="cn.frame">
        <header :class="[cn.header, store.scene !== 'breeding' && cn.is_pointer]" @click="toBack">
            <svg v-if="store.scene !== 'breeding'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L20 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Задайте вопрос
        </header>

        <div :class="cn.chat">
            <RenderMessage :message="store.responseMessage" />
            <Selects 
                v-if="store.scenes.includes(store.scene)" 
                :options="store.selected[store.scene]"
                @chooseScene="chooseScene"
            />
            <ConfirmForm 
                v-if="store.scene === 'get-work-status'"
            />
        </div>

        <div :class="cn.link">
            <a :href="store.links.contacts">Остались ещё вопросы?</a>
        </div>
    </div>
</template>

<style scoped lang="scss" module="cn">
	.frame {
        min-width: 422px;
        max-width: 422px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 5px 14px 80px 0px #1A1A1A1F, 10px 10px 40px 0px #00000014;
        margin-bottom: 20px;
    }

    .header {
        font-size: 18px;
        font-weight: 500;
        line-height: 18px;
        padding: 26px 20px;
        color: var(--c-white);
        background-color: var(--c-pink);
        display: flex;
        align-items: center;

        svg {
            margin: -5px 10px -5px 0;
        }
        &.is_pointer {
            cursor: pointer;
        }
    }
    .chat {
        max-height: 560px;
        min-height: 560px;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 20px;
        }
        
        &::-webkit-scrollbar-track{
            background: #E3E3E3;
            border-left: 9px solid white;
            border-right: 9px solid white;
        }
        
        &::-webkit-scrollbar-thumb{
            background: #E3E3E3;
            border-left: 8px solid white;
            border-right: 8px solid white;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-button {
            display:none
        }
    }

    .link {
        padding: 20px;
        display: flex;
        justify-content: flex-end;
        a {
            display: inline-block;
            font-size: 16px;
            font-weight: 400;
            line-height: 16px;
            padding: 16px 20px;
            background: linear-gradient(180deg, #F7F9FC 0%, #E4ECF6 100%);
            border-radius: 10px;
            text-decoration: none;
            color: #008894;
            transition: all .3s linear;
            &:hover {
                background: linear-gradient(0deg, #F7F9FC 0%, #E4ECF6 100%);
            }
        }
    }
</style>