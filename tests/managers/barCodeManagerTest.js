var assert = require('assert');
var db = require("../../database/db");
var productManager = require("../../managers/productManager");
var detailsManager = require("../../managers/detailsManager");
var barCodeManager = require("../../managers/barCodeManager");
var prodId;
var detailId;
var barCodeId;
var clientId = "555842998";

describe('BarCode Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            setTimeout(function () {
                productManager.init(db);
                detailsManager.init(db);
                barCodeManager.init(db);
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


    

    describe('#addBarCode()', function () {
        it('should add a bar code in db', function (done) {
            var json = {
                type: "upc",
                code: "15555fff555111",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                barCodeManager.addBarCode(json, function (result) {
                    console.log("bar code: " + JSON.stringify(result));
                    if (result.success) {
                        barCodeId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    
    
    describe('#updateBarCode()', function () {
        it('should update bar code in manager', function (done) {
            var json = {
                type: "upc",
                code: "455555fgh555",
                id: barCodeId,
                clientId: clientId
            };
            setTimeout(function () {
                barCodeManager.updateBarCode(json, function (result) {
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
    
    
    
    describe('#getBarCode()', function () {
        it('should get a bar code in manager', function (done) {
            setTimeout(function () {
                barCodeManager.getBarCode(barCodeId, clientId, function (result) {
                    console.log("product bar code: " + JSON.stringify(result));
                    if (result.id && result.type === "upc" && result.code === "455555fgh555") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    

    describe('#addBarCode()', function () {
        it('should add a bar code in db', function (done) {
            var json = {
                type: "upc",
                code: "15555fff555888",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                barCodeManager.addBarCode(json, function (result) {
                    console.log("bar code: " + JSON.stringify(result));
                    if (result.success) {
                        barCodeId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#getBarCodeListByDetails()', function () {
        it('should get bar code list by details in manager', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId
                };
                barCodeManager.getBarCodeListByDetails(json, function (result) {
                    console.log("bar code list: " + JSON.stringify(result));
                    if (result && result.length === 2) {
                        if (result.length === 2 && result[1].type === "upc" && result[1].code === "15555fff555888") {
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
    
    
    describe('#getDetailByBarCode()', function () {
        it('should get details by bar code in manager', function (done) {
            setTimeout(function () {
                var json = {                    
                    clientId: clientId,
                    barCodeType: "upc",
                    barCode: "455555fgh555"
                };
                detailsManager.getDetailByBarCode(json, function (result) {
                    console.log("product details id : " + detailId);
                    console.log("product id: " + prodId);
                    console.log("product details by bar code: " + JSON.stringify(result));
                    if (result.productDetailsId && result.productDetailsId === detailId && result.productId === prodId && result.sku === "00100212457") {
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#deleteBarCode()', function () {
        it('should delete bar code in manager', function (done) {
            setTimeout(function () {
                barCodeManager.deleteBarCode(barCodeId, clientId, function (result) {
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



