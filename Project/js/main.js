const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    goods: [],
    filtered: [],
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x100',
    searchText: '',
    isVisibleCart: false,
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

    addProduct(element){
      this.getJson(`${API}/addToBasket.json`)
          .then(data => {
            if(data.result === 1) {
              let productId = element.id_product;
              console.log(productId);
              let find = this.goods.find(product => product.id_product === productId);
              if(find) {
                find.quantity++;
              } else {
                let product = {
                  id_product: productId,
                  price: element.price,
                  product_name: element.product_name,
                  quantity: 1
                };
                this.goods.push(product);
              }
            } else {
              alert('Error');
            }
          })
    },
    /**
     * удаление товара
     * @param element
     */
    removeProduct(element){
      this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
            if(data.result === 1){
              let productId = +element.id_product;
              let find = this.goods.find(product => product.id_product === productId);
              if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
                find.quantity--;
              } else { // удаляем
                this.goods.splice(this.goods.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
              }
            } else {
              alert('Error');
            }
          })
    },
    /**
     * Поиск
     * @param value
     */
    filter(){
      let value = this.searchText;
      const regexp = new RegExp(value, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      this.products.forEach(el => {
        const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
        if(!this.filtered.includes(el)){
          block.classList.add('invisible');
        } else {
          block.classList.remove('invisible');
        }
      })
    }
  },
  computed: {

  },
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  }
});

