#api

#Installation



#API Documentation

* [Search for places](#get-v0searchplacesq-s-count-offset) - `GET /v0/search/places`
* [Get a place or a geojson](#get-v0placesid) - `GET /v0/places/{id}`
* [Get multiple places and/or geojsons](#get-v0placesid1id2) - `GET /v0/places/{id1,id2,...}`
* [Create or update a place or geojson](#post-v0placesid) - `POST /v0/places/{id}`
* [Create or update multiple places and/or geojsons](#post-v0places) - `POST /v0/places`
* [Delete a place and/or geojson](#delete-v0placesid) - `DELETE /v0/places/{id}`
* [Delete multiple places and/or geojsons](#delete-v0placesid1-id2) - `DELETE /v0/places/{id1, id2}`
* [Get changes](#get-v0changesfromto) - `GET /v0/changes?{from,to}`

##GET /v0/search/places?{q, s, count, offset}

Search for places.

###Parameters

* `s` - A string to query on. Not that this will search on the field `place.names.name`
* `q` - An elasticsearch Query String. See the [schema](https://github.com/openplacedatabase/www/blob/master/SCHEMA.md) for fields.
* `count` - The number of records you want returned (*Default* 10). A number between 1 and 100 inclusive
* `offset` - The offset for pagination (*Default* 0). A number greater than 0.

###Examples

**Search for "England"**

````
GET /v0/search/places?s=England
Accept: application/json
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": {
    "total": 28,
    "results": [
      {
        "id": "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7",
        "version": 1,
        "names": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "name": "Derbyshire County, England"
          }
        ],
        "geojsons": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "id": "1"
          }
        ],
        "sources": [
          "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
        ],
        "last_edited_by": "System - Initial Import",
        "last_edited_time": 1388443372914
      },
      ...
    ]
  }
}
````

**Search for "England" using offset and count**
````
GET /v0/search/places?s=England&count=100&offset=50
Accept: application/json
````


##GET /v0/places/{id}

Get a place or a geojson associated with a place. 
The geojson's id is the place id and then the geojson id. {place-id}/{geojson-id}.

###Examples

**Get a place**
````
GET /v0/places/8fbe18e1-5d04-4b82-a0e9-1c386ed00de7
Accept: application/json
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": {
    "id": "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7",
    "version": 1,
    "names": [
      {
        "from": "2013-09-01",
        "to": "9999-12-31",
        "name": "Derbyshire County, England"
      }
    ],
    "geojsons": [
      {
        "from": "2013-09-01",
        "to": "9999-12-31",
        "id": "1"
      }
    ],
    "sources": [
      "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
    ],
    "last_edited_by": "System - Initial Import",
    "last_edited_time": 1388443372914
  }
}
````

**Get the places's GeoJSON**

````
GET /v0/places/8fbe18e1-5d04-4b82-a0e9-1c386ed00de7/1
Accept: application/json
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -0.948675997784251,
          52.476097841057374
        ],
        [
          -0.94867772070259,
          52.47614910244223
        ],
        [
          -0.948478899873061,
          52.47621296629093
        ],
        [
          -0.948457262348746,
          52.476255928548056
        ],
        [
          -0.948675997784251,
          52.476097841057374
        ]
      ]
    ]
  }
}
````

##GET /v0/places/{id1,id2,...}

Get multiple places and/or geojsons

###Examples

**Get two places at the same time**
````
GET /v0/places/8fbe18e1-5d04-4b82-a0e9-1c386ed00de7,54eebb2c-4a92-4ca7-a5f9-0ea9069f95b5
Accept: application/json
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": {
    "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7": {
      "status": {
        "code": 200,
        "msgs": []
      },
      "data": {
        "id": "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7",
        "version": 1,
        "names": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "name": "Derbyshire County, England"
          }
        ],
        "geojsons": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "id": "1"
          }
        ],
        "sources": [
          "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
        ],
        "last_edited_by": "System - Initial Import",
        "last_edited_time": 1388443372914
      }
    },
    "d8e30c45-9470-49d3-ac9d-e7f7b7b2e1ba": {
      "status": {
        "code": 200,
        "msgs": []
      },
      "data": {
        "id": "d8e30c45-9470-49d3-ac9d-e7f7b7b2e1ba",
        "version": 1,
        "names": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "name": "Leicestershire County, England"
          }
        ],
        "geojsons": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "id": "1"
          }
        ],
        "sources": [
          "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
        ],
        "last_edited_by": "System - Initial Import",
        "last_edited_time": 1388443376231
      }
    }
  }
}
````

**Get a valid place a bogus place**
````
GET /v0/places/8fbe18e1-5d04-4b82-a0e9-1c386ed00de7,54eebb2c-4a92-4ca7-a5f9-0ea9069f95bf
Accept: application/json
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": {
    "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7": {
      "status": {
        "code": 200,
        "msgs": []
      },
      "data": {
        "id": "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7",
        "version": 1,
        "names": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "name": "Derbyshire County, England"
          }
        ],
        "geojsons": [
          {
            "from": "2013-09-01",
            "to": "9999-12-31",
            "id": "1"
          }
        ],
        "sources": [
          "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
        ],
        "last_edited_by": "System - Initial Import",
        "last_edited_time": 1388443372914
      }
    },
    "54eebb2c-4a92-4ca7-a5f9-0ea9069f95bf": {
      "status": {
        "code": 404,
        "msgs": ["Not found"]
      },
      "data": false
  }
}
`````

##POST /v0/places/{id}

Create or update a place or geojson

###Examples

**Add a new place**

````
POST /api/v0/places/61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae
Content-Type: application/json
Accept: application/json

{
  "id": "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7",
  "version": 1,
  "names": [
    {
      "from": "2013-09-01",
      "to": "9999-12-31",
      "name": "Derbyshire County, England"
    }
  ],
  "geojsons": [
    {
      "from": "2013-09-01",
      "to": "9999-12-31",
      "id": "1"
    }
  ],
  "sources": [
    "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
  ]
}
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": true
}
````

**Add a new place, but missing the names block**

````
POST /v0/places/61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae
Content-Type: application/json
Accept: application/json

{
  "id": "a90af1cb-7e45-4235-aac0-fabf0233edb9",
  "version": 1,
  "geojsons": [
    {
      "from": "2013-09-01",
      "to": "9999-12-31",
      "id": "1"
    }
  ],
  "sources": [
    "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
  ]
}
````

````
400 Bad Request

{
  "status": {
    "code": 400,
    "msgs": [
      "names is required"
    ]
  },
  "data": false
}
````


##POST /v0/places

Create or update multiple places and/or geojsons simultaneously.

###Examples

**Add a new place and its geojsons**

````
POST /v0/places
Content-Type: application/json
Accept: application/json

{
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7": {
    "id": "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7",
    "version": 1,
    "names": [
      {
        "from": "2013-09-01",
        "to": "9999-12-31",
        "name": "Derbyshire County, England"
      }
    ],
    "geojsons": [
      {
        "from": "2013-09-01",
        "to": "9999-12-31",
        "id": "1"
      }
    ],
    "sources": [
      "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
    ]
  },
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7/1": {
    "type": "Point",
    "coordinates": [
      -0.948675997784251,
      52.476097841057374
    ]
  }
}
````

````
200 OK

{
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7": {
    "status": {
      "code": 200,
      "msgs": []
    },
    "data": true
  },
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7/1": {
    "status": {
      "code": 200,
      "msgs": []
    },
    "data": true
  }
}
````

**Add a new place, but the geojson in is bad**

````
POST /v0/places
Content-Type: application/json
Accept: application/json

{
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7": {
    "id": "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7",
    "version": 1,
    "names": [
      {
        "from": "2013-09-01",
        "to": "9999-12-31",
        "name": "Derbyshire County, England"
      }
    ],
    "geojsons": [
      {
        "from": "2013-09-01",
        "to": "9999-12-31",
        "id": "1"
      }
    ],
    "sources": [
      "Initially imported using Ordnance Survey data © Crown copyright and database right 2013"
    ]
  },
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7/1": {
    "type": "MultiPoint",
    "coordinates": [
      -0.948675997784251,
      52.476097841057374
    ]
  }
}
````

````
200 OK

{
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7": {
    "status": {
      "code": 200,
      "msgs": []
    },
    "data": true
  },
  "8fbe18e1-5d04-4b82-a0e9-1c386ed00de7/1": {
    "status": {
      "code": 400,
      "msgs": ["GeoJSON Error: position should be an array, is a number instead at line 1"]
    },
    "data": false
  }
}
````



##DELETE /v0/places/{id}
Delete a place and/or geojson

###Examples

**Delete a place**

````
DELETE /v0/places/61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": true
}
````

**Delete a place, but for some reason it failed**

````
DELETE /v0/places/61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae
````

````
500 Internal Server Error

{
  "status": {
    "code": 500,
    "msgs": ["Unhelpful error message"]
  },
  "data": false
}
````


##DELETE /v0/places/{id1, id2}

Delete multiple places and/or geojsons simultaneously.

###Examples

**Delete a place and its geojson**

````
DELETE /v0/places/61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae,61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae/1
````

````
200 OK

{
  "61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae": {
    "status": {
      "code": 200,
      "msgs": []
    },
    "data": true
  },
  "61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae/1": {
    "status": {
      "code": 200,
      "msgs": []
    },
    "data": true
  }
}
````

**Delete a place and its geojson, but the place failed to delete**

````
DELETE /v0/places/61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae,61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae/1
````

````
200 OK

{
  "61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae": {
    "status": {
      "code": 500,
      "msgs": ["Another unhelpful error message"]
    },
    "data": false
  },
  "61cc4c9f-0dd6-4dcd-8f5e-e8f52f28d3ae/1": {
    "status": {
      "code": 200,
      "msgs": []
    },
    "data": true
  }
}
````


##GET /v0/changes?{from,to}

Get a list of all places and their geojsons that have changed

###Parameters

* `from` - A timestamp to get changes from (*Default* null). If not set changes from the beginning of time will be returned. Please don't do that.
* `to` - A timestamp to get changes until (*Default* null). If not set will return as many changes as it can.

###Examples

**Get Changes from 1389710140336**

````
GET /v0/changes?from=1389710140336
Accept: application/json
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": [
    {
      "timestamp": 1389710140336,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389710167169,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389724469377,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389724585771,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389724624560,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389724640538,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    }
  ]
}
````

**Get Changes from 1389710140336 to 1389724585771**

````
GET /v0/changes?from=1389898363&to=1389724585771
Accept: application/json
````

````
200 OK

{
  "status": {
    "code": 200,
    "msgs": []
  },
  "data": [
    {
      "timestamp": 1389710140336,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389710167169,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389724469377,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    },
    {
      "timestamp": 1389724585771,
      "id": "790af1cb-7e45-4235-aac0-fabf0233edb9"
    }
  ]
}
````

##GET /v0/maps/{id}

##POST /v0/maps/{id}

##DELETE /v0/maps/{id}

##POST /v0/tools/convert

##POST /v0/tools/warp
