## Basic List Filtering

| **Request** | **Parameters** |
| --- | --- |
| `/endpoint?attributeName=value` | `{"attributeName": "value"}` |
| `/endpoint?attributeName=value&otherAttributeName=anotherValue` | `{"attributeName": "value", "otherAttributeName": "anotherValue"}` |
| `/endpoint?attributeName=value&attributeName=anotherValue` | `{"attributeName": ["value", "anotherValue"]}` |
| `/endpoint?sample.nested.attribute=value` | `{"sample": {"nested": {"attribute": "value"}}}` |

## Advanced List Filtering

For advanced filtering, it is necessary to know the operators first, and the operators are as follows

| **Operator** | **Description** |
| --- | --- |
| `__ne` | `<>` |
| `__is` | `IS` |
| `__not` | `NOT` |
| `__gt` | `> 5` |
| `__gte` | `>= 5` |
| `__lt` | `< 5` |
| `__lte` | `<= 5` |
| `__between` | `BETWEEN [1, 2]` |
| `__notBetween` | `NOT BETWEEN [1, 2]` |
| `__in` | `IN [1, 2]` |
| `__notIn` | `NOT IN [1, 2]` |
| `__like` | `LIKE 'value'` |
| `__notLike` | `NOT LIKE 'value'` |
| `__startsWith` | `LIKE 'value%'` |
| `__endsWith` | `LIKE '%value'` |
| `__substring` | `LIKE '%value%'` |

Now that we understand operators, let's see how we can use operators.

| **Request** | **Parameters** |
| --- | --- |
| `/endpoint?attributeName__gt=value` | `{"attributeName": {$gt: "value"}}` |
| `/endpoint?sample.nested.attribute__gt=value` | `{"sample": {"nested": {"attribute": {$gt: "value"}}}}` |

## Limit & Pagination

The `__limit` property is `10`, `__page` property is `1` by default.

| **Request** | **Parameters** |
| --- | --- |
| `/endpoint?[filtering]` | Return first 10 items by default |
| `/endpoint?[filtering]&limit=15` | Return first 15 items |
| `/endpoint?[filtering]&page=2` | Return second 10 items by default |
| `/endpoint?[filtering]&limit=15&page=2` | Return second 15 items |

## Order

If the requested object has the `ID` attribute, the `__order` property is set to `{"id": "ASC"}`, but if the requested object does not have the `ID` attribute, no ordering is applied.

| **Request** | **Parameters** |
| --- | --- |
| `/endpoint?[filtering]` | Return items with default ordering |
| `/endpoint?[filtering]&order={"attributeName": "ASC"}` | Return items order attributeName ASC |
| `/endpoint?[filtering]&order={"attributeName": "DESC"}` | Return items order attributeName DESC |

## Example Success List Response

``` json
{
    "status": true,
    "data": {
        "totalItems": 3,
        "items": [
            { /* item */ }
            //...
        ],
        "totalPages": 1,
        "currentPage": 1
    }
}

 ```

## Example Success Detail Response

``` json
{
    "status": true,
    "data": {
        //...
    }
}

 ```

## Example Error Response

``` json
{
    "status": false,
    "data": {
        "error": {
            "message": "Error Message",
            "code": "1234", /* optional */
            "details": /* optional */{
                "name": "detailName",   /* optional */
                "code": "detailCode"    /* optional */
            }
        }
    }
}

 ```

## Error Codes

| **Code** | **Name** | **Template** |
| --- | --- | --- |
| 5001 | Foreign ID Not Found | 'TableName.ID' not found! |
| 5002 | Foreign ID is Referenced | 'ID' is referenced from 'TableName'! |
| 5003 | Already Exists | 'TableName(attribute=value)' is already exists! |