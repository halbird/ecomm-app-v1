const layout = require("../layout");

module.exports = ({product}) => {
  return layout({
    content: `
      <a href="/">
        <button class="button is-outlined">Back to Products List</button>
      </a>
      <div class="columns is-centered">
        <div class="column is-half">
          <figure>
            <img src="data:image/png;base64, ${product.image}"/>
          </figure>
          <div class="field">
            <h1 class="subtitle">${product.title}</h1>
          </div>
          <div class="field">
            <label class="label">$${product.price.toFixed(2)}</label>
          </div>
          <br />
          <div class="field">
            <form action="/cart/products" method="POST">
              <input hidden value="${product.id}" name="productId">
              <button class="button has-icon is-inverted">
              <span class="icon"><i class="fa fa-shopping-cart"></i></span><span>Add to cart</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `
  });
}