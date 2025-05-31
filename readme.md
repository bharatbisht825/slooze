# installation
## backend
1 . Open your terminal and navigate to the backend directory:
   cd backend
2. write npm install in terminal
3. write npm run in terminal


## frontend
1 . Open your terminal and navigate to the frontend directory:
   cd frontend
2. write npm install in terminal
3. write npm run dev in terminal


## User Credentials

1. **Nick Fury**  
   - Email: `nickfury@example.com`  
   - Password: `1234`
   - Admin

2. **Captain Marvel**  
   - Email: `captainmarvel@example.com`  
   - Password: `1234`
   - Manager

3. **Captain America**  
   - Email: `captainamerica@example.com`  
   - Password: `1234`
   - Manager

4. **Thanos**  
   - Email: `thanos@example.com`  
   - Password: `1234`
   - Member

5. **Thor**  
   - Email: `thor@example.com`  
   - Password: `1234`
   - MEMEBER

6. **Travis**  
   - Email: `travis@example.com`  
   - Password: `1234`
   - MEMBER



# API Documentation

This document outlines all the available API endpoints, their functionality, required authentication, and response behavior.

---

## Endpoints

### **POST /login**
- **Description:** Logs a user into the system.
- **Controller:** `loginUser`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - 200 OK: Successful login with user details and token.

---

### **POST /register**
- **Description:** Registers a new user in the system.
- **Controller:** `createUser`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member",
    "country": "India",
    "password": "securePass"
  }
  ```
- **Response:**
  - 201 Created: User registered successfully.

---

### **GET /restaurant**
- **Protected:** ✅
- **Description:** Fetches restaurant data based on the user's location provided during sign-up.
- **Controller:** `getRestaurant`
- **Response:**
  - 200 OK: List of nearby restaurants.

---

### **GET /getDishes/:id**
- **Protected:** ✅
- **Description:** Retrieves dishes for a specific restaurant by ID.
- **Controller:** `getDishes`
- **Params:** `id` - Restaurant ID
- **Response:**
  - 200 OK: List of dishes for the restaurant.

---

### **POST /addCart**
- **Protected:** ✅
- **Description:** Adds dishes to the user's cart.
- **Controller:** `addCart`
- **Response:**
  - 200 OK: Dish added to cart.

---

### **POST /delCart**
- **Protected:** ✅
- **Description:** Removes dishes from the user's cart.
- **Controller:** `removeCart`
- **Response:**
  - 200 OK: Dish removed from cart.

---

### **GET /getCart**
- **Protected:** ✅
- **Description:** Retrieves all dishes currently in the user's cart.
- **Controller:** `getCart`
- **Response:**
  - 200 OK: Cart contents.

---

### **POST /order**
- **Protected:** ✅
- **Description:** Places an order for the items in the user's cart.
- **Controller:** `submitOrder`
- **Response:**
  - 201 Created: Order placed.

---

### **POST /orderQuee**
- **Protected:** ✅
- **Description:** Allows admins or managers to place orders from the checkout queue.
- **Controller:** `submitOrderQuee`
- **Response:**
  - 201 Created: Order placed from queue.

---

### **POST /addQuee**
- **Protected:** ✅
- **Description:** Allows members to push their cart to the checkout queue for admin/manager approval.
- **Controller:** `addToCheckoutQuee`
- **Response:**
  - 200 OK: Cart pushed to queue.

---

### **GET /getQuee**
- **Protected:** ✅
- **Description:** Retrieves orders currently in the checkout queue.
- **Controller:** `getCheckoutQuee`
- **Response:**
  - 200 OK: List of queued orders.

---

### **GET /getOrder**
- **Protected:** ✅
- **Description:** Retrieves all orders that have been placed.
- **Controller:** `getOrders`
- **Response:**
  - 200 OK: List of all placed orders.

---

### **POST /delOrder**
- **Protected:** ✅
- **Description:** Deletes a placed order.
- **Controller:** `delOrders`
- **Request Body:**
  ```json
  {
    "orderId": "123456"
  }
  ```
- **Response:**
  - 200 OK: Order deleted.


# Database Schema Documentation

---

## Collection: **Checkout**

| Field Name | Data Type | Required | Description                         |
|------------|------------|----------|-----------------------------------|
| `email`    | String     | Yes      | User's email address               |
| `cart`     | Object     | Yes      | Cart details (dishes and quantity)|
| `createdAt`| Date       | Auto     | Timestamp when the document created (auto-generated) |
| `updatedAt`| Date       | Auto     | Timestamp when the document last updated (auto-generated) |


---

## Collection: **CheckoutQueue**

| Field Name | Data Type | Required | Description                                   |
|------------|------------|----------|-----------------------------------------------|
| `queeId`   | String     | Yes      | Unique identifier for the queue entry         |
| `orderBy`  | String     | Yes      | User who placed the order (could be user ID or email) |
| `orderFor` | String     | Yes      | Intended recipient or customer for the order  |
| `cart`     | Object     | Yes      | Cart details including dishes and quantities  |
| `total`    | Number     | Yes      | Total amount for the order                      |
| `address`  | String     | Yes      | Delivery or billing address                      |
| `createdAt`| Date       | Auto     | Timestamp when the document was created         |
| `updatedAt`| Date       | Auto     | Timestamp when the document was last updated    |



---

## Collection: **Order**

| Field Name     | Data Type | Required | Description                       |
|----------------|------------|----------|---------------------------------|
| `clientEmail`  | String     | Yes      | Email of the client who placed the order |
| `cart`         | Object     | Yes      | Cart details with dishes and quantities |
| `paymentMethod`| String     | Yes      | Payment method used for the order (e.g., credit card, cash) |
| `date`         | Date       | No       | Date when the order was placed (defaults to current date/time) |


---

## Collection: **Restaurant**

| Field Name | Data Type     | Required | Description                              |
|------------|---------------|----------|------------------------------------------|
| `rId`      | String        | Yes      | Unique restaurant identifier             |
| `name`     | String        | Yes      | Name of the restaurant                    |
| `owner`    | String        | Yes      | Owner's name                             |
| `country`  | String        | Yes      | Country where the restaurant is located  |
| `dishes`   | Array of Objects | No (default empty array) | List of dishes offered by the restaurant |

| `createdAt`| Date          | Auto     | Timestamp when the document was created  |
| `updatedAt`| Date          | Auto     | Timestamp when the document was last updated |



---

## Collection: **User**

| Field Name | Data Type | Required | Description                                      |
|------------|------------|----------|------------------------------------------------|
| `name`     | String     | Yes      | User's full name, trimmed                       |
| `email`    | String     | Yes      | User's email address, unique, lowercase, trimmed |
| `role`     | String     | Yes      | User role; must be one of: `admin`, `manager`, or `member` |
| `country`  | String     | Yes      | Country of the user, trimmed                    |
| `password` | String     | Yes      | Hashed password for user authentication         |
| `createdAt`| Date       | Auto     | Timestamp when the document was created         |
| `updatedAt`| Date       | Auto     | Timestamp when the document was last updated    |



---
