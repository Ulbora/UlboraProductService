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

//client   
exports.PRODUCT_INSERT_QUERY = "INSERT INTO product Set ?";

exports.PRODUCT_UPDATE_QUERY = "UPDATE product SET product_name = ?, brand = ?, mfn_id = ?, " + 
                               "model = ?, description = ?, overview = ?, " +
                               "specifications = ? " +
                               "WHERE id = ? and client_id = ? ";
                        
                              
exports.PRODUCT_GET_BY_QUERY = "SELECT * FROM product WHERE id = ? and client_id = ? ";

exports.PRODUCT_DELETE_QUERY = "DELETE FROM product WHERE id = ? and client_id = ? ";

exports.CUSTOMER_LIST_QUERY = "SELECT * FROM customer " +
                              "order by client_id, email_address ";
                      
exports.CUSTOMER_LIST_BY_CLIENT_QUERY = "SELECT * FROM customer " +
                                        "where client_id = ? " +
                                        "order by email_address ";                      
