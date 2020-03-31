Vue.component('err', {
    data() {
        return {

        }
    },
    template: `<div class="error">
                <p>Ошибка загрузки данных. Текст ошибки: </p>
                <p> {{ $root.loadError }} </p>
                 </div>`
});
