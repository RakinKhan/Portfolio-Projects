let bookings = getSavedBookings()

let filter = {
    searchText: '',
    sortBy: 'ByName'
}

let filterBookings = (bookings, filter) => {

    bookings = sortBookings(bookings, filter.sortBy)

    let matches = bookings.filter((booking) => {
        return booking.partyName.toLowerCase().includes(filter.searchText.toLowerCase())
    })
    document.querySelector('#filtered').innerHTML = ''

    let headings = headingsDOM()
    document.querySelector('#filtered').appendChild(headings)

    matches.forEach((match) => {
        let bookingsMatched = bookingListDOM(match)
        document.querySelector('#filtered').appendChild(bookingsMatched)
    })
}

let sortBookings = (bookings, sortBy) => {
    if (sortBy === 'byName') {
        return bookings.sort((a, b) => {
            if (a.partyName < b.partyName) {
                return -1
            } else if (a.partyName > b.partyName) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'bySize') {
        return bookings.sort((a, b) => {
            if (a.partySize > b.partySize) {
                return -1
            } else if (a.partySize < b.partySize) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byTime') {
        return bookings.sort((a, b) => {
            if (a.partyTime < b.partyTime) {
                return -1
            } else if (a.partyTime > b.partyTime) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byStatus') {
        return bookings.sort((a, b) => {
            if (a.partyStatus > b.partyStatus) {
                return -1
            } else if (a.partyStatus < b.partyStatus) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byServer') {
        return bookings.sort((a, b) => {
            if (a.partyServer < b.partyServer) {
                return -1
            } else if (a.partyServer > b.partyServer) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byDiet') {
        return bookings.sort((a, b) => {
            if (a.partyNotes > b.partyNotes) {
                return -1
            } else if (a.partyNotes < b.partyNotes) {
                return 1
            } else {
                return 0
            }
        })
    }
}

let fullList = (bookings) => {
    document.querySelector('#filtered').innerHTML = ''

    let headings = headingsDOM()
    document.querySelector('#filtered').appendChild(headings)

    bookings.forEach((booking) => {
        let reservation = bookingListDOM(booking)
        document.querySelector('#filtered').appendChild(reservation)
    })

}

let totalSeatsAvailable = (bookings) => {
    let totalSeats = 75

    bookings.forEach((booking) => {
        totalSeats = totalSeats - booking.partySize
    })

    let displayAvailability = document.createElement('p')
    displayAvailability.textContent = `You have ${totalSeats} seats left!`
    document.querySelector('#seats-left').appendChild(displayAvailability)
}

let addParty = (name, size, time, status, notes, server) => {
    let id = uuidv4()
    let party = {
        partyId: id,
        partyName: name,
        partySize: size,
        partyTime: time,
        partyStatus: status,
        partyNotes: notes,
        partyServer: server,
    }   
    return bookings.push(party) && localStorage.setItem('bookings', JSON.stringify(bookings))
}


document.querySelector('#seating-search').addEventListener('input', (e) => {
    filter.searchText = e.target.value
    filterBookings(bookings, filter)
})

document.querySelector('#party-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let name = e.target.elements.theName.value
    let size = e.target.elements.theSize.value
    let time = e.target.elements.theTime.value
    let status = e.target.elements.theStatus.value
    let notes = e.target.elements.theNotes.value
    let server = e.target.elements.theServer.value
    addParty(name, size, time, status, notes, server)
    fullList(bookings)
    totalSeatsDOM(bookings)
    e.target.elements.theName.value = '',
    e.target.elements.theSize.value = '',
    e.target.elements.theTime.value = '',
    e.target.elements.theStatus.value = '',
    e.target.elements.theNotes.value = '',
    e.target.elements.theServer.value = ''
})

document.querySelector('#ByFilter').addEventListener('change', (e) => {
    filter.sortBy = e.target.value
    filterBookings(bookings, filter)
})


//------
fullList(bookings)
totalSeatsAvailable(bookings)