<template>
    <div class="image-picker">
        <div class="image-picker-preview">
            <div class="image-picker-img">
                <img :src="preview">
            </div>
            <div class="image-picker-info">
                <span class="image-picker-name">{{name}}</span>
                <span class="image-picker-size">{{size}}</span>
                <input 
                    class="image-picker-button"
                    type="button" 
                    :disabled="(val === '')" 
                    value="Выбрать" 
                    @click="ModalBox = true, getSize()"
                    :style="{
                        cursor: (val === '') ? 'not-allowed' : 'pointer',
                    }"
                >
            </div>
        </div>
        <modal-box v-if="ModalBox" :width="60" :height="80">
            <template slot="header">
                <div class="img-picker-header">
                    <span class="modal-header">Выберите изображение</span>
                    <close-button @close="ModalBox = false"/>
                </div>
            </template>
            <div class="image-list">
                <div class="image-item" v-for="(img, index) of cards" :key="index" @click="selected = index" :class="{'image-item-selected': index === selected}">
                    <div class="image-item-img">
                        <img :src="img.src" :alt="img.name">
                    </div>
                    <span class="image-item-name">{{img.name}}</span>
                    <div class="image-item-size">{{img.size}}</div>
                </div>
            </div>
            <template slot="footer">
                <div class="modal-grp-button">
                    <input type="button" class="modal-button modal-button-accept" :disabled="(selected === -1)" value="Выбор" @click="ModalBox = false, $emit('change', cards[selected].name)">
                    <input type="button" class="modal-button modal-button-cancel" value="Отмена" @click="ModalBox = false, selected = -1" >
                </div>
            </template>
        </modal-box>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ModalBox from '@/components/PanelModalBox.vue';
import { mapGetters } from 'vuex';
import CloseButton from '@/components/PanelCloseButton.vue';

interface Card {
    src: string;
    name: string;
    size: string;
}

@Component({
    components: { ModalBox, CloseButton },
    props: { val: { default: null }},
    computed: {...mapGetters('CMS', { images: 'getImages'})},
})

export default class ImagePicker extends Vue { 
    public val!: string;
    public ModalBox: boolean = false;
    public images!: string[];
    public cards: Card[] = new Array();
    public selected: number = -1;

    public async getSize(index: number) {
        let img: any = new Image();
        img.src = location + this.images[index];
        const load: Promise<string> = new Promise(resolve => {
            img.onload = function(){
                resolve(`${this.naturalWidth} x ${this.naturalHeight}`);
            }
        })
        return await load;
    }

    public getName(index: number): string {
        const arr = this.images[index].split('/');
        const name = arr[arr.length - 1];
        return name;
    }

    public created(): void {
        for (let i = 0; i < this.images.length; i++) {
            (async () => {
                const size: string = await this.getSize(i);
                const name = this.getName(i);
                this.cards.push({
                    src: this.images[i],
                    size: size,
                    name: name,
                })
            })();
        }
        // console.log(this.cards)
    }

    public get getSelected(): number {
        const index = this.cards.findIndex((card: Card) => card.name === this.val);
        if (index === -1) { return -1; } else { return index; }
    }

    public get preview(): string {
        return this.getSelected !== -1 ? this.cards[this.getSelected].src : this.empty;
    }

    public get size(): string {
        return this.getSelected !== -1 ? this.cards[this.getSelected].size : 'Не задан'
    }

    public get name(): string {
        return this.getSelected !== -1 ? this.cards[this.getSelected].name : 'Не задан';
    }

    public get empty(): string {
        return require(`@/assets/not_found.jpg`);
    }
}
</script>

<style lang="scss" scoped>
    .image-picker {
        width: 100%;
        border: 1px solid #fff;
        box-sizing: border-box;
        background-color: #fff;
        padding: 0 !important;

        &-img {
            flex: 0 1 auto;
            background-color: #fff;
            width: 120px;
            height: 120px;
            padding: 5px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;

            & > img {
                display: block;
                max-width: 100%;
                max-height: 100%;
                height: auto;
                box-sizing: border-box;
                object-fit: cover;
            }
        }

        &-preview {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
        }

        &-info {
            flex: 1 1 auto;
            display: flex;
            flex-flow: column nowrap;
            box-sizing: border-box;
            align-items: stretch;
            overflow: hidden;
        }

        &-name {
            background-color: $colorDark;
            height: 33%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 5px;
            box-sizing: border-box;
            border: 2px solid #fff;

        }
        
        &-size {
            background-color: $colorDark;
            height: 33%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 5px;
            box-sizing: border-box;
            border: 2px solid #fff;
        }

        &-button {
            background-color: $colorGrey;
            width: 100%;
            border: 2px solid #fff;
            color: $colorDark;
            height: 33%;
            font-size: 16px;
            font-weight: bold;
            outline: none;
            cursor: pointer;
        }
    }

    .modal {

        .img-picker-header {
            display: flex;
            justify-content: space-between;
        }

        &-header {
            box-sizing: border-box;
        }

        &-grp-button {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }

        &-button {
            box-sizing: border-box;
            padding: 10px;
            margin: 5px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
            outline: none;

            &-cancel {
                background-color: lighten(red, 20%);
                border: 1px solid lighten(red, 10%);

                &:hover {
                    background-color: lighten(red, 10%);
                }
            }

            &-accept {
                background-color: lighten(green, 40%);
                border: 1px solid lighten(green, 20%);

                &:hover {
                    background-color: lighten(green, 20%);
                }
            }
        }
    }

    .image {
        &-list {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            user-select: none;
        }

        &-item {
            width: 100px;
            border: 1px solid transparent;
            margin: 10px;
            box-sizing: border-box;
            color: $colorDark;
            font-size: 12px;

            &:hover {
                background-color: $colorGreen;
                border: 1px solid $colorGreen;
                color: #fff;
            }

            &-selected {
                background-color: $colorDark;
                border: 1px solid $colorDark;
                color: #fff;
            }

            &-img {
                box-sizing: border-box;
                overflow: hidden;
                width: 98px;
                height: 98px;
                padding: 2px;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;

                & > img {
                    display: block;
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: cover;
                }
            }

            &-name {
                box-sizing: border-box;
                padding: 2px 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow-wrap: break-word;
                width: 98px;
                overflow: hidden;
                word-break: break-all;
            }

            &-size {
                box-sizing: border-box;
                padding: 2px 4px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }  
    }
</style>
