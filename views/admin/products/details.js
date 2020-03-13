const layout = require("../layout");

module.exports = ({product}) => {
  return layout({
    content: `
      <a href="/admin/products">
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
          <div class="field is-grouped">
            <a href="/admin/products/${product.id}/edit">
              <button class="button is-link is-outlined">Edit</button>
            </a>
            <form method="POST" action="/admin/products/${product.id}/delete">
              <button class="button is-danger is-outlined">Delete</button>
            </form>
          </div>
        </div>
      </div>
    `
  });
}