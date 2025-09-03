# TESTS.md

## Overview
This project uses **Mocha + Chai + chai-http** for testing, with an **in-memory MongoDB** provided by `mongodb-memory-server`.  
All tests passed successfully on the latest run (`8 passing`).  

## Test Cases

| ID  | Test Name | Steps | Expected Result | Actual Result | Status |
|-----|-----------|-------|-----------------|---------------|--------|
| T1  | Health check | Send `GET /health` | Returns HTTP 200 and `{ ok: true }` | Received HTTP 200 and `{ ok: true }` | ✅ Pass |
| T2  | List all stations | Send `GET /api/charging-stations` | Returns HTTP 200 and array of station objects | Received HTTP 200 and array (length > 0) | ✅ Pass |
| T3  | Get station by ID | Send `GET /api/charging-stations/:id` with seeded ID | Returns HTTP 200 and station object with matching `_id` | Received HTTP 200 and correct object | ✅ Pass |
| T4  | Create station (valid) | Send `POST /api/charging-stations` with valid payload | Returns HTTP 201 and created station object | Received HTTP 201 and correct object | ✅ Pass |
| T5  | Create station (invalid) | Send `POST /api/charging-stations` with invalid body | Returns HTTP 400/422 error | Received HTTP 400 | ✅ Pass |
| T6  | Service: getAllStations | Call `getAllStations()` | Returns an array of station objects | Returned an array (length > 0) | ✅ Pass |
| T7  | Service: getStationById | Call `getStationById(id)` with valid/invalid IDs | Valid: returns object; Invalid: returns null/undefined | Valid returned object; invalid returned null | ✅ Pass |
| T8  | Service: addStation | Call `addStation(payload)` with valid data | Returns created station object with `name` + `_id` | Returned object with correct data | ✅ Pass |

## Summary
- **Total tests:** 8  
- **Passed:** 8  
- **Failed:** 0  
- **Pending/Skipped:** 0  

✅ The testing setup is complete and stable.
