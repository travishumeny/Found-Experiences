# Found Experiences

## Intro

This in-development, travel-related tool is built as a foundational piece for a boutique travel startup. Its intention is to collect interesting places in cities around the world so that customized itineraries can be created for clients. The front-end features querying of a prominent travel API.

## What We Used

| Built with:
| ------------|
| ES6 Javascript |
| React |
| Redux |
| Redux-Saga |
| Axios |
| Node.js |
| Express |
| Mongo.db |
| Mongoose |
| Moment.js |

## Using the App

The MVP of the app is fairly simple by design. Users may begin on the main page by searching for categories of places that they'd like to go to at their destinations (i.e., 'Pizza' in 'Chicago') using the two search boxes. From there, a set of results are returned that are grouped according to ranking. Selecting a venue by clicking on it will expand into that venue's details, including contact information, tips, and photos from the venue's guests. There are some directional buttons to aid with orientation while using the app as well.

In future iterations of the product, there are planned to be elements within the search screen and main page that would aid you in bookmarking places that you'd like to go to within your private database back-end. These bookmarks would contain not only the key information about the venue, but plenty of meta-data as well. Corresponding with that will ultimately be a React/ElasticSearch front-end for browsing the saved data and filtering the meta-data to narrow any searches performed further.

## Our Design Process

The third party start-up that I worked with for this app wanted a tool that would help them leverage content about interesting places. We had initial meetings where we outlined the goals we wanted to achieve, and the means we thought about using in order to actualize them. The founders of the start-up were looking towards simplifying and refining their process of venue exploration, which typically took them a long time. We looked to have a single point of reference for the venues as our end result, and discerned together that the basis of the single reference would need to be from a crowd-sourced/reliable data end-point, like Yelp, Foursquare, or Google Places. From there, we could add in editorial/review content from blog sites that matched the location we had chosen to get more details on.

What we looked to do was harness a series of very precise Google searches on each of the editorial content sites we were looking to pull data from (i.e., Thrillist, Refinery29, various travel blogs), and be able to coordinate top results returned in a short amount of time alongside our reliable-reference data points from the aforementioned travel APIs. We found that this process would likely take more capital than we realized, as the Google Search API only provided for so many free searches.

In the interests of time, the MVP turned more towards a front-end product that was easy-to-use, and could serve as the basis for continued iteration. With clean design in mind, and aesthetic inspiration coming from sites like AirBnB, I moved ahead in the process, coming up with a sound basis for component-driven architecture within React. Each element would be abstracted as much as possible, and with its own styling; higher-order functions like 'map' were used to spread the data across as many instances of component as were necessary to display the amount of data we wanted.

## Our Challenges

We found that there was a lot to ideate about, and given enough time and resources, I think it would have been possible to construct the full potential of this web-app. 

There are some complex technical concerns (and Terms-of-Service gray-areas) in fusing together responses from different travel data API endpoints, and we considered combining the venue elements in several ways: on fuzzy-match geocoordinate data, complex conditional statements that would evaluate the presence of most of the same data across several fields, or attempting a loose match on key elements like addressing. However, given more time for testing, I am confident a solution could be constructed (likely using fuzzy-match geocoordinate data) that would work and could continue to be optimized over time. There is also the ethicality of combining various different data sources - which, at the outset, seemed like a logistical concern, more than a foundational one - but as we proceeded it was clear that this tool would need to be relegated to in-house research, if even that, as it might incur Terms of Service violations and be an unstable data source for that reason. We decided that we would start with one API endpoint and move forwards from there into evaluating these concerns.

As always, in the interests of time, there is plenty that doesn't get done within the first sprint. There are plenty of future challenges I might go on to encounter: specifically, how to store, optimize, and make-ready a collected data-set to be used ElasticSearch in an effective way; perhaps also, en-masse storage of venues from the main search screen, and the necessary 50+ sequential API calls that would need to happen to pull all of the meta-data about each venue from multiple API endpoints; finally, the preferred method of execution for this series of API calls (which I determined to be asynchronous promises and began to implement.) Alongside that, there was a React/Redux learning curve that continued to be a part of the process; ultimately, the work I did on this app ended up helping me to understand Redux much more fully.

## Future Goals

This app's code-base is meant to go on to be utilized by a team of developers that the third-party start-up will contract. With that being said, the goals that I have in mind for future development include:

* Framework and styling of app for usability (complete)
* Categorical search data from a prominent travel API being returned (complete)
* Specific venue meta-data from a prominent travel API being returned (complete)
* API end-points on the back-end for storage and retrieval (in-progress)
* Mongoose model for storage of incoming travel places (in-progres)
* Multiple API endpoints being called using promises (in-progress)
* Results from multiple endpoints being combined (in-progress)
* ElasticSearch retrieval from MongoDB using Appbase.io's ABC tool (pending)
* Optimization and ElasticSearch tuning for full-text indexing on venue tips (pending)
* Google Search API integration returning the first few sources of editorial source content per publication (stretch)
* Ranking and weighting of editorial source content to be preferential (stretch)
* Further fine-tuning and manual-entry data using modal windows on ElasticSearch front-end (stretch)

## Authors

* **Daniel Dyer** - [danielbdyer](https://github.com/danielbdyer)
