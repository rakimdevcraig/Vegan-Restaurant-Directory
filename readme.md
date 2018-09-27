
Plant Based Plates
This project is a search directory for vegan restaurants in boston. I have provided a map that shows the users current location and shows restaurants so they
can identify restaurants close to them. I have also provided a list of all the restaurants and the option for the user to find restaurants within a 1-5 mile
radius. I've also provided a bit of info about each restaurant along with a link to the their menu.


Link to project:https://damp-bastion-50593.herokuapp.com/
Video Breakdown:https://soapbox.wistia.com/videos/PgGY0bghAs

How It's Made: Tech used: HTML, CSS, Javascript, Node, Express, Mongo, Embedded Javascript

I started off by adding all of the restaurants and info such as menu, hours etc to a database, from there I worked on getting my search feature to work where you could search for restaurants by name
after that I made sure I could inject my all of my data from the my database about each restaurant into my ejs views. Once I could get serverside information to be injected into my views I added the ability to search for restaurants by name. After getting to search by name I wanted users to search for restaurants within a 1-5 mile radius. Eventually I got both working but I didn't want two seperate routes for my search queries so I worked on aggregating my name and location query. Once I got the search to work I started working on my google map where I added a point for each restaurant based on it's gps coordinates and once I got that to work I got the map to also point out the user's current location.

Optimizations: I need to get the geospatial queries to work globally right now I have it working for a hardcoded point but I want my users wherever they are to be able to use that feature.

Lessons Learned:I learned how to make Geospatial searches from MongoDB  and to inject the information from my database to my Embedded Javascript file. In addition to that I Learned
how to make indexes on my database and I learned why MongoDB is more productive than SQL when it comes to making Geospatial queries. I also learned how to find a users
current position with geolocation, input that onto a map along with the ability to make a point on a map from anywhere in the world.
