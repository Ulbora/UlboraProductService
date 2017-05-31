var assert = require('assert');
var db = require("../../../database/mysql/db");
var crud = require("../../../database/mysql/crud/mysqlCrud");
var productProcessor = require("../../../database/mysql/processors/productProcessor");
var optionsProcessor = require("../../../database/mysql/processors/optionsProcessor");
var cusId1;
var cusId2;
var clientId = "5584567";
var addressId;

describe('mysql DB address', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            db.testConnection(function (success) {
                if (success) { 
                    productProcessor.init(crud);                               
                    optionsProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });    

});

