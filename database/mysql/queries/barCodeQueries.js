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
exports.BAR_CODE_INSERT_QUERY = "INSERT INTO bar_code Set ?";

exports.BAR_CODE_UPDATE_QUERY = "UPDATE bar_code SET type = ?, code = ? " +                                
                                "WHERE id = ? and client_id = ? ";
                        
exports.BAR_CODE_GET_BY_ID_QUERY = "SELECT * FROM bar_code WHERE id = ? and client_id = ? ";

exports.BAR_CODE_DELETE_QUERY = "DELETE FROM bar_code WHERE id = ?  and client_id = ? ";

exports.BAR_CODE_LIST_BY_DETAILS_QUERY = "SELECT * FROM bar_code " +
                                               "WHERE product_details_id = ? " + 
                                               "and client_id = ? ";

