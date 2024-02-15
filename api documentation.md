# IoT Device Management API Documentation

**Base URL**


`http://localhost:3000`

**1. Device Registration Endpoint**

```
POST /register

Request Body

deviceId: Unique identifier for the device. (Required)
deviceType: Type of the device. (Required)

Example Request:

{
  "deviceId": "device123",
  "deviceType": "temperature_sensor"
}
```

```
Response

Status: 201 Created
Body: Success message if registration is successful.
Error Responses
Status: 400 Bad Request
Body: Error message if deviceId or deviceType is missing or invalid.
Status: 409 Conflict
Body: Error message if the device already exists.
```


**2. Displaying Devices Endpoint**

```
GET /show

Response

Status: 200 OK
Body: List of registered devices.
Error Responses
Status: 500 Internal Server Error
Body: Error message if there's an issue retrieving the devices.
```


**3. Receiving Device Data Endpoint**

```
POST /data

Request Body
deviceId: Unique identifier for the device. (Required)
data: Data sent by the device. (Required)

Example Request

{
  "deviceId": "device123",
  "data": "25°C"
}
```

```
Response

Status: 200 OK
Body: Success message if data is received successfully.
Error Responses
Status: 400 Bad Request
Body: Error message if deviceId or data is missing or invalid.
```

**4. Sending Commands to Devices Endpoint**

```
POST /command

Request Body
deviceId: Unique identifier for the device. (Required)
command: Command to be sent to the device. (Required)

Example Request

{
  "deviceId": "device123",
  "command": "turn_on"
}
```

```
Response

Status: 200 OK
Body: Success message if command is sent successfully.
Error Responses
Status: 400 Bad Request
Body: Error message if deviceId or command is missing or invalid.
```
