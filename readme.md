## Welcome to ListeLot!

---

View the deployed app:  
[ListeLot](https://listelot.netlify.com/)  

---

### General:

ListeLot is a realtime list app, the objective was to have a list update as you change things. This way as you mark items off on a list, other people will see those changes as they happen. Because the items update in realtime, you are able to ensure that no duplicate items are collected.  

Users should be able to log in and view lists that they have created previously. If you view the same list from two devices they should stay up to date with the changes that one device makes.

---

### Server:

(Hosted on Heroku)

I built this app with an Express.js backend, using postgress to store user data and list information. At this point Users lists are private, but the way things are set up leaves the option to easily add in additional functionality, such as adding collaborators so multiple different Users can view the same lists.

---

### Authorization:

I am using JSON web tokens for authentication I create and read them in the backend API and then attach them to the Authorization headers after logging-in/signing-up for all requests made thereafter. I then remove those tokens upon logout.

On the backend I take in the incomming requests and then verify if there is a token that matches our encoding, I then find a user with that email to verify if they are in the system. 

The only information passed to the frontend that involves the user is the user.email. That way people are unable to pull user information from the database based on the primary key(simple integer). Just like the headers I place the token in localStorage upon successful login/signup and strip it from localStorage when logging out.

---

### FrontEnd:

(Hosted on Netlify)

I am using React for the frontend framework, allowing minimal refresh, seperation of concerns based on components, and authentication via higher order components. I have chosen to use hooks as my form of state management. Storing all list data in state rather than localStorage to limit the memory impact of the app for the user. Because of the requirement of keeping the list updated with most recent changes we will be making requests locally and can easily update local state with those changes.

I have optomized this for mobile devices as I believe the most frequent use of a list on an electronic device when out and about would be a cellphone. Because of this, the desktop view doesn't appear as well proportioned as when viewed on a mobile device. 

This is also set up to function as a single page application, minimal changes between views and a unified theme give the app the appearence of a standard application.

---

### Trade-offs:

If given more time I would like to dive into css breakpoints and make a view that would be more optimal for computer use.

Styling was not the highest priority when completing this project, so I would also take more time to make some of the interactions with various buttons/actions be more reactive to user input.

ie:  
change button color when hovered/clicked.  
have the deletedList/newList slide out-of/into the list.  

These small details can make the app more enjoyable to use, but are not essential to the functioning of the app.

I currently have not taken time to sanitize the inputs as they are coming in. I would like to add checks on the backend to survey incoming data and ensure that no malicious activity makes it's way through.

Additionally I would like to create more restrictions on password input.

I am aware of some event/subscription services that will create a live stream of data from a server and client side app. I decided to go with a very minimal approach using a setInterval call inside of a useEffect hook in order to continually recieve the most updated list from the server. For this project at this stage that is pleanty, given more time I would like to look into something like socket.io and see how that could make the live-stream data even better.

given more time I would like to look into making this a progressive web app, localStorage is one option for storage, but depending on size I could potentially look into something like indexDB to manage local data and provide offline functionality.

I haven't included any images but similar to adding animations, images can really liven up an app and I like to add in some fun images for loading screens or screens that are devoid of information.

Currently there are some instances of repeditive code, for instance in the backend ListItemsController.js I authenticate many of the routes the same way. Given more time I would like to abstract this process. I believe there is a way to have all requests comming through the server to pass through something. I would like to set that up for authenticated routes.

Similarly in the frontend I have routes set up that I use in different components that change depending on environment, I would like to abstract this into it's own file to pull from.

I currently have cors set up to be very open. I would also like to make this more locked down, restricting access to only requesters.

Given more time I would also create more scripts to streamline the development/deploy process

## Thank you for taking the time to look at my project, enjoy!
