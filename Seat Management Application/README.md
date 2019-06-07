# Seat Management Application

For my FIRST project I created an application that will allow a restaurant to manage their reservations by adding new reservations or to edit current ones. The application also keeps track of how many seats are available after a new reservation is made or changed.

## Adding Reservation

Users can add a reservation through the index.html page. When there are no reservations the page will show empty table with just the table headings and below it you will see the comment 'You have <enter number here> seats left!'. Below the comment there is a form where you fill in your reservation. Your form should look something like this.
  
  ```
  Guest Name
  Size of party reservation (up to 10)
  Time of reservation
  VIP Status (click yes or no)
  Any dietary restrictions that needs to be known
  The name of the server that will be waiting on the guest
  ```
  
  Once completed, press submit.
  
  ### What Javascript Does After
  
  Once submitted, JavaScript takes all the values given by the user and creates and object for them with its own unique id. The object is then pushed to an array and saved to local storage. The table is re-rendered using the array and for each item in the array, the script will create a table row for it and the values will be under the correct table header. Also at the end of the row an edit link will be added.
  
After that is completed, Javascript will re-render the new total number of seats avaiable. As more rows/reservations are made, the original number of seats available will be subtracted by the number of total party size of all the reservations combined. For example, if there is two rows/reservations with a total of 9 guests, 9 will be subtracted from the original number of seats available (in my script i have the original number at 75).

## Editing A Reservation

To edit a reservations, click the Edit link in the corresponding row. The link will take you to edit page where you will see the same form as the index page but this time the original information of the reservervation will be on it (done using the reservations object id value). The user can then change the original values and press submit. If the submit button is not pressed then the reservation information will not be changed. The user may press the Delete Resrvation button below the form to remove the reservation completely. 

If either button is pressed, the user will then be sent back to the index page.

### What Javascript Does After

If reservation is edited then the reservations object will be updated with the new values (while keeping the same id) and array that the object is saved on will be restored on local storage.

If the reservation is to be deleted then the reservations object will be search for on the array (using its id) and removed from the array. Once removed the array will be resaved to local storage.

Once either is done the table on the index page will reflect the changes either by showing the changed values for the reservation or removing the row that shows the reservation, and updating the new number of seats available if there was any changes to the party size. 

## Filtering/Sorting The Table

You can filter the table by the reservation name by typing in the filter bar near the top right of the table. Also you can sort the table using the options menu right next to the filter bar. 

### What JavaScript Does After

As you type in the filter bar JavaScript will take the value that is typed in and tries to match it with an object (or objects) in the array whos reservation name includes what is typed in. If what is typed in the filter bar not included in the reservation name, then the reservations object will not be included in the filtered array. Once the array has been filtered, the new array will then be re-rendered onto the index page. 

When an option in the menu is selected the list will then be sorted based on the searches criteria. The script lets you sort through the table by name, reservation time, the party size, their VIP status, their notes, or the person who is to serve them.  
