// 'use strict';
Vue.component('component-one', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut delectus, doloribus dolorum eaque expedita magni neque odio omnis quae quia quos, sapiente sint tenetur vero. Aliquam consectetur magnam provident?</div>`
});
Vue.component('component-two', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio omnis quae quia quos, sapiente sint tenetur vero. Aliquam consectetur magnam provident?</div>`
});
Vue.component('component-three', {
    template: `<div>Lorem ipsum dolor sit amet. Aliquam consectetur magnam provident?</div>`
});

const childElement = {
  name: 'child-element',
  template: '<p>some child element</p>'
};

Vue.component('some-el', {
    props: ['title', 'counter'],
    components: {
        childElement,
    },
    data() {
        return {
            name: 'Vasya',
        }
    },
    template: `<div>
                <div> {{ title }}</div>
                <slot>default</slot>
                <child-element></child-element>
                <div> {{ counter }}</div>
                <button @click="$emit('increase')">increase</button>
                <button @click="$parent.switchSlot()" v-if="$parent.switcher">Switch to default</button>
                <button @click="$parent.switchSlot()" v-else>Switch to slot</button>
                </div>`,
    mounted() {
        console.log(this);
    }
});
