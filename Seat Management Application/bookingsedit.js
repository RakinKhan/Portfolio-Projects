let bookings = getSavedBookings()
let bookingId = location.hash.substring(1)

let bookingMatch = bookings.find((booking) => {
    return booking.partyId === bookingId
})

document.querySelector('#change-name').value = bookingMatch.partyName
document.querySelector('#change-size').value = bookingMatch.partySize
document.querySelector('#change-time').value = bookingMatch.partyTime
document.querySelector('#change-status').value = bookingMatch.partyStatus
document.querySelector('#change-note').value = bookingMatch.partyNotes
document.querySelector('#change-server').value = bookingMatch.partyServer


document.querySelector('#change-form').addEventListener('submit', (e) => {
    e.preventDefault()
    bookingMatch.partyName = e.target.elements.newName.value
    bookingMatch.partySize = e.target.elements.newSize.value
    bookingMatch.partyTime = e.target.elements.newTime.value
    bookingMatch.partyStatus = e.target.elements.newStatus.value
    bookingMatch.partyNotes = e.target.elements.newNote.value
    bookingMatch.partyServer = e.target.elements.newServer.value
    saveNewParty(bookings)
    location.assign('\index.html')
})

document.querySelector('#remove-reservation').addEventListener('click', (e) => {
    removeBooking(bookingMatch.partyId)
    saveNewParty(bookings)
    location.assign('\index.html')
})