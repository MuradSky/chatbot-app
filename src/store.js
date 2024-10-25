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
    workNotFound: null,
    worskSuccess: null,
    worksData: null,
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
    checkWorkResult(data, fields) {
        console.log(fields);
        console.log(data);

        if (data.message === 'Работы не найдены') {
            const result =`
                <span class="not-found-user">
                    <span>
                        Фамилия:
                        <b>${fields.surname}</b>
                    </span>
                    <span>
                        E-mail:
                        <b>${fields.email}</b>
                    </span>
                    <span>
                        Телефон:
                        <b>${fields.phone}</b>
                    </span>
                </span>
            `
            store.responseMessage = [
                ...messageVariants.checkWorkResult.notFound,
                result,
            ]
            store.worskSuccess = false;
            store.worksData = null;
            return;
        }

        if (data.success)  {
            store.worskSuccess = true;
            store.worksData = data.data;
        }
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