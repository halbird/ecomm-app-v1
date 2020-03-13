// extend repository base class

const Repository = require("./repository");

class ProductsRepository extends Repository {
  // don't have any methods to add yet
}

module.exports = new ProductsRepository("products.json");
// create an instance so there is no chance of mis-typing the name of the DB file in other places when we create a new instance