<script setup>
    import { reactive, watch } from 'vue';
    import Loader from './Loader.vue';
    import { api } from '../api';
    import { store } from '../store';

    const fields = reactive({
        surname: '',
        email: '',
        phone: '',
        surnameError: null,
        emailError: null,
        phoneError: null,

        isSubmit: false,
        isTouch: false,
        isValid: false,
        isInValid: false,
    });

    const chaneInput = (e) => {
        fields[e.target.name] = e.target.value;
    };

    const submit = async () => {
        fields.isTouch = true;

        if (!fields.emailError && !fields.surnameError && !fields.phoneError) {
            fields.isSubmit = true;
            
            try {
                const res = await api.postUserData({
                    surname: fields.surname,
                    email: fields.email,
                    phone: fields.phone.slice(1),
                });
               
                store.checkWorkResult(res, fields);
            } catch(err) {
                console.log(err);
            } finally {
                fields.isSubmit = false;
            }
        }
    };

    watch(fields, (fields)=> {
        if (fields.isTouch ) {
            if (!fields.surname) {
                fields.surnameError = 'Это поле обязательно к заполнению';
            } 
            // else if (/[^a-zA-Z]/.test(fields.surname)) {
            //     fields.surnameError = 'Должно содержать только буквы';
            // } 
            else {
                fields.surnameError = null;
            }
            if (!fields.email) {
                fields.emailError = 'Это поле обязательно к заполнению';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fields.email)) {
                fields.emailError = 'Неверный адрес электронной почты';
            } else {
                fields.emailError = null;
            }

            if (!fields.phone) {
                fields.phoneError = 'Это поле обязательно к заполнению';
            } else if (fields.phone.replace(/\D/g, '').length < 11) {
                fields.phoneError = 'Неверный формат';
            } else {
                fields.phoneError = null;
            }
        }

        if (fields.surname && fields.email && fields.phone) {
            fields.isValid = true;
        }

        if (fields.phoneError || fields.emailError ||  fields.phoneError) {
            fields.isInValid = true;
        } else {
            fields.isInValid = false;
        }
    })
</script>

<template>
	<div :class="cn.block">
        <form @submit.prevent="submit" :class="cn.form">
            <label :class="[cn.label, fields.surname && cn.valid, fields.surnameError && cn.error]">
                <input 
                    type="text" 
                    name="surname" 
                    :value="fields.surname" 
                    :disabled="fields.isSubmit" 
                    @input="chaneInput"
                >
                <span>Фамилия автора<i>*</i></span>
            </label>
            <Transition name="fade">
                <span v-if="fields.surnameError" :class="cn.error">{{ fields.surnameError }}</span>
            </Transition>
            <label :class="[cn.label, fields.email && cn.valid, fields.emailError && cn.error]">
                <input
                    type="text"
                    name="email" 
                    :value="fields.email" 
                    :disabled="fields.isSubmit" 
                    @input="chaneInput"
                >
                <span>E-mail<i>*</i></span>
            </label>
            <Transition name="fade">
                <span v-if="fields.emailError" :class="cn.error">{{ fields.emailError }}</span>
            </Transition>
            <label :class="[cn.label, fields.phone && cn.valid, fields.phoneError && cn.error]">
                <input 
                    type="tel" 
                    name="phone" 
                    v-mask="'+7 (###) ###-####'"
                    :value="fields.phone"
                    :disabled="fields.isSubmit"
                    @input="chaneInput"
                >
                <span :style="{ opacity: fields.phone ? 1 : 0 }">Телефон<i>*</i></span>
                <span :style="{ opacity: !fields.phone ? 1 : 0 }">+7 ___ ___-__-__<i>*</i></span>
            </label>
            <Transition name="fade">
                <span v-if="fields.phoneError" :class="cn.error">{{ fields.phoneError }}</span>
            </Transition>
            <Transition name="fade">
                <button 
                    :class="[cn.btn, fields.isInValid && cn.disabled, fields.isSubmit && cn.is_loading]" 
                    v-if="fields.isValid"
                >
                    <Loader :cssClass="cn.loader" v-if="fields.isSubmit"/>
                    Подтвердить
                </button>
            </Transition>
        </form>
    </div>
</template>

<style scoped lang="scss" module="cn">
	.block {
        max-width: 300px;
        margin: 16px 0;
        margin-left: auto;
    }

    .form {
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
    }

    .label.valid {
        span {
            opacity: .5;
            transform: translateY(-150%);
            font-size: 10px;
        }
    }
    .label.error {
        border-color: #F00;
    }
    span.error {
        font-size: 12px;
        color: #F00;
    }
    .label {
        width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;        
        
        padding: 12px 15px;
        height: 56px;

        border-radius: 10px;
        border: 1px solid #E6E6E6;
        background: #FFF;
        transition: all .3s linear;

        span {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-52%);
            z-index: 10;

            color: #373A40;
            font-size: 16px;
            font-weight: 400;
            line-height: normal;
            transition: all .3s linear;
            i {
                color: #F00;
                margin-left: 2px;
            }
        }

        input {
            width: 100%; 
            color: #000;
            font-size: 16px;
            font-weight: 400;
            line-height: normal;

            &[name="phone"]:focus ~ span {
                &:nth-last-child(2) {
                    opacity: 1 !important;
                }

                &:nth-last-child(1) {
                    opacity: 0 !important;
                }
            }

            &:focus ~ span {
                opacity: .5;
                transform: translateY(-150%);
                font-size: 10px;
            }
        }
    }    

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .btn.is_loading,
    .btn.disabled {
        pointer-events: none;
        opacity: .5;
    }

    .btn.is_loading {
        color: transparent;
    }

    .btn {
        position: relative;
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

        &:hover:not(:active) {
            background-color: #b90c5d;
        }
    }
</style>