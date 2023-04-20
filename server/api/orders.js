const router = require("express").Router();
const {
  models: { Order, Product, User, Order_Products },
} = require("../db");

//Get all carts for a user

router.get("user/:id/cart", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Order.findAll({
      where: { id },
      include: [{ model: Product, through: Order_Products }],
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//Create cart

router.post("/user/:id/cart", async (req, res, next) => {
  try {
    const id = req.params.id;
    const newCart = await Order.create({ id });
    res.json(newCart);
  } catch (err) {
    next(err);
  }
});

//Update Cart with additional items

// router.post("/cart/:id/product/productId", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const productId = req.params.productId;
//     const { quantity } = req.body;

//     const productCart = await Order_Products.findOne({
//       where: { orderId: id, productId },
//     });
//     if (productCart) {
//       productCart.quantity += quantity;
//       await productCart.save();
//     } else {
//       await Order_Products.create({ orderId: id, productId, quantity });
//     }
//     res.send("Item added to cart");
//   } catch (err) {
//     next(err);
//   }
// });

//

router.put("/cart/:id/product/:productId", async (req, res) => {
  try {
    const id = req.params.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const productInCart = await Order_Products.findOne({
      where: { orderId: id, productId },
    });

    if (productInCart) {
      productInCart.quantity = quantity;
      await productInCart.save();
      res.send("Product Quantity Updated");
    } else {
      res.send("Product not found in cart");
    }
  } catch (err) {
    next(err);
  }
});

//Update cart with deleting items

router.delete("/cart/:id/product/:productId", async (req, res, next) => {
  try {
    const id = req.params.id;
    const productId = req.params.productId;

    const productCart = await Order_Products.findOne({
      where: { orderId: id, productId },
    });
    if (productCart) {
      await productCart.destroy();
      res.send("Product removed from cart");
    } else {
      res.send("Product not found in cart");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("cart/:id");
