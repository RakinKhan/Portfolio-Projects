# Application Information
This is an application that I made for a coding test. Information that was provided to me that was to be used to make the application such as the API data has been removed removed however i will be providing an edited picture of how the application is supposed to look on the in the html page. Below is a brief description of the of the main 
components of the application.

## Filter Bars
At the top of the application there are two filter bars. The first bar allows you to filter the list of people by their name. The second bar allows you filter the list of people using the tags that the app user puts on them. As the user is typing in either of the filter bars the list of people displayed will become smaller if their names or tags include what is typed in their respective filter bars.

## List of People
For each person the application initially displays the persons profile picture, name, email, what company they work for, their skill, and their test average. Each person is divided by a line (created by the application) to help distinguish which information belongs to what person. The list is scrollable, with a maximum height of 500px, and can reduce the list height to look smaller on the html page if the list is narrowed down to one or two people. Beside each persons name there is a button that looks like a '+' sign (created by the application). For more information on the button, see below.

## Button Next to Name
When the button next to the persons name has been clicked, the button displays two things below the current information displayed: 
1. The individual testing numbers that name up the testing average.
2. The tags that each person has and an input bar for the app user to add new tags for the person. 
The button also turns from '+' to '-' when the new information is displayed. Clicking the button again will hide the individual test numbers and tag information/bar, and also change the '-' sign back to '+'

### Tag Input
When the application is first started there will no default tags. New tags for the person will not be added until the user presses 'enter'. Once 'enter' has been pressed, what ever is written in the input field will be displayed on above the tag input bar and given a class name. The class name is used to style the tag and also filter the list of people if needed