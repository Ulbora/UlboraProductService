var assert = require('assert');
var db = require("../../database/db");
var productService = require("../../services/productService");
var detailsService = require("../../services/detailsService");
var barCodeService = require("../../services/barCodeService");
var tokenFile = require("./token");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var prodId;
var detailId;
var barCodeId;
var clientId = "64545645";
describe('barCodeService', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            setTimeout(function () {
                productService.init(db);
                detailsService.init(db);
                barCodeService.init(db);
                done();
            }, 1000);
        });
    });



    describe('#add()', function () {
        it('should add a product', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    clientId: clientId,
                    productName: "Cap",
                    brand: "Nike",
                    mfnId: 1,
                    model: "123_Cap",
                    description: "A black Cap",
                    overview: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld',
                    specifications: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff'

                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        prodId = val.id;
                        console.log("add product response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                productService.add(req, res);
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a detail', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    sku: "00100212457",
                    price: 8.56,
                    productId: prodId,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        detailId = val.id;
                        console.log("add details res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                detailsService.add(req, res);
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a barCode', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    type: "upc",
                    code: "15555fff555111",
                    productDetailsId: detailId,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        barCodeId = val.id;
                        console.log("add barCode res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                barCodeService.add(req, res);
            }, 1000);
        });
    });



    describe('#update()', function () {
        it('should update a bar code', function (done) {
            setTimeout(function () {

                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    type: "upc",
                    code: "455555fgh555",
                    id: barCodeId,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("update bar code res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                barCodeService.update(req, res);
            }, 1000);
        });
    });


    describe('#get()', function () {
        it('should get a bar code', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = barCodeId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("get bar code res: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.code === "455555fgh555") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                barCodeService.get(req, res);
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a barCode', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    type: "upc",
                    code: "15555fff555111",
                    productDetailsId: detailId,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {                        
                        console.log("add barCode res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                barCodeService.add(req, res);
            }, 1000);
        });
    });

    describe('#getByDetails()', function () {
        it('should getByDetails', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    productDetailsId: detailId,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("getByDetails res: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val.length > 0 && val[0].code === "455555fgh555") {
                        console.log("getByDetails res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                barCodeService.getByDetails(req, res);
            }, 1000);
        });
    });
    
    describe('#getByBarCode()', function () {
        it('should getByBarCode', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    clientId: clientId,
                    barCodeType: "upc",
                    barCode: "455555fgh555"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("getByBarCode res: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.sku === "00100212457") {
                        console.log("getByBarCode res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                detailsService.getByBarCode(req, res);
            }, 1000);
        });
    });

    

    describe('#delete()', function () {
        it('should delete a bar code', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = barCodeId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete bar code res: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                barCodeService.delete(req, res);
            }, 1000);
        });
    });



    describe('#delete()', function () {
        it('should delete a product', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = prodId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete product res: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                productService.delete(req, res);
            }, 1000);
        });
    });
});


