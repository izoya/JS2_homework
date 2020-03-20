const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
// let getRequest = (url) => {
//     return new Promise ((resolve, reject) => {
//
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject(xhr.status);
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     });
// }
// getRequest(API).then(data => console.dir(data)).catch(error => console.log(error + ' Error'));


class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then((data) => {
                this.goods = [...data];
                this.render();
            })
            .then(() => this._addHandlers());
    }

    // _fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 20000},
    //         {id: 2, title: 'Mouse', price: 1500},
    //         {id: 3, title: 'Keyboard', price: 5000},
    //         {id: 4, title: 'Gamepad', price: 4500},
    //     ];
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('Error!', error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    calcSum(){
        return this.allProducts.reduce((total, item) => total += item.price, 0);
    }

    _addHandlers() {
        let buttons = document.querySelectorAll('.product__atc');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                cart.add(button.parentNode.dataset.id);
            });
        });
    }
}

class ProductItem {
    constructor(product, img='http://dummyimage.com/150/fefa99/ba8eb1&text=No+image') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product" >
                <img src="${this.img}" alt="Some img">
                <div class="desc" data-id="${this.id_product}">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="product__atc">Добавить в корзину</button>
                </div>
            </div>`;

    }
}

const products = new ProductList();
setTimeout(() => console.log("Сумма всех товаров " + products.calcSum()), 1000);



class Cart {
    constructor() {
        this.productsInCart = [];
        this._render();
    }

    add(item_id) {
        let id = this.productsInCart.findIndex(x => x.id_product === item_id);
        if (id >= 0) {
            this.productsInCart[id].qty ++;
        }
        else {
            this.productsInCart.push({id_product: item_id, qty: 1});
        }
        this._render();
    }

    remove(item_id) {
        let id = this.productsInCart.findIndex(x => x.id_product === item_id);
        this.productsInCart.splice(id, 1);
        this._render();
    }

    _render() {
        const cartEl = document.querySelector('.cart__items');
        if (this.productsInCart.length <= 0) {
            cartEl.innerHTML = 'Корзина пуста. Купите что-нибудь ;)';
        } else {
            cartEl.innerHTML = '';
            for (let item of this.productsInCart) {
                const cartItemObject = new CartItem(item);
                cartEl.insertAdjacentHTML('beforeend', cartItemObject.render());
            }
            this._addHandlers();
        }
    }

    _addHandlers() {
        let buttons = document.querySelector('.cart__items').querySelectorAll('.fa-times-circle');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                cart.remove(button.parentNode.dataset.id);
            });
        });
    }

    getCartList(){
        return this.productsInCart;
    }

}

class CartItem {
    constructor(item) { //item: id_product, qty
        this.item = products.goods[products.goods.findIndex(x => x.id_product === +item.id_product)];
        this.item.qty = item.qty
    }

    render() {
        return `<div class="cart__item" data-id="${this.item.id_product}">
					<h3><a href="#">${this.item.product_name}</a></h3>
					<p>${this.item.qty}шт x ${this.item.price} руб.</p>		
				    <i class="fas fa-times-circle"></i>
                </div>`;
    }
}

const cart = new Cart();
