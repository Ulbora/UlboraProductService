var assert = require('assert');
var db = require("../../database/db");
var prodId;
var detailId;
var barCodeId;
var barCodeId2;
var clientId = "658422133";


describe('DB BarCode', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            setTimeout(function () {
                done();
            }, 1000);
        });
    });

    
    describe('#addProduct()', function () {
        it('should add a Product in db', function (done) {
            var json = {
                clientId: clientId,
                productName: "Hat",
                brand: "Nike",
                mfnId: 1,
                model: "123_hat",
                description: "A black Cap",
                overview: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld',
                specifications: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff'

            };
            setTimeout(function () {
                db.addProduct(json, function (result) {
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
        it('should add a Detail in db', function (done) {
            var json = {
                sku: "00100212457",
                price: 8.56,
                productId: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                db.addDetail(json, function (result) {
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
                db.addBarCode(json, function (result) {
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
        it('should update bar code in mysql db', function (done) {
            var json = {
                type: "upc",
                code: "455555fgh555",
                id: barCodeId,
                clientId: clientId
            };
            setTimeout(function () {
                db.updateBarCode(json, function (result) {
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
    
    
    describe('#addBarCode()', function () {
        it('should add a bar code in mysql db', function (done) {
            var json = {
                type: "upc",
                code: "15555fff555888",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                db.addBarCode(json, function (result) {
                    console.log("bar code: " + JSON.stringify(result));
                    if (result.success) {
                        barCodeId2 = result.id;
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
        it('should get a bar code in mysql db', function (done) {
            setTimeout(function () {
                db.getBarCode(barCodeId, clientId, function (result) {
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
    
    
    describe('#getBarCode()', function () {
        it('should get a bar code in mysql db', function (done) {
            setTimeout(function () {
                db.getBarCode(barCodeId2, clientId, function (result) {
                    console.log("product bar code: " + JSON.stringify(result));
                    if (result.id && result.type === "upc" && result.code === "15555fff555888") {
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
        it('should get bar code list by details in mysql db', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId
                };
                db.getBarCodeListByDetails(json, function (result) {
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
        it('should get details by bar code in mysql db', function (done) {
            setTimeout(function () {
                var json = {                    
                    clientId: clientId,
                    barCodeType: "upc",
                    barCode: "455555fgh555"
                };
                db.getDetailByBarCode(json, function (result) {
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
        it('should delete bar coe in mysql db', function (done) {
            setTimeout(function () {
                db.deleteBarCode(barCodeId, clientId, function (result) {
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
        it('should delete Product', function (done) {
            setTimeout(function () {
                db.deleteProduct(prodId, clientId, function (result) {
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

