const layout = require("../layout");

module.exports = () => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="field">
            <h1 class="subtitle">Shopping Cart</h1>
          </div>
          <figure>
            <img src="/images/emptyCart.png" />
          </figure>
          <br />
          <div class="field">
            <a href="/">
              <button class="button is-outlined">View Products</button>
            </a>
          </div>
        </div>
      </div>
    `
  });
}