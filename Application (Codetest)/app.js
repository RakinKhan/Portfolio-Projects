//returns API data which is in array form
let data = fetchedData()

//this is used to store the values the user writes in the "Search by name" and 'Search by tag" input bars on the html page. 
let filter = {
    searchName: '',
    searchTag: ''
}

//displays the API data on the index.html page as a list.
let fullList = (data) => {
    document.querySelector('#filtered').innerHTML = ''
    
    data.forEach((entry) => {
        let entryPoint = entryDOM(entry)
        document.querySelector('#filtered').appendChild(entryPoint)
    })
}
//this is used to filter the data from the API if a user is searching through the list of people by their name and then rerender the list on the index.html page
let filterList = (data, filter) => {

    let matches = data.filter((filtermatch) => {
        let var1 = filtermatch.firstName.toLowerCase().includes(filter.searchName.toLowerCase()) || filtermatch.lastName.toLowerCase().includes(filter.searchName.toLowerCase())
            return var1 
    })

    document.querySelector('#filtered').innerHTML = ''
    
    matches.forEach((match) => {
        let matched = entryDOM(match)
        document.querySelector('#filtered').appendChild(matched)
    })
}
//event listener for the input that searches through the list of people by their names.
document.querySelector('#filter-name').addEventListener('input', (e) => {
    filter.searchName = e.target.value
    filterList(data, filter)
})

//event listener for the input that searchins through the list of people by the tags that the user puts on them. the people with the matching tags will be displayed on the
//html page while the non-matches will be hidden.
document.querySelector('#filter-tag').addEventListener('input', (e) => {
    let filter = e.target.value
    let list = document.getElementsByClassName('filter')
    let p = document.getElementsByTagName('p')

    for (let i = 0; i < p.length; i++) {
        let tag = p[i]

        if (tag.innerText.toLowerCase().includes(filter.toLowerCase())) {
            list[i].style.display = ''
        } else {
            list[i].style.display = 'none'
        }
    }
})


fullList(data)

