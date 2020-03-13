const layout = require("../layout");
const {getError} = require("../../helpers");

module.exports = ({product, errors}) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit Product: ${product.title}</h1>

          

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" value="${product.title}" name="title">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input type="number" step="0.01" class="input" value="${product.price.toFixed(2)}" name="price">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <figure class="image is-96x96">
              <img src="data:image/png;base64, ${product.image}">
            </figure>
            <br />
            <button class="button is-primary">Save</button>
          </form>
        </div>
      </div>
    `
  });
}