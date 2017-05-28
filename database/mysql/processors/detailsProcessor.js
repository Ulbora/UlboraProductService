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

//client operations---------------------------------------
var detailsQueries = require("../queries/detailsQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addDetail = function (con, json, callback) {
    var args = {
        sku: json.sku,
        price: json.price,
        product_id: json.productId,
        client_id: json.clientId
    };
    console.log("add Detail in processor: " + JSON.stringify(json));
    crud.insert(con, detailsQueries.PRODUCT_DETAIL_INSERT_QUERY, args, function (result) {
        console.log("Detail add: " + JSON.stringify(result));
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.updateDetail = function (con, json, callback) {
    var args = [
        json.sku,
        json.price,
        json.id,
        json.clientId
    ];
    crud.update(con, detailsQueries.PRODUCT_UPDATE_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.getDetail = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(detailsQueries.PRODUCT_DETAIL_GET_BY_ID_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                sku: result.data[0].sku,
                price: result.data[0].price,
                productId: result.data[0].product_id,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};

exports.getDetailListByProduct = function (json, callback) {
    var queryId = [
        json.productId,
        json.clientId
    ];
    crud.get(detailsQueries.PRODUCT_DETAIL_LIST_BY_PRODUCT_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    sku: result.data[cnt].sku,
                    price: result.data[cnt].price,
                    productId: result.data[cnt].product_id,
                    clientId: result.data[cnt].client_id
                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};

exports.deleteDetail = function (con, id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(con, detailsQueries.PRODUCT_DETAIL_DELETE_QUERY, queryId, callback);
};

