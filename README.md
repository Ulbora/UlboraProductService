Ulbora Product Service 
==============

A Product Micro Service

## Add Product

```
POST:
URL: http://localhost:3005/rs/product/add

Example Request
{
   "clientId":"clientId",
   "productName":"Cap",
   "brand":"Nike",
   "mfnId":1,
   "model":"123_Cap",
   "description":"A black Cap",
   "overview":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld",
   "specifications":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff"
}
  
```

```
Example Response   

{
  "success": true,
  "id": 176,
  "clientId": "403",
  "message": ""
}

```

## Update Product

```
PUT:
URL: http://localhost:3005/rs/product/update

Example Request
{
   "id":176,
   "clientId":"403",
   "productName":"Hat",
   "brand":"Nike",
   "mfnId":1,
   "model":"123_Hat",
   "description":"A black Cap",
   "overview":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld",
   "specifications":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff"
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}


## Get Product

```
GET:
URL: http://localhost:3005/rs/product/get/176/403
  
```

```
Example Response   

{
  "id": 176,
  "productName": "Hat",
  "brand": "Nike",
  "mfnId": 1,
  "model": "123_Hat",
  "description": "A black Cap",
  "overview": {
    "type": "Buffer",
    "data": [
      49,
      49,
      49,      
      100
    ]
  },
  "specifications": {
    "type": "Buffer",
    "data": [
      49,
      49,
      49,      
      102
    ]
  },
  "clientId": 403
}
```


## Delete Product

```
DELETE:
URL: http://localhost:3005/rs/product/delete/176/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```