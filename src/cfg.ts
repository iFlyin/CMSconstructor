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
}

interface Config {
    file: string;
    edit: string;
    view: string;
    new: string;
    load: string;
    save: string;
    saveFile: string;
    loadFile: string;
    exit: string;
    undo: string;
    redo: string;
    leftPanel: string;
    rightPanel: string;
    footer: string;
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
};

export const configCMS: Config = {
    file: 'Файл',
    edit: 'Правка',
    view: 'Вид',
    new: 'Новый проект',
    load: 'Загрузить проект',
    save: 'Сохранить',
    saveFile: 'Cохранить в файл',
    loadFile: 'Загрузить из файла',
    exit: 'Выход',
    undo: 'Отменить',
    redo: 'Повторить',
    leftPanel: 'Левая панель',
    rightPanel: 'Правая панель',
    footer: 'Нижняя панель',
};

export const configSEMD: Config = {
    file: 'Файл',
    edit: 'Правка',
    view: 'Вид',
    new: 'Новый документ',
    load: 'Загрузить проект',
    save: 'Сохранить',
    saveFile: 'Cохранить в файл',
    loadFile: 'Загрузить из файла',
    exit: 'Выход',
    undo: 'Отменить',
    redo: 'Повторить',
    leftPanel: 'Левая панель',
    rightPanel: 'Правая панель',
    footer: 'Нижняя панель',
};

export const configFORM: Config = {
    file: 'Файл',
    edit: 'Правка',
    view: 'Вид',
    new: 'Новый проект',
    load: 'Загрузить проект',
    save: 'Сохранить',
    saveFile: 'Cохранить в файл',
    loadFile: 'Загрузить из файла',
    exit: 'Выход',
    undo: 'Отменить',
    redo: 'Повторить',
    leftPanel: 'Левая панель',
    rightPanel: 'Правая панель',
    footer: 'Нижняя панель',
}
