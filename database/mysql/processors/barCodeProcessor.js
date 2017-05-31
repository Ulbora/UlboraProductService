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
var barCodeQueries = require("../queries/barCodeQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addBarCode = function (con, json, callback) {
    var args = {
        type: json.type,
        code: json.code,
        product_details_id: json.productDetailsId,
        client_id: json.clientId
    };
    console.log("add bar code in processor: " + JSON.stringify(json));
    crud.insert(con, barCodeQueries.BAR_CODE_INSERT_QUERY, args, function (result) {
        console.log("bar code add: " + JSON.stringify(result));
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.updateBarCode = function (con, json, callback) {
    var args = [
        json.type,
        json.code,
        json.id,
        json.clientId
    ];
    crud.update(con, barCodeQueries.BAR_CODE_UPDATE_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.getBarCode = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(barCodeQueries.BAR_CODE_GET_BY_ID_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                type: result.data[0].type,
                code: result.data[0].code,
                productDetailsId: result.data[0].product_details_id,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};


exports.getBarCodeListByDetails = function (json, callback) {
    var queryId = [
        json.productDetailsId,
        json.clientId
    ];
    crud.get(barCodeQueries.BAR_CODE_LIST_BY_DETAILS_QUERY, queryId, function (result) {
        var rtnList = [];
        if (result.success && result.data.length > 0) {            
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    type: result.data[cnt].type,
                    code: result.data[cnt].code,
                    productDetailsId: result.data[cnt].product_details_id,
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


exports.deleteBarCode = function (con, id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(con, barCodeQueries.BAR_CODE_DELETE_QUERY, queryId, callback);
};

