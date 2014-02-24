# Changes Documentation

* [Get changes](#get-v0changesfromto) - `GET /v0/changes?{from,to}`

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