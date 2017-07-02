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
exports.OPTIONS_INSERT_QUERY = "INSERT INTO product_options Set ?";

exports.OPTIONS_UPDATE_QUERY = "UPDATE product_options SET option_name = ?, option_value = ? " +                                
                               "WHERE id = ? and client_id = ? ";
                       
exports.OPTIONS_GET_BY_ID_QUERY = "SELECT * FROM product_options WHERE id = ? and client_id = ? ";

exports.OPTIONS_DELETE_QUERY = "DELETE FROM product_options WHERE id = ?  and client_id = ? ";

exports.OPTIONS_LIST_BY_DETAILS_QUERY = "SELECT * FROM product_options " +
                                               "WHERE product_details_id = ? " + 
                                               "and client_id = ? ";
                                       
exports.OPTIONS_LIST_SEARCH_BY_OPTION_QUERY = "SELECT * FROM product_options " +
                                               "WHERE product_details_id = ? " + 
                                               "and client_id = ? " +
                                               "and option_name like ?";
