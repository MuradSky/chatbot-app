import { reactive, watch } from "vue";

const messageVariants = {
    greetings: ['👋 Здравствуйте! Ответим на ваши вопросы о статусе работы, о гарантированных подарках, условиях конкурса и многом другом.'],
    responseWork: {
        intro: ['👋 Чтобы узнать статус конкурсной работы, укажите данные, которые были внесены в анкету.'], 
        success: ['', '']
    },
    guaranteedGifts: ['Списки первых авторов, которые могут получить гарантированные подарки за успешное прохождение модерации опубликованы в наших социальных сетях:'],
    requirements: ['Выберите возрастную группу'],
    checkWorkResult: {
        notFound: ['🥺 Работа не найдена. Проверьте, правильно ли Вы указали все данные:'],
        congratulations: ['🎉 Поздравляем! Ваша работа принята к участию в конкурсе'],
        exception: ['😟 К сожалению, ваша работа не прошла модерацию'],
    }
}

const store = reactive({
    scene: 'breeding',
    scenes: ['breeding', 'guaranteed-gifts', 'requirements-for-works'],
    responseMessage: messageVariants.greetings,
    links: {
        contacts: '/contacts',
    },
    selected: {
        'breeding': [
            { id: 1, value: 'get-work-status', label: 'Статус работы', isLink: false },
            { id: 2, value: 'guaranteed-gifts', label: 'Гарантированные подарки', isLink: false },
            { id: 3, value: 'https://komusart.ru/o-konkurse/usloviya-uchastiya/', label: 'Условия участия', isLink: true },
            { id: 4, value: 'requirements-for-works', label: 'Требования к работам', isLink: false },
            { id: 5, value: '/', label: 'Нет нужного вопроса', isLink: true },
        ],
        'guaranteed-gifts': [
            { id: 1, value: '/', label: 'ВКонтакте - номинации для детей', isLink: true },
            { id: 2, value: '/', label: 'ВКонтакте - номинации для взрослых', isLink: true },
            { id: 3, value: '/', label: 'Телеграм - номинации для детей', isLink: true },
            { id: 4, value: '/', label: 'Телеграм - номинации для взрослых', isLink: true },
            { id: 5, value: '/', label: 'Одноклассники - номинации для детей', isLink: true },
        ],
        'requirements-for-works': [
            { id: 1, value: 'https://komusart.ru/o-konkurse/usloviya-uchastiya/#children ', label: 'Детские работы', isLink: true },
            { id: 2, value: 'https://komusart.ru/o-konkurse/usloviya-uchastiya/#adults', label: 'Работы авторов от 18 лет', isLink: true },
        ]
    },
    checkWorkResult(data, type) {
        store.scene = 'check-work-result';
        if (type === 'not-found') {
            const result =`
                <span class="not-found-user">
                    <span>
                        Фамилия:
                        <b>${data.surname}</b>
                    </span>
                    <span>
                        E-mail:
                        <b>${data.email}</b>
                    </span>
                    <span>
                        Телефон:
                        <b>${data.phone}</b>
                    </span>
                </span>
            `
            store.responseMessage = [
                ...messageVariants.checkWorkResult.notFound,
                result,
            ]
            return;
        };

        if (type === 'congratulations') {
            const result =`
                <span class="congratulations-user">
                    <img src="/image.png" alt="" width="243" height="162" />
                </span>
            `
            store.responseMessage = [
                ...messageVariants.checkWorkResult.congratulations,
                result,
            ]
            return;
        };

        if (type === 'exception') {
            const result =`
                <span class="exception-user">
                    Добрый день, Марина!
                    К сожалению ваша работа не одобрена для участия в конкурсе.
                    Lorem ipsum dolor sit amet. Eos assumenda dolor sed aspernatur earum qui reprehenderit illum eum officia assumenda. In velit accusantium qui perspiciatis nihil et facere accusamus. Et voluptas vero aut assumenda voluptate At accusantium aliquid.
                    Et quas aliquid ut assumenda velit et aperiam nihil sit necessitatibus vero vel galisum laborum. Qui perferendis nesciunt et dolorem asperiores et labore itaque et internos architecto?
                </span>
            `
            store.responseMessage = [
                ...messageVariants.checkWorkResult.exception,
                result,
            ]
            return;
        };
    }
});

watch(()=> store.scene, (val)=> {
    if (val === 'breeding') {
        store.responseMessage = messageVariants.greetings;
    }

    if (val === 'get-work-status') {
        store.responseMessage = messageVariants.responseWork.intro;
    }

    if (val === 'guaranteed-gifts') {
        store.responseMessage = messageVariants.guaranteedGifts;
    }

    if (val === 'requirements-for-works') {
        store.responseMessage = messageVariants.requirements;
    }
});

export { store };