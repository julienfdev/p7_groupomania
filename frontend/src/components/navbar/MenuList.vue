<template>
    <ul class="nav navbar-nav d-flex flex-grow-1 justify-content-end">
        <li v-for="item of items" :key="item.name">
            <router-link v-if="(item.showLog === logged) && !(!admin && item.hideNonAdmin)" class="nav-link" :class="{'active': item.active}"
                :to="item.root">
                {{item.text}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'MenuList',
        props: {
            items: {
                type: Array,
                required: true
            },
            logged: {
                type: Boolean,
                required: true
            },
            admin: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        font-size: 1.3em;
    }
</style>