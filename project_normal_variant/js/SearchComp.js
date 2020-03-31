Vue.component('search', {
    data() {
        return {
            searchText: '',
            filtered: [],
        }
    },
    methods: {
        filter(){
            let value = this.searchText;
            let products = this.$root.$refs.products.products;
            const regexp = new RegExp(value, 'i');
            this.filtered = products.filter(product => regexp.test(product.product_name));
            products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if(!this.filtered.includes(el)){
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent="filter">
                <input type="text" class="search-field" v-model.lazy="searchText">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
});
