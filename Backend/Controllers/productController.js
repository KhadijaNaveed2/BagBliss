import slugify from "slugify";
import productModal from "../Modals/productModal.js";
import categoryModal from "../Modals/categoryModal.js";
import orderModal from "../Modals/orderModal.js"
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();


//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });


//Create Product Controller
export const createProductController = async (req,res) => {
    try {
        const {name,slug,description,price,category,quantity,shipping,} = req.fields;
        const {photo} = req.files;
        console.log("Request Fields:", req.fields);
         console.log("Request Files:", req.files);
        //validation
        switch(true) {
            case !name:
                return res.status(500).send({error: "Name is Required"})
            case !description:
                return res.status(500).send({error: "Description is Required"})
            case !price:
                return res.status(500).send({error: "Price is Required"})
                case !category:
                return res.status(500).send({error: "Category is Required"})
            case !quantity:
                return res.status(500).send({error: "Quantity is Required"})
                case photo && photo.size > 1000000:
                return res.status(500).send({error: "Photo is Required and should be less than 1mb"})
        }
        const products = new productModal({...req.fields, slug: slugify(name)});
        if(photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        };
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully" ,
        products,
          });
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error,
    });
    }
};

//Get Product Controller
export const getProductController = async (req,res) => {
    try {
        const products = await productModal
        .find({})
        .populate("category")
        .select("-photo")
        .limit(100)
        .sort({createdAt: -1});
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: " All Products" ,
        products,
          });

    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Product",
      error: error.message,
    });
    }
};

//Get Single ProductController
export const getSingleProductController = async (req,res) => {
    try {
        const products = await productModal.findOne({slug:req.params.slug})
        .select("-photo")
        .populate("category")
        res.status(200).send({
            success: true,
            message: " single Product Fetched" ,
        products,
          });

    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Product",
      error,
    });
    }
};

//Get Product Photo
export const productPhotoController = async (req,res) => {
    try {
        const products = await productModal.findById(req.params.pid).select("photo");
        if ( products.photo.data) {
         res.set("Content-type", products.photo.contentType);
         return res.status(200).send(products.photo.data);
        } else {
            return res.status(404).send({
              success: false,
              message: "Product photo not found",
            });
        }
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Photo",
      error: error.message,
    });
    }
};

//Delete ProductController
export const deleteProductController = async (req,res) => {
    try {
    const products = await productModal.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: " Product Deleted Successfully" ,
        products,
          });

    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Deleting Product",
      error,
    });
    }
};

//Update ProductControl
export const updateProductController = async (req,res) => {
        try {
            const {name,slug,description,price,category,quantity,shipping,} = req.fields;
            const {photo} = req.files;
            console.log("Request Fields:", req.fields);
    console.log("Request Files:", req.files);
            //validation
            switch(true) {
                case !name:
                    return res.status(500).send({error: "Name is Required"})
                case !description:
                    return res.status(500).send({error: "Description is Required"})
                case !price:
                    return res.status(500).send({error: "Price is Required"})
                    case !category:
                    return res.status(500).send({error: "Category is Required"})
                case !quantity:
                    return res.status(500).send({error: "Quantity is Required"})
                    case photo && photo.size > 1000000:
                    return res.status(500).send({error: "Photo is Required and should be less than 1mb"})
            }
            const products = await productModal.findByIdAndUpdate(req.params.pid, 
                {...req.fields, slug: slugify(name)},
                 { new: true }
                 );
            if(photo) {
                products.photo.data = fs.readFileSync(photo.path);
                products.photo.contentType = photo.type;
            };
            await products.save();
            res.status(201).send({
                success: true,
                message: "Product Updated Successfully" ,
            products,
              });
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while Updating Product",
          error,
        });  
    }
};

// Filter Products
export const productFiltersController = async (req,res) => {
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0 ) args.category = checked;
        if (radio.length) args.price = {$gte: radio[0], $lte: radio[1] };
        const products = await productModal.find(args);
        res.status(200).send({
            success: true,
        products,
          });
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error while Filtering Products",
          error,
        });  
    }
};

// Product Count
export const  productCountController = async (req, res) => {
    try {
         const total = await productModal.find({}).estimatedDocumentCount();
         res.status(200).send({
            success: true,
             total,
          });
    } catch (error) {
        console.log(error); 
        res.status(400).send({
            success: false,
            message: "Error in Product Count",
            error,
          });  
    }
};

//Product List Base on Page
export const productListController = async (req,res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page  : 1;
        const products = await productModal
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage )
        .limit(perPage)
        .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
             products,
          });
    } catch (error) {
        console.log(error); 
        res.status(400).send({
            success: false,
            message: "Error in Per Product Page",
            error,
          });     
    }
};

// Search Product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModal
          .find({
            $or: [
              { name: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
            ],
          })
          .select("-photo");
        res.json(resutls);
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error In Search Product API",
          error,
        });
      }
};

//related Product
export const relatedProductController = async (req, res) => {
    try {
        const {pid,cid} = req.params;
        const products = await productModal.find({
            category: cid,
            _id: {$ne: pid },
        })
        .select("-photo")
        .limit(5)
        .populate("category");
        res.status(200).send({
            success: true,
             products,
          });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related Product",
            error,
          });
    }
};

//Get Product By Category
export const productCategoryController = async (req,res) => {
try {
    const category = await categoryModal.findOne({ slug: req.params.slug });
    const products = await productModal.find({ category }).populate("category");
    res.status(200).send({
        success: true,
         products,
         category,
      });

} catch (error) {
    console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related Product",
            error,
          });
}
}

//PAYMENT GATEWAY API
//TOKEN
export const braintreeTokenController = async (req,res) => {
    try {
        gateway.clientToken.generate({}, function(err, response) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//PAYMENT
export const braintreePaymentController = async (req,res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options:{
                submitForSettlement: true
            },
        },
             function (error, result) {
            if (result) {
                const order = new orderModal({
                    products: cart,
            payments: result,
            buyer: req.user._id,
                }).save();
                res.json({ok: true})
        } else {
            res.status(500).json({ error: 'Payment failed', details: error });
        }
    }
            )
    } catch (error) {
        console.log(error);  
    }
};