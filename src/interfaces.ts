export interface Panel {
    left?: number;
    right?: number;
    footer?: number;
}

export interface PanelResize {
    dir: string;
    val: number;
}

export interface StringString {
    [key: string]: string;
}

export interface KeyValue {
    [key: string]: string;
}

// Constructor CMS

export interface Selected {
    id: number;
    type: string;
}

export interface Screen {
    props: {
        id: number;
        name: string;
    };
    params: {
        type: string;
        X: number;
        Y: number;
        width: number;
        height: number;
    };
}

export interface Props {
    add_params: string | null;
    check_right: number | null;
    d_modif: string | null;
    d_start: string | null;
    f_fin: string | null;
    db_function_name: string | null;
    db_function_params: string | null;
    fields_list: string | null;
    name: string | null;
    fullname: string | null;
    description: string | null;
    group_number: number | null;
    gui_icon: string | null;
}

export interface ExtraProps extends Props {
    effect: number | null;
    look: number | null;
    id: number;
    systems_id: number;
    parent_id: number | null;
}

export interface CMS {
    params: {
        type: string;
        X: number;
        Y: number;
        height: number;
        width: number;
    };
    props: ExtraProps;
}

export interface WebLook {
    id: number;
    name: string;
    fullname: string;
}

export interface WebEffect {
    id: number;
    name: string;
    fullname: string;
}

export interface NumValue {
    [key: number]: string;
}

export interface PropType {
    [key: string]: {
        desc: string;
        type: string;
    };
}

export interface SetZoom {
    el: Element;
    e: WheelEvent;
    callback: (e: WheelEvent, x: number, y: number) => void;
}

interface SaveSnapshot {
    callback: () => void;
}

export interface AddCMS extends SaveSnapshot {
    item: CMS;
}

export interface SetCMSeffect extends SaveSnapshot {
    id: number;
    v: number;
}

export interface SetValue extends SaveSnapshot {
    id: number;
    key: string;
    v: string | number | null;
}

export interface SetPosition extends SaveSnapshot {
    id: number;
    x: number;
    y: number;
}

export interface SetCMSwidth {
    id: number;
    val: number;
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export interface FileLoad extends SaveSnapshot {
    file: HTMLInputEvent;
}

export interface GetWebLook {
    data: WebLook[];
}

export interface GetWebEffect {
    data: WebEffect[];
}

export interface GetCMSbyID extends SaveSnapshot {
    id: string;
}

export interface GetCMSlist {
    data: ExtraProps[];
}

export interface CmsStyle {
    'z-index': string;
    'top': string;
    'left': string;
    'width': string;
    'border-width': string;
}

export interface SetSize {
    event: MouseEvent;
    direction: string[];
}

export interface Drag {
    id: number;
    event: DragEventInit;
}

export interface Effect2creen {
    id: number;
    name: string;
    fullname: string;
    const_name: string;
}






