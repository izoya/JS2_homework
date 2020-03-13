const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = 'http://dummyimage.com/150/fefa99/ba8eb1&text=No+image') => {
    return `<div class="product">
                <img src="${img}" alt="product_image">
                <h3>${title}</h3>
                <p>${price} руб.</p>
                <button class="product__atc">Добавить в корзину</button>
            </div>`;
};

const renderProducts = list => {
    /* Метод map() создаёт новый массив, состоящий из результатов вызова
    * callback(item, i, arr) для каждого элемента
    */
    let productList = list.map(item => renderProduct(item.title, item.price));
    // Запятая выводится из-за того, что мы помещаем в HTML целый массив, а его
    // элементы разделены запятой.
    // TODO: преобразовать массив в строку
    document.querySelector('.products').innerHTML = productList.join("\n");
};

renderProducts(products);
