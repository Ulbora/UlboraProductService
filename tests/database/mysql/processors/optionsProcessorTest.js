var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var productProcessor = require("../../../../database/mysql/processors/productProcessor");
var detailsProcessor = require("../../../../database/mysql/processors/detailsProcessor");
var optionsProcessor = require("../../../../database/mysql/processors/optionsProcessor");
var prodId;
var clientId = 3845;
var detailId;
var optionId;
describe('OptionsProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    productProcessor.init(crud);
                    detailsProcessor.init(crud);
                    optionsProcessor.init(crud);
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


    describe('#addOptions()', function () {
        it('should add a options in Processor', function (done) {
            var json = {
                optionName: "color",
                optionValue: "blue",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                optionsProcessor.addOption(null, json, function (result) {
                    console.log("options: " + JSON.stringify(result));
                    if (result.success) {
                        optionId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#updateOptions()', function () {
        it('should update a options in Processor', function (done) {
            var json = {
                optionName: "weight",
                optionValue: "5.5",
                id: optionId,
                clientId: clientId
            };
            setTimeout(function () {
                optionsProcessor.updateOption(null, json, function (result) {
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


    describe('#getOptions()', function () {
        it('should get a option in processor', function (done) {
            setTimeout(function () {
                optionsProcessor.getOption(optionId, clientId, function (result) {
                    console.log("product option: " + JSON.stringify(result));
                    if (result.id && result.optionName === "weight" && result.optionValue === "5.5") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#addOptions()', function () {
        it('should add a options in Processor', function (done) {
            var json = {
                optionName: "color",
                optionValue: "green",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                optionsProcessor.addOption(null, json, function (result) {
                    console.log("options: " + JSON.stringify(result));
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



    describe('#getOptionListByDetails()', function () {
        it('should get options list by details in processor', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId
                };
                optionsProcessor.getOptionListByDetails(json, function (result) {
                    console.log("product options list: " + JSON.stringify(result));
                    if (result && result.length === 2) {
                        if (result.length === 2 && result[1].optionName === "color" && result[1].optionValue === "green") {
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



    describe('#deleteOption()', function () {
        it('should delete option in processor', function (done) {
            setTimeout(function () {
                optionsProcessor.deleteOption(null, optionId, clientId, function (result) {
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

