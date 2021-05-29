const Product = require("../models/product");
const { Op } = require("sequelize");
const { uploadFile } = require('../aws/s3');
const { resizeProduct, resizeVet } = require("../settings/sharp");
const fs = require('fs');

const productService = {};

productService.createProduct = async(obj) => {
    try {
        const product = Product.build(obj);
        const editFile = await resizeProduct(obj.img);
        fs.unlinkSync(obj.img.path);
        product.img_key = editFile.filename;
        product.img_location = editFile.path;
        if (product instanceof Product) {
            await product.save();
            return product;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
productService.createVet = async(obj) => {
    try {
        const product = Product.build(obj);
        const editFile = await resizeVet(obj.img);
        fs.unlinkSync(obj.img.path);
        product.img_key = editFile.filename;
        product.img_location = editFile.path;
        if (product instanceof Product) {
            await product.save();
            return product;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
productService.getProduct = async(id) => {
    try {
        const product = await Product.findOne({
            where: {
                id: {
                    [Op.eq]: id
                },
                category: {
                    [Op.eq]: "PRODUCT"
                }
            }
        });
        if (!product) return null;
        return product.dataValues;
    } catch (error) {
        console.log(error);
        return null;
    }
}
productService.getlistProduct = async() => {
    let list = [];
    try {
        const raw = await Product.findAll({
            where: {
                [Op.and]: [
                    { status: 1 },
                    { category: "PRODUCT" },
                    {
                        stock: {
                            [Op.gt]: 0,
                        }
                    }
                ]
            },
            order: [
                ['name', 'ASC']
            ]
        });
        if (raw.length > 0) {
            raw.map((products) => {
                list.push(products.dataValues);
            });
            return list;
        }
        return list;
    } catch (error) {
        console.log(error);
        return list;
    }
};
productService.getlistVet = async() => {
    let list = [];
    try {
        const raw = await Product.findAll({
            where: {
                status: {
                    [Op.eq]: 1
                },
                category: {
                    [Op.eq]: "VET"
                }
            }
        });
        if (raw.length >= 0) {
            raw.map((products) => {
                list.push(products.dataValues);
            });
            return list;
        }
        return list;
    } catch (error) {
        console.log(error);
        return list;
    }
};
productService.deleteProduct = async(id) => {
    try {
        const product = await Product.update({ status: 0 }, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
        console.log(product);
        if (!product) return null;
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}
productService.updateProduct = async(obj) => {
    try {
        const product = await Product.update({
            name: obj.name,
            precio: obj.precio,
            stock: obj.stock,
            description_simple: obj.description_simple,
            description_html: obj.description_html,
        }, {
            where: {
                id: {
                    [Op.eq]: obj.id
                }
            }
        });
        if (!product) return null;
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = productService;