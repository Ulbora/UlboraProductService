var assert = require('assert');
var db = require("../../database/db");
var productManager = require("../../managers/productManager");
var detailsManager = require("../../managers/detailsManager");
var prodId;
var detailId;

var clientId = "555842998";

describe('Details Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            setTimeout(function () {
                productManager.init(db);
                detailsManager.init(db);
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




    describe('#addDetail()', function () {
        it('should add a Detail in manager', function (done) {
            var json = {
                sku: "00100212457",
                price: 8.56,
                productId: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                detailsManager.addDetail(json, function (result) {
                    if (result.success) {
                        detailId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });




    describe('#updateDetail()', function () {
        it('should update a Details in manager', function (done) {
            var json = {
                sku: "00100312457",
                price: 9.56,
                id: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                detailsManager.updateDetail(json, function (result) {
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


    describe('#getDetail()', function () {
        it('should get a product detail in manager', function (done) {
            setTimeout(function () {
                detailsManager.getDetail(detailId, clientId, function (result) {
                    console.log("product detail: " + JSON.stringify(result));
                    if (result.id && result.price === 9.56) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    

    describe('#addDetail()', function () {
        it('should add a Detail in manager', function (done) {
            var json = {
                sku: "00100212457",
                price: 8.56,
                productId: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                detailsManager.addDetail(json, function (result) {
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


    describe('#getDetailListByProduct()', function () {
        it('should get detail list by product in manager', function (done) {
            setTimeout(function () {
                var json = {
                    productId: prodId,
                    clientId: clientId
                };
                detailsManager.getDetailListByProduct(json, function (result) {
                    console.log("product detail list: " + JSON.stringify(result));
                    if (result && result.length === 2) {
                        if (result[0].sku === "00100312457" && result[0].price === 9.56) {
                            assert(true);
                        } else {
                            assert(false);
                        }
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#getDetailBySku()', function () {
        it('should get details by sku in manager', function (done) {
            setTimeout(function () {
                var json = {                    
                    clientId: clientId,
                    sku: "001003%"
                };
                detailsManager.getDetailBySku(json, function (result) {
                    console.log("product details id : " + detailId);
                    console.log("product id: " + prodId);
                    console.log("product details by sku " + JSON.stringify(result));
                    if (result.length > 0 && result[0].productDetailsId && result[0].productDetailsId === detailId && result[0].productId === prodId && result[0].sku === "00100312457") {                        
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#deleteDetail()', function () {
        it('should delete details in manager', function (done) {
            setTimeout(function () {
                detailsManager.deleteDetail(detailId, clientId, function (result) {
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



