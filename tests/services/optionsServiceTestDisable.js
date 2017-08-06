var assert = require('assert');
var db = require("../../database/db");
var productService = require("../../services/productService");
var detailsService = require("../../services/detailsService");
var optionsService = require("../../services/optionsService");
var tokenFile = require("./token");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var prodId;
var detailId;
var optionId;
var clientId = "64545645334";
describe('optionsService', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            setTimeout(function () {
                productService.init(db);
                detailsService.init(db);
                optionsService.init(db);
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
        it('should add option', function (done) {
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
                    optionName: "color",
                    optionValue: "blue",
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
                        optionId = val.id;
                        console.log("add option res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                optionsService.add(req, res);
            }, 1000);
        });
    });



    describe('#update()', function () {
        it('should update option', function (done) {
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
                    optionName: "weight",
                    optionValue: "5.5",
                    id: optionId,
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
                        console.log("update option res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                optionsService.update(req, res);
            }, 1000);
        });
    });


    describe('#get()', function () {
        it('should get a option', function (done) {
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
                req.params.id = optionId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("get option res: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.optionName === "weight") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                optionsService.get(req, res);
            }, 1000);
        });
    });

    describe('#add()', function () {
        it('should add option', function (done) {
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
                    optionName: "color",
                    optionValue: "blue",
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
                        optionId = val.id;
                        console.log("add option res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                optionsService.add(req, res);
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
                    } else if (val.length > 0 && val[0].optionName === "weight") {
                        console.log("getByDetails res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                optionsService.getByDetails(req, res);
            }, 1000);
        });
    });


    describe('#searchByOption()', function () {
        it('should searchByOption', function (done) {
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
                    clientId: clientId,
                    optionName: "%color%"
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
                    console.log("searchByOption res: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.optionValue === "blue") {
                        console.log("searchByOption res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                optionsService.searchByOption(req, res);
            }, 1000);
        });
    });




    describe('#delete()', function () {
        it('should delete a option', function (done) {
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
                req.params.id = optionId;
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
                optionsService.delete(req, res);
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


