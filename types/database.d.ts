const Platforms = {
    "soc": "Тень Чернобыля",
    "cs": "Чистое Небо",
    "cop": "Зов Припяти"
} as const

type Platform = keyof typeof Platforms

interface Version {
    downloadURL: string, // Ссылка на ZIP архив с модом
    versionString: string, // Фактическая версия мода (Например "v1.3.2")
    changes: string, // Возможно описание изменений в markdown / html
}

interface Tag {
    
}

export interface Mod {
    name: string, // Название мода
    description: string, // Описание мода
    rating: number, // Рейтинг (на данный момент) от 0 до 10
    imageURL: string, // URL основной "обложки" мода
    socialLink: string[], // Ссылки на ресурсы мода (не реализованно)
    content: string[], // Массив ссылок на картинки и/или ID видео на ютуб (Например "iRbeC_BbMqM"),
    versions: Version[], // См. интерфейс "Version" (Индекс в массиве равен "versionIndex" в _mods.json)
    archiveType: string, // Пока что поддерживается только "zip"
    standalone: boolean, // При значении true: мод не требует оригинальную игру
    platform: Platform, // ID требуемой игры
    tags: Tag[],
}