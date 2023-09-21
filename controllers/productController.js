
//import the db from '../models/index.js'
import {db} from '../models'
const Product = db.products;

 

export default{
  createProduct: async (req, res) => {
    console.log(req.body )
  try {
  let info = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    published: req.body.published ? req.body.published : false
  }
    const product = await Product.create(info);
    return res.status(201).json({
      product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},

  getAllProduct: async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  getProductById : async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({
            where: { id: productId }
        });
        if (product) {
            return res.status(200).json({ product });
        }
        return res.status(404).send('Product with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  updateProduct : async (req, res) => {
    try {
        const { productId } = req.params;
        const [updated] = await Product.update(req.body, {
            where: { id: productId }

//  const [updated]: This line declares a constant variable named updated.
// The square brackets [] are used for destructuring the result of the update operation. 
//Since Product.update returns an array with two values, the updated count and the
// updated rows, we are only interested in the count of updated rows in this case.
// So, after executing this code, the updated variable will contain the count of 
//rows that were updated in the "Product" table based on the conditions specified.
        });
        if (updated) {
            const updatedProduct = await Product.findOne({ where: { id: productId } });
            return res.status(200).json({ product: updatedProduct });
        }
        throw new Error('Product not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  deleteProduct : async (req, res) => {
    try {
        const { productId } = req.params;
        const deleted = await Product.destroy({
            where: { id: productId }
        });
        if (deleted) {
            return res.status(204).send("Product deleted");
        }
        throw new Error("Product not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  deleteAllProducts : async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: {},
            truncate: false
        });
        if (deleted) {
            return res.status(204).send("All products deleted");
        }
        throw new Error("Products not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  findAllPublished : async (req, res) => {
    try {
        const products = await Product.findAll({ where: { published: true } });
        if (products) {
            return res.status(200).json({ products });
        }
        throw new Error("Products not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  findAllUnPublished : async (req, res) => {
    try {
        const products = await Product.findAll({ where: { published: false } });
        if (products) {
            return res.status(200).json({ products });
        }
        throw new Error("Products not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },
    findAllPublishedByPrice : async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { published: true },
            order: [['price', 'DESC']]
        });
        if (products) {
            return res.status(200).json({ products });
        }
        throw new Error("Products not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  findAllPublishedByTitle : async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { published: true },
            order: [['title', 'ASC']]
        });
        if (products) {
            return res.status(200).json({ products });
        }
        throw new Error("Products not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
    },

  findAllPublishedByPriceAndTitle : async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { published: true },
            order: [['price', 'DESC'], ['title', 'ASC']]
        });
        if (products) {
            return res.status(200).json({ products });
        }
        throw new Error("Products not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
    }

}