//uses an API to get the data necessary for the funtion to work
let fetchedData = () => {
    let requests = new XMLHttpRequest() 
    requests.open('GET', '', false)
    requests.send()  

    if (requests.readyState === 4 && requests.status === 200) {
        let data = JSON.parse(requests.responseText)
        return data.students
    } else if (requests.readyState === 4) {
        return console.log('Error')
    }
}
