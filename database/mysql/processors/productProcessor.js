/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
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
var productQueries = require("../queries/productQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addProduct = function (con, json, callback) {
    var args = {
        client_id: json.clientId,
        product_name: json.productName,
        brand: json.brand,
        mfn_id: json.mfnId,
        model: json.model,
        description: json.description,
        overview: json.overview,
        specifications: json.specifications

    };
    crud.insert(con, productQueries.PRODUCT_INSERT_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            clientId: json.clientId,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};

exports.updateProduct = function (con, json, callback) {
    var args = [        
        json.productName,
        json.brand,
        json.mfnId,
        json.model,
        json.description,
        json.overview,
        json.specifications,
        json.id,
        json.clientId
    ];
   // console.log("json: " + JSON.stringify(json));
    crud.update(con, productQueries.PRODUCT_UPDATE_QUERY, args, callback);
};


exports.getProduct = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(productQueries.PRODUCT_GET_BY_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                productName: result.data[0].product_name,
                brand: result.data[0].brand,
                mfnId: result.data[0].mfn_id,
                model: result.data[0].model,
                description: result.data[0].description,
                overview: result.data[0].overview,
                specifications: result.data[0].specifications,                
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};



exports.deleteProduct = function (con, id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(con, productQueries.PRODUCT_DELETE_QUERY, queryId, callback);
};
