var assert = require('assert');
var db = require("../../database/db");
var productManager = require("../../managers/productManager");
var detailsManager = require("../../managers/detailsManager");
var optionsManager = require("../../managers/optionsManager");
var prodId;
var detailId;
var optionId;
var clientId = "555842998";

describe('Options Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            setTimeout(function () {
                productManager.init(db);
                detailsManager.init(db);
                optionsManager.init(db);
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


    
    describe('#addOptions()', function () {
        it('should add a options in mysql db', function (done) {
            var json = {
                optionName: "color",
                optionValue: "blue",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                optionsManager.addOption(json, function (result) {
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

    
    describe('#updateOption()', function () {
        it('should update a options in manager', function (done) {
            var json = {
                optionName: "weight",
                optionValue: "5.5",
                id: optionId,
                clientId: clientId
            };
            setTimeout(function () {
                optionsManager.updateOption(json, function (result) {
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
        it('should get a option in manager', function (done) {
            setTimeout(function () {
                optionsManager.getOption(optionId, clientId, function (result) {
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
        it('should add a options in mysql db', function (done) {
            var json = {
                optionName: "color",
                optionValue: "red",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                optionsManager.addOption(json, function (result) {
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
    
    
    describe('#getOptionListByDetails()', function () {
        it('should get options list by details in manager', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId
                };
                optionsManager.getOptionListByDetails(json, function (result) {
                    console.log("product options list: " + JSON.stringify(result));
                    if (result && result.length === 2) {
                        if (result.length === 2 && result[1].optionName === "color" && result[1].optionValue === "red") {
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
        it('should search options list by option in mysql db', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId,
                    optionName: "%color%"
                };
                optionsManager.searchByOptionName(json, function (result) {
                    console.log("product options search list: " + JSON.stringify(result));
                    if (result.optionName && result.optionName === "color" && result.optionValue === "red") {
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
        it('should delete option in manager', function (done) {
            setTimeout(function () {
                optionsManager.deleteOption(optionId, clientId, function (result) {
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



