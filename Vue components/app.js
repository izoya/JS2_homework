'use strict';
const app = new Vue({
    el: "#app",
    data: {
        someString: 'Hello!',
        counter: 0,
        switcher: true,
        tabs:['one', 'two', 'three'],
        currentTab: 'one'

    },
    methods: {
        increase() {
            this.counter++;
        },
        switchSlot() {
            this.switcher = !this.switcher;
        }
    },
    computed: {
        currentComponent() {
            return `component-${this.currentTab}`;
        }
    },
    mounted() {
        console.log(this);
    }
});
