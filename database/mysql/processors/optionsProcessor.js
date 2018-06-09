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
var optionsQueries = require("../queries/optionsQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addOption = function (con, json, callback) {
    var args = {
        option_name: json.optionName,
        option_value: json.optionValue,
        product_details_id: json.productDetailsId,
        client_id: json.clientId
    };
    console.log("add address in processor: " + JSON.stringify(json));
    crud.insert(con, optionsQueries.OPTIONS_INSERT_QUERY, args, function (result) {
        console.log("options add: " + JSON.stringify(result));
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.updateOption = function (con, json, callback) {
    var args = [
        json.optionName,
        json.optionValue,
        json.id,
        json.clientId
    ];
    crud.update(con, optionsQueries.OPTIONS_UPDATE_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.getOption = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(optionsQueries.OPTIONS_GET_BY_ID_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                optionName: result.data[0].option_name,
                optionValue: result.data[0].option_value,
                productDetailsId: result.data[0].product_details_id,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};


exports.getOptionListByDetails = function (json, callback) {
    var queryId = [
        json.productDetailsId,
        json.clientId
    ];
    crud.get(optionsQueries.OPTIONS_LIST_BY_DETAILS_QUERY, queryId, function (result) {
        var rtnList = [];
        if (result.success && result.data.length > 0) {            
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    optionName: result.data[cnt].option_name,
                    optionValue: result.data[cnt].option_value,
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


exports.searchByOptionName = function (json, callback) {
    var queryId = [
        json.productDetailsId,
        json.clientId,
        json.optionName
    ];
    crud.get(optionsQueries.OPTIONS_LIST_SEARCH_BY_OPTION_QUERY, queryId, function (result) {
        var rtn;
        if (result.success && result.data.length > 0) {            
            rtn = {
                id: result.data[0].id,
                optionName: result.data[0].option_name,
                optionValue: result.data[0].option_value,
                productDetailsId: result.data[0].product_details_id,
                clientId: result.data[0].client_id
            };            
            callback(rtn);
        } else {
            callback(rtn);
        }
    });
};



exports.deleteOption = function (con, id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(con, optionsQueries.OPTIONS_DELETE_QUERY, queryId, callback);
};

