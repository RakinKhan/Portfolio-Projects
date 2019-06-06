let getSavedBookings = () => {
    if (localStorage.getItem('bookings') !== null) {
        return JSON.parse(localStorage.getItem('bookings'))
    } else {
        return []
    }
}

let headingsDOM = () => {
    let headingROW = document.createElement('tr')
    headingROW.setAttribute('class', 'row-style')
    let nameHeading = document.createElement('th')
    nameHeading.setAttribute('width', '25%')
    let sizeHeading = document.createElement('th')
    sizeHeading.setAttribute('width', '11%')
    let timeHeading = document.createElement('th')
    let statusHeading = document.createElement('th')
    let notesHeading = document.createElement('th')
    notesHeading.setAttribute('width', '35%')
    let serverHeading = document.createElement('th')
    serverHeading.setAttribute('width', '15%')
    let removeHeading = document.createElement('th')

    nameHeading.textContent = 'Name'
    sizeHeading.textContent = 'Party Size'
    timeHeading.textContent = 'Time'
    statusHeading.textContent = 'VIP'
    notesHeading.textContent = 'Notes'
    serverHeading.textContent = 'Server'
    removeHeading.textContent = 'Edit'

    headingROW.appendChild(nameHeading)
    headingROW.appendChild(sizeHeading)
    headingROW.appendChild(timeHeading)
    headingROW.appendChild(statusHeading)
    headingROW.appendChild(notesHeading)
    headingROW.appendChild(serverHeading)
    headingROW.appendChild(removeHeading)

    return headingROW
}

let bookingListDOM = (booking) => {
    let tableROW = document.createElement('tr')
    tableROW.setAttribute('class', 'row-style')
    let nameBox = document.createElement('td')
    let sizeBox = document.createElement('td')
    let timeBox = document.createElement('td')
    let statusBox = document.createElement('td')
    let notesBox = document.createElement('td')
    let serverBox = document.createElement('td')
    let removeBox = document.createElement('td')

    let button = document.createElement('a')
    button.textContent = 'Edit'
    button.setAttribute('href', `\edit.html#${booking.partyId}`)

    nameBox.textContent = booking.partyName
    sizeBox.textContent = booking.partySize
    timeBox.textContent = booking.partyTime
    statusBox.textContent = booking.partyStatus
    notesBox.textContent = booking.partyNotes
    serverBox.textContent = booking.partyServer
    removeBox.appendChild(button)

    tableROW.appendChild(nameBox)
    tableROW.appendChild(sizeBox)
    tableROW.appendChild(timeBox)
    tableROW.appendChild(statusBox)
    tableROW.appendChild(notesBox)
    tableROW.appendChild(serverBox)
    tableROW.appendChild(removeBox)

    return tableROW
}

let totalSeatsDOM = (bookings) => {
    document.querySelector('#seats-left').innerHTML = ''

    let totalSeats = 75

    bookings.forEach((booking) => {
        totalSeats = totalSeats - booking.partySize
    })

    let displayAvailability = document.createElement('p')

    if (totalSeats <= 0) {
        displayAvailability.textContent = `Sorry, you are over-capacity!`
    } else {
        displayAvailability.textContent = `You have ${totalSeats} seats left`
    }

    document.querySelector('#seats-left').appendChild(displayAvailability)
}

let saveNewParty = (bookings) => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
}

let removeBooking = (id) => {
    let findBookingIndex = bookings.findIndex((booking) => {
        return booking.partyId === id
    })

    if (findBookingIndex > -1) {
        bookings.splice(findBookingIndex, 1)
    }
}