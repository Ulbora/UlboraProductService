var assert = require('assert');
var db = require("../../database/db");
var productManager = require("../../managers/productManager");
var prodId;

var clientId = "555842998";

describe('Product Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            setTimeout(function () {
                productManager.init(db);
                done();
            }, 1000);
        });
    });



    describe('#addProduct()', function () {
        it('should add a product in manager', function (done) {
            var json = {
                clientId: clientId,
                productName: "Cap",
                brand: "Nike",
                mfnId: 1,
                model: "123_Cap",
                description: "A black Cap",
                overview: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld',
                specifications: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff'

            };
            setTimeout(function () {
                productManager.addProduct(json, function (result) {
                    if (result.success) {
                        prodId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });





    describe('#updateProduct()', function () {
        it('should update product in manager', function (done) {
            var json = {
                productName: "hat",
                brand: "Nike Pro",
                mfnId: 1,
                model: "123_hat",
                description: "A black Hat",
                overview: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffldskf',
                specifications: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffldskf',
                id: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                productManager.updateProduct(json, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });



    describe('#getProduct()', function () {
        it('should get product in db', function (done) {
            setTimeout(function () {
                productManager.getProduct(prodId, clientId, function (result) {
                    if (result && result.productName === "hat" && result.model === "123_hat") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
   
     
    
    
    describe('#deleteProduct()', function () {
        it('should delete product', function (done) {
            setTimeout(function () {
                productManager.deleteProduct(prodId, clientId, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


});



