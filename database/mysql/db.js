/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var crud = require("./crud/mysqlCrud");
var barCodeProcessor = require("./processors/barCodeProcessor");
var detailsProcessor = require("./processors/detailsProcessor");
var optionsProcessor = require("./processors/optionsProcessor");
var productProcessor = require("./processors/productProcessor");

exports.connect = function (host, user, pw, db, cpnum) {
    crud.connect(host, user, pw, db, cpnum);
    barCodeProcessor.init(crud);
    detailsProcessor.init(crud);
    optionsProcessor.init(crud);
    productProcessor.init(crud);
};
// for testing only
exports.testConnection = function (callback) {
    crud.testConnection(callback);
};

// for testing only
exports.getConnection = function (callback) {
    crud.getConnection(callback);
};

exports.addBarCode = function (json, callback) {
    barCodeProcessor.addBarCode(null, json, callback);
};

exports.updateBarCode = function (json, callback) {
    barCodeProcessor.updateBarCode(null, json, callback);
};

exports.getBarCode = function (id, clientId, callback) {
    barCodeProcessor.getBarCode(id, clientId, callback);
};

exports.getBarCodeListByDetails = function (json, callback) {
    barCodeProcessor.getBarCodeListByDetails(json, callback);
};

exports.deleteBarCode = function (id, clientId, callback) {
    barCodeProcessor.deleteBarCode(null, id, clientId, callback);
};


exports.getDetailByBarCode = function (json, callback) {
    detailsProcessor.getDetailByBarCode(json, callback);
};

exports.getDetailBySku = function (json, callback) {
    detailsProcessor.getDetailBySku(json, callback);
};