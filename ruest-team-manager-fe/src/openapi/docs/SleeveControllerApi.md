# SleeveControllerApi

All URIs are relative to *http://localhost:8088/api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteSleeve**](#deletesleeve) | **DELETE** /sleeves/delete/{id} | |
|[**getAllSleevesInWarehouse**](#getallsleevesinwarehouse) | **GET** /sleeves/warehouse/{warehouseId} | |
|[**getSleeveNumber**](#getsleevenumber) | **GET** /sleeves/{sleeveNumber} | |
|[**getSleeveSequenceNumber**](#getsleevesequencenumber) | **GET** /sleeves | |
|[**saveSleeve**](#savesleeve) | **POST** /sleeves/save | |
|[**updateSleeve**](#updatesleeve) | **PATCH** /sleeves/update/{id} | |

# **deleteSleeve**
> deleteSleeve()


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteSleeve(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllSleevesInWarehouse**
> PageSleeveResponse getAllSleevesInWarehouse()


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let pageable: Pageable; // (default to undefined)
let warehouseId: number; // (default to undefined)

const { status, data } = await apiInstance.getAllSleevesInWarehouse(
    pageable,
    warehouseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **warehouseId** | [**number**] |  | defaults to undefined|


### Return type

**PageSleeveResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSleeveNumber**
> SleeveResponse getSleeveNumber()


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let sleeveNumber: number; // (default to undefined)

const { status, data } = await apiInstance.getSleeveNumber(
    sleeveNumber
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sleeveNumber** | [**number**] |  | defaults to undefined|


### Return type

**SleeveResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSleeveSequenceNumber**
> Array<SleeveResponse> getSleeveSequenceNumber()


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let sequence: number; // (default to undefined)

const { status, data } = await apiInstance.getSleeveSequenceNumber(
    sequence
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sequence** | [**number**] |  | defaults to undefined|


### Return type

**Array<SleeveResponse>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **saveSleeve**
> SleeveResponse saveSleeve(saveSleeveRequest)


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration,
    SaveSleeveRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let saveSleeveRequest: SaveSleeveRequest; //

const { status, data } = await apiInstance.saveSleeve(
    saveSleeveRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **saveSleeveRequest** | **SaveSleeveRequest**|  | |


### Return type

**SleeveResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateSleeve**
> SleeveResponse updateSleeve(requestBody)


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let id: number; // (default to undefined)
let requestBody: { [key: string]: any; }; //

const { status, data } = await apiInstance.updateSleeve(
    id,
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: any; }**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**SleeveResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

