// убрать в миксин
interface MainMenu {
    file: string;
    edit: string;
    view: string;
    leftPanel: string;
    rightPanel: string;
    footerPanel: string;
    undo: string;
    redo: string;
    exit: string;
}

interface Config {
    new?: string;
    load?: string;
    save?: string;
    saveFile?: string;
    loadFile?: string;
}

export const menuConfig = {
    file: 'Файл',
    edit: 'Правка',
    view: 'Вид',
    undo: 'Отменить',
    redo: 'Повторить',
    leftPanel: 'Левая панель',
    rightPanel: 'Правая панель',
    footerPanel: 'Нижняя панель',
    exit: 'Выход',
};

export const configCMS: Config = {
    new: 'Новый проект',
    load: 'Загрузить проект',
    save: 'Сохранить',
    saveFile: 'Cохранить в файл',
    loadFile: 'Загрузить из файла',
};

export const configSEMD: Config = {
    new: 'Новый документ',
    load: 'Загрузить проект',
    save: 'Сохранить',
    saveFile: 'Cохранить в файл',
    loadFile: 'Загрузить из файла',
};

export const configFORM: Config = {
    new: 'Новый проект',
    load: 'Загрузить проект',
    save: 'Сохранить',
    saveFile: 'Cохранить в файл',
    loadFile: 'Загрузить из файла',
};
