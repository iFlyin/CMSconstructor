<template>
    <div class="text-editor">
        <editor
            v-model="content"
            @init="editorInit" 
            lang="sqlserver" 
            :theme="theme" 
            width="100%" height="100%"
            :options="{
                tab: 10,
            }"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import editor from 'vue2-ace-editor';

@Component({
    components: { editor }
})
export default class TextEditor extends Vue {
    public content: string = 

        `WITH RECURSIVE r AS ( 
        select 1 AS level, coalesce(cast (parent_id as varchar), '...') as parent_id_, cms.name as name_, cms.description as description_, cms.* from tec.cms 
        where parent_id is null

        UNION 

        SELECT 
        r.level + 1 AS level, r.parent_id_ || ' {>} ' || cms.parent_id as parent_id_, r.name_ || ' {>} ' || cms.name as name_, r.description_ || ' {>} ' || cms.description as description_, cms.*
        FROM tec.cms as cms
        join r on cms.parent_id = r.id

        )
        SELECT id, parent_id, parent_id_, level, group_number, description_, name_, db_function_name, db_function_params, fields_list, look || ' - ' ||(select const_name || ' (' || name || ')' from tec.constants where manual = 'web_look' and const_value = cast(r.look as varchar)), effect || ' - ' ||(select const_name || ' (' || name || ')' from tec.constants where manual = 'web_effect' and const_value = cast(r.effect as varchar)), add_params FROM r
        order by systems_id, description_, parent_id_;
        `;
    public content2: string = 'QwertyFun2';
    public theme: string = 'sqlserver';

    public editorInit(editor: any) {
        editor.session.setTabSize(3);
        editor.setShowPrintMargin(false);
        require('brace/ext/language_tools');
        require('brace/mode/sqlserver');          
        require(`brace/theme/${this.theme}`);
        require('brace/snippets/javascript');
    }


}
</script>

<style lang="scss" scoped>
    .text-editor {
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-sizing: border-box;
        border-top: 2px solid $colorDark;
    }
</style>

