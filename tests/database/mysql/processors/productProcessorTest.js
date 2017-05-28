var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var productProcessor = require("../../../../database/mysql/processors/productProcessor");

var prodId;
var clientId = 3842;
describe('ProductProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    productProcessor.init(crud);
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
                productName: "cap",
                brand: "Nike",
                mfnId: 1,
                model: "123_cap",
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



    describe('#updateProduct()', function () {
        it('should update Product in processor', function (done) {
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
                productProcessor.updateProduct(null, json, function (result) {
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
        it('should get Product in processor', function (done) {
            setTimeout(function () {
                productProcessor.getProduct(prodId, clientId, function (result) {
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

    /*
     
     describe('#getCustomerList()', function () {
     it('should get Customer list in processor', function (done) {
     setTimeout(function () {
     customerProcessor.getCustomerList(function (result) {
     console.log("customer list: " + JSON.stringify(result));
     if (result && result.length > 0) {
     assert(true);
     } else {
     assert(false);
     }
     done();
     });
     }, 1000);
     });
     });
     
     
     
     describe('#getCustomerListByClient()', function () {
     it('should get Customer list in processor', function (done) {
     setTimeout(function () {
     customerProcessor.getCustomerListByClientId(clientId, function (result) {
     console.log("customer list: " + JSON.stringify(result));
     if (result && result.length > 0) {
     assert(true);
     } else {
     assert(false);
     }
     done();
     });
     }, 1000);
     });
     });
     
     describe('#deleteCustomer()', function () {
     it('should delete Customer', function (done) {
     setTimeout(function () {
     customerProcessor.deleteCustomer(null, cusId1, clientId, function (result) {
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
     */

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

