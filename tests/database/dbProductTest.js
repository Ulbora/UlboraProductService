var assert = require('assert');
var db = require("../../database/db");
var prodId;
var detailId;

var clientId = "658422133";


describe('DB Product', function () {
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
                productName: "Cap",
                brand: "Nike",
                mfnId: 1,
                model: "123_Cap",
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
    
    
    
    
    
    describe('#updateProduct()', function () {
        it('should update Product in mysql db', function (done) {
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
                db.updateProduct(json, function (result) {
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
        it('should get Product in mysql db', function (done) {
            setTimeout(function () {
                db.getProduct(prodId, clientId, function (result) {
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

