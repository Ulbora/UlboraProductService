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
exports.PRODUCT_DETAIL_INSERT_QUERY = "INSERT INTO product_details Set ?";
exports.PRODUCT_UPDATE_QUERY = "UPDATE product_details SET sku = ?, price = ? " +                                
                               "WHERE id = ? and client_id = ? ";
exports.PRODUCT_DETAIL_GET_BY_ID_QUERY = "SELECT * FROM product_details WHERE id = ? and client_id = ? ";
exports.PRODUCT_DETAIL_DELETE_QUERY = "DELETE FROM product_details WHERE id = ?  and client_id = ? ";
exports.PRODUCT_DETAIL_LIST_BY_PRODUCT_QUERY = "SELECT * FROM product_details " +
                                               "WHERE product_id = ? " + 
                                               "and client_id = ? ";
                                       
exports.PRODUCT_DETAIL_GET_BY_BAR_CODE = "select d.id as product_details_id, d.product_id, d.sku " +
                                         "from product p " +
                                         "inner join product_details d " +
                                         "on p.id = d.product_id " +
                                         "left join bar_code c " +
                                         "on d.id = c.product_details_id " +
                                         "where p.client_id = ? and c.type = ? and c.code = ? ";      
                                 
exports.PRODUCT_DETAIL_GET_BY_SKU = "select d.id as product_details_id, p.product_name, p.brand, p.model, " +
                                    "p.description, d.product_id, d.sku, d.price, d.client_id " +
                                    "from product p " +
                                    "inner join product_details d " +
                                    "on p.id = d.product_id " +                                    
                                    "where p.client_id = ? and d.sku like ? ";                                       
