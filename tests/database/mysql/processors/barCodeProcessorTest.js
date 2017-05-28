var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var productProcessor = require("../../../../database/mysql/processors/productProcessor");
var detailsProcessor = require("../../../../database/mysql/processors/detailsProcessor");
var barCodeProcessor = require("../../../../database/mysql/processors/barCodeProcessor");
var prodId;
var clientId = 3846;
var detailId;
var barCodeId;
describe('BarCodeProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    productProcessor.init(crud);
                    detailsProcessor.init(crud);
                    barCodeProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });


    describe('#addProduct()', function () {
        it('should add a Product in ProductProcessor', function (done) {
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
                productProcessor.addProduct(null, json, function (result) {
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
        it('should add a Detail in Processor', function (done) {
            var json = {
                sku: "00100212457",
                price: 8.56,
                productId: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                detailsProcessor.addDetail(null, json, function (result) {
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
        it('should add a bar code in Processor', function (done) {
            var json = {
                type: "upc",
                code: "15555fff555111",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                barCodeProcessor.addBarCode(null, json, function (result) {
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
        it('should update bar code in Processor', function (done) {
            var json = {
                type: "upc",
                code: "455555fgh555",
                id: barCodeId,
                clientId: clientId
            };
            setTimeout(function () {
                barCodeProcessor.updateBarCode(null, json, function (result) {
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
        it('should get a bar code in processor', function (done) {
            setTimeout(function () {
                barCodeProcessor.getBarCode(barCodeId, clientId, function (result) {
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
        it('should add a bar code in Processor', function (done) {
            var json = {
                type: "upc",
                code: "666GGJ555111",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                barCodeProcessor.addBarCode(null, json, function (result) {
                    console.log("bar code: " + JSON.stringify(result));
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


    



    describe('#getBarCodeListByDetails()', function () {
        it('should get bar code list by details in processor', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId
                };
                barCodeProcessor.getBarCodeListByDetails(json, function (result) {
                    console.log("bar code list: " + JSON.stringify(result));
                    if (result && result.length === 2) {
                        if (result.length === 2 && result[1].type === "upc" && result[1].code === "666GGJ555111") {
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
/*

    describe('#searchByOptionName()', function () {
        it('should search options list by option in processor', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId,
                    optionName: "%color%"
                };
                optionsProcessor.searchByOptionName(json, function (result) {
                    console.log("product options search list: " + JSON.stringify(result));
                    if (result.optionName && result.optionName === "color" && result.optionValue === "green") {
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });

*/

    describe('#deleteBarCode()', function () {
        it('should delete bar coe in processor', function (done) {
            setTimeout(function () {
                barCodeProcessor.deleteBarCode(null, barCodeId, clientId, function (result) {
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
                productProcessor.deleteProduct(null, prodId, clientId, function (result) {
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

