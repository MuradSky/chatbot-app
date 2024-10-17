<script setup>
	import { ref } from "vue";
	import ChatFrame from './components/ChatFrame.vue'
	const toggle = ref(false);
</script>

<template>
	<div class="chatbot">
		<ChatFrame v-if="toggle" />

		<button class="chatbot-call" @click="toggle=true" v-if="!toggle">
			<span>Задайте вопрос</span>
			<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M33.9168 17.8322C33.9168 25.977 27.0136 32.5809 18.5002 32.5809C17.4991 32.5821 16.501 32.4896 15.5177 32.305C14.8099 32.172 14.456 32.1056 14.209 32.1433C13.9619 32.181 13.6118 32.3672 12.9116 32.7396C10.9308 33.793 8.62109 34.165 6.39979 33.7518C7.24405 32.7134 7.82064 31.4674 8.07507 30.1317C8.22924 29.3147 7.84725 28.521 7.27512 27.9399C4.67655 25.3013 3.0835 21.7455 3.0835 17.8322C3.0835 9.68733 9.98674 3.0835 18.5002 3.0835C27.0136 3.0835 33.9168 9.68733 33.9168 17.8322Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
				<path d="M18.4932 18.5H18.5071M24.653 18.5H24.6668M12.3335 18.5H12.3473" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>

		<button class="chatbot-close" @click="toggle=false" v-if="toggle">
			<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M29.2923 7.70801L7.70898 29.2913M7.70898 7.70801L29.2923 29.2913" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>
</template>
<style global lang="scss">
	*, *::before, *::after {
		box-sizing: border-box;
	}

	body {
		margin: 0;
	}

	button {
		background: transparent;
		border: 0;
		padding: 0;
		cursor: pointer;
	}

	input {
		border: 0;
		padding: 0;
		background: transparent;
		outline: none !important;
	}

	.fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

	.not-found-user {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.congratulations-user {
		display: block;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 10px;
		}
	}

</style>
<style scoped lang="scss">
	.chatbot {
		position: fixed;
		bottom: 40px;
		right: 40px;
		z-index: 1000;

		--c-pink: #DD3C8D; 
		--c-white: #fff; 
		--c-violet: #8F5099; 
		--c-gray: #CAD9EE4D; 

		display: flex;
		flex-direction: column;
		align-items: flex-end;

		.chatbot-close {
			width: 71px;
			height: 71px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--c-violet);
			box-shadow: 0px 5px 20px 0px #00000029;
		}

		.chatbot-call {
			display: flex;
			align-items: center;
			background-color: var(--c-pink);
			
			font-family: Muller;
			font-size: 18px;
			font-weight: 500;
			line-height: 18px;
			text-align: left;
			color: var(--c-white);

			padding: 17px 17px 17px 24px;
			border-radius: 100px;
			box-shadow: 0px 5px 20px 0px #00000029;

			svg {
				width: 37px;
				height: 37px;
				margin-left: 14px;
			}
		}
	}

	
</style>