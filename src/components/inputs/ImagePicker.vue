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
                <div class="image-item" @click="selected = -1" :class="{'image-item-selected': -1 === selected}">
                    <div class="image-item-img">
                        <img :src="empty" :alt="'Не задан'">
                    </div>
                    <span class="image-item-name">Не задан</span>
                    <div class="image-item-size">0 х 0</div>
                </div>
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
                    <input type="button" class="modal-button modal-button-accept" value="Выбор" @click="ModalBox = false, select()">
                    <input type="button" class="modal-button modal-button-cancel" value="Отмена" @click="ModalBox = false" >
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
    public selected: number = this.value;

    public get value(): number {
        return this.cards.findIndex((el: any) => el.name === this.val);
    }

    public async getSize(index: number) {
        let img: any = new Image();
        const images = this.$store.getters['CMS/getImages'];
        img.src = 'http://172.16.1.48:9000/assets/images/' + images[index];
        const load: Promise<string> = new Promise(resolve => {
            img.onload = function(){
                resolve(`${this.naturalWidth} x ${this.naturalHeight}`);
            }
        })
        return await load;
    }

    // public getName(index: number): string {
    //     const images = this.$store.getters['CMS/getImages'];
    //     // const arr = this.images[index].split('/');
    //     const name = images[index][images[index].length - 1];
    //     return name;
    // }

    public async created(): Promise<any> {
        await this.$store.dispatch('CMS/asyncGetImages', 'D:\\svn\\images');
        const images = this.$store.getters['CMS/getImages'];
        const src = 'http://172.16.1.48:9000/assets/images/'
        if (images) {
            for (let i = 0; i < images.length; i++) {
                (async () => {
                    const img = images[i];
                    const size: string = await this.getSize(i);
                    // const name = this.getName(i);
                    this.cards.push({
                        src: src + img,
                        size: size,
                        name: img,
                    })
                })();
            }
        }
        // console.log (this.cards);
        
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
        // return 'd:/svn/images/accept.png'
    }

    public select() {
        console.log(this.selected);
        if (this.selected === -1) {
            this.$emit('change', null);
        } else if (this.selected >= 0) {
            this.$emit('change', this.cards[this.selected].name);
        } else {
            console.log('неверный индекс')
        };
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
            flex: 1 1 auto;
            // background-color: red;
           background-image:
                linear-gradient(45deg, rgba(20, 20, 20, 0.2) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(20, 20, 20, 0.2) 75%),
                linear-gradient(45deg, transparent 75%, rgba(20, 20, 20, 0.2) 75%),
                linear-gradient(45deg, rgba(20, 20, 20, 0.2) 25%, transparent 25%);    
            background-size:10px 10px;       
            background-position:0 0, 0 0, -5px -5px, 5px 5px;
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
            flex: 1000 1 auto;
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
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding: 5px;
            box-sizing: border-box;
            border: 2px solid #fff;
            // line-height: 23px;
            // vertical-align: 15px;

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

                & > .image-item-img {
                    background-image: none;
                    background-color: #fff;
                }
            }

            &-selected {
                background-color: $colorDark;
                border: 1px solid $colorDark;
                color: #fff;

                & > .image-item-img {
                    background-image: none;
                    background-color: #fff;
                }
            }

            &-img {
                box-sizing: border-box;
                overflow: hidden;
                width: 98px;
                height: 98px;
                padding: 2px;
                // background-color: #fff;
                background-image:
                    linear-gradient(45deg, rgba(20, 20, 20, 0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(20, 20, 20, 0.1) 75%),
                    linear-gradient(45deg, transparent 75%, rgba(20, 20, 20, 0.1) 75%),
                    linear-gradient(45deg, rgba(20, 20, 20, 0.1) 25%, transparent 25%);    
                background-size:10px 10px;       
                background-position:0 0, 0 0, -5px -5px, 5px 5px;
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
