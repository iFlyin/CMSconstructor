<template>
    <table>
        <thead>
            <tr>
                <th v-for="(key, index) of thead" :key="index" class="table-header">
                    {{key}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) of table" :key="index">
                <td v-for="(key, index) of thead" :key="index">
                    {{row[key]}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

sc
