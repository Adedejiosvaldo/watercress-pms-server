Watercress Project Management System

Routes:
i. Root Route => ('/')
ii. UserRoute => ('/users')
iii. RoomRoute => ('/rooms')
iv. BookedRooms => ('/bookedRooms')
v. Restaurants => ('/restaurants')

Schema[x]

1. Users => {
   firstName,lastName, password, email, role,}

2. roomSchema => {
   roomNumber, utilities , price, }

3. bookedRooms => {
   status,checkIn, checkOut,number of booking days }

4. Restaurant => {
   price,Quantity Ordered, OrderedItem }
