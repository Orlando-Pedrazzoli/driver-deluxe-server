# Driver Deluxe Server

![LabelDriver](./hero2.png)

### Description:
Driver Deluxe Server is the backend part of the Driver Delux web application built with Node.js and Express.js.
This backend includes the Google Maps API for map usage and a News API (newsapi.org).


---


### Instalation:
1. Clone the repository
2. Install dependencies: npm install


---


## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
- `NEWS_API_KEY`: YOUR ACTUAL NEWS API KEY
- `VITE_GOOGLE_MAPS_API_KEY`: YOUR ACTUAL GOOGLE MAPS API KEY
  (You can get these keys by going to the Google Maps API and newsapi.org and create free keys to use here.)
3. Save the `.env` file.

---

## Usage

1. Start the server with `npm run dev` on your console.
2. The server will be running on our deployed backend, but you can change that in the `.env` file by adding `ORIGIN=http://localhost:5173` so it runs on this port instead of our deployed version.

---

## Endpoints

All endpoints have `/api` before them.

### AUTHORIZATION ENDPOINTS

#### POST /signup
- Sign up a new user.

#### POST /login
- Login a user.

#### GET /verify
- Only used to verify the user.

### SERVICES ENDPOINTS

#### POST /service
- Adds a new service to the backend.

#### GET /services
- Shows all of the services available on the API.

#### GET /services/:serviceType
- Returns the services of have a specific type.
- ex: `/services/norauto` -> will return all services with 'norauto' type.

#### GET /services/oneItem/:itemId
- Returns one single service by its ID.
- ex: `/services/oneItem/123456789` -> will return the service with the id: 123456789.

### BOOKING ENDPOINTS

#### GET /users/:userId/bookings
- Returns all of the bookings of one specific user that has its own Id.
- ex: `/users/12345/bookings` -> will return all bookings made by the user with the id: 12345.

#### POST /services/newbooking
- Adds a new service to the bookings on the backend, including the user id that created the booking.

#### DELETE /services/users/:userId/bookings/:bookingId
- Deletes a specific booking from a specific user.
- ex: `/services/users/1234/bookings/6789` -> will delete the booking with id: 6789 made by the user with id: 1234.

### NEWS ENDPOINT

#### GET /allnews
- Returns 100 articles about TVDE news going on all over the world.

### GOOGLE MAPS ENDPOINT

#### GET /allmaps
- Returns the Google map.

---

## Deployment

Deploy the backend to a hosting service like Render.

---

## Credits

- This project was created by:
- Orlando Pedrazzolli
- Guilherme Carvalho
