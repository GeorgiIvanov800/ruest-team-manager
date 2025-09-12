# SleeveControllerApi

All URIs are relative to *http://localhost:8088*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteSleeve**](#deletesleeve) | **DELETE** /api/v1/sleeves/delete/{id} | |
|[**getAllSleevesInWarehouse**](#getallsleevesinwarehouse) | **GET** /api/v1/sleeves/warehouse/{warehouseId} | |
|[**getArchivedSleeves**](#getarchivedsleeves) | **GET** /api/v1/sleeves/archive | |
|[**getSleeveByPrintingSetNumber**](#getsleevebyprintingsetnumber) | **GET** /api/v1/sleeves | |
|[**getSleeveNumber**](#getsleevenumber) | **GET** /api/v1/sleeves/{sleeveNumber} | |
|[**saveSleeve**](#savesleeve) | **POST** /api/v1/sleeves/save | |
|[**updateSleeve**](#updatesleeve) | **PATCH** /api/v1/sleeves/update/{id} | |

# **deleteSleeve**
> deleteSleeve(deleteSleeveRequest)


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration,
    DeleteSleeveRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let id: number; // (default to undefined)
let deleteSleeveRequest: DeleteSleeveRequest; //

const { status, data } = await apiInstance.deleteSleeve(
    id,
    deleteSleeveRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deleteSleeveRequest** | **DeleteSleeveRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllSleevesInWarehouse**
> PagedModelSleeveResponse getAllSleevesInWarehouse()


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

**PagedModelSleeveResponse**

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

# **getArchivedSleeves**
> PagedModelSleeveArchiveResponse getArchivedSleeves()


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

const { status, data } = await apiInstance.getArchivedSleeves(
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PagedModelSleeveArchiveResponse**

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

# **getSleeveByPrintingSetNumber**
> Array<SleeveResponse> getSleeveByPrintingSetNumber()


### Example

```typescript
import {
    SleeveControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SleeveControllerApi(configuration);

let printingSetNumber: number; // (default to undefined)

const { status, data } = await apiInstance.getSleeveByPrintingSetNumber(
    printingSetNumber
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **printingSetNumber** | [**number**] |  | defaults to undefined|


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

