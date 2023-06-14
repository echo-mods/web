export default defineI18nConfig(() => ({
    legacy: false,
    messages: {
        en: {
            hero_subtitle: "EMPOWERING Modders, STREAMLINING Modding.",
            done: "That's all Folks!",
            err_nf: "Looks like this page does not exist...",
            err_button: "Go home",
            req_true: "Requires orignial game",
            req_false: "Doesn't require original game",
            download_torrent: "Download using torrent"
        },
        ru: {
            hero_subtitle: "Привет!",
            done: "Всё!",
            err_nf: "А нету такой страницы, браточек!",
            err_button: "На домашнюю",
            req_true: "Требует Оригинал",
            req_false: "Не требует Оригинал",
            download_torrent: "Скачать с помощью torrent"
        },
    },
}));