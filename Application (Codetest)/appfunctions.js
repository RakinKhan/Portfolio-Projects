//this function controls how the API data is to be displayed on the html page. The function also adds classes and event listeners to specific elements so that those elements
//can be styled on the html page or be used to manipulate the list through the html page
let entryDOM = (entry) => {
    let listItem = document.createElement('li')
    listItem.setAttribute('class', 'filter')
    let individualItem = document.createElement('ul')
    individualItem.setAttribute('class', 'indiv-item')
    let itemDiv = document.createElement('div')
    itemDiv.setAttribute('class', 'item-div')
    let name = document.createElement('li')
    name.setAttribute('class', 'name-style')
    let button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.setAttribute('class', 'collapsible')
    button.addEventListener('click', (e) => {
        let list = document.querySelectorAll('.content')
        let index = data.findIndex((item) => {
            return item === entry
        })
        if (list[index].style.display === 'block') {
            list[index].style.display = 'none'
            button.textContent = '+'
        } else {
            list[index].style.display = 'block'
            button.textContent = '-'
        }
    })
    let email = document.createElement('li')    
    let company = document.createElement('li')
    let skill = document.createElement('li')
    let grade = document.createElement('li')
    let image = document.createElement('img')
    image.setAttribute('src', entry.pic)
    image.setAttribute('alt', 'profile_pic')
    image.setAttribute('class', 'profile-pic')
    let testList = document.createElement('li')
    testList.setAttribute('class', 'content')
    let tags = document.createElement('p')
    tags.setAttribute('style', 'margin-top: 10px')
    let tag = []
    let tagInput = document.createElement('input')
    tagInput.setAttribute('type', 'text')
    tagInput.setAttribute('placeholder', 'Add a tag')
    tagInput.setAttribute('class', 'tag-input')
    tagInput.addEventListener('keypress', (e) => {
        if (e.keyCode ===  13) {
            let tagText = ''
            tag.push(e.target.value)

            tag.forEach((tag) => {
                tagText = tagText + ' ' + `<div class='indiv-tag'>${tag}</div>`
            })

            tags.innerHTML = tagText
            e.target.value = ''
        }
    })
    let gradesArrayString = entry.grades
    let gradesArrayInt = gradesArrayString.map((number) => parseInt(number))
    let totalGrade = 0
    let totalTests = 0
    let text = ``
    let i = 0
    gradesArrayInt.forEach((grade) => {
        totalGrade = totalGrade + grade
        totalTests = totalTests + 1
        i = i + 1

        text = text + `Test${i}: ${grade}%` + "<br>";
    })

    let average = totalGrade / totalTests
    
    button.textContent = '+'
    email.textContent = `Email: ${entry.email}`
    name.textContent = `${entry.firstName} ${entry.lastName}`
    company.textContent = `Company: ${entry.company}`
    skill.textContent = `Skill: ${entry.skill}`
    grade.textContent = `Average: ${average}%`
    testList.innerHTML = text

    itemDiv.appendChild(image)
    itemDiv.appendChild(button)
    itemDiv.appendChild(name)
    itemDiv.appendChild(email)
    itemDiv.appendChild(company)
    itemDiv.appendChild(skill)
    itemDiv.appendChild(grade)
    testList.appendChild(tags)
    testList.appendChild(tagInput)
    itemDiv.appendChild(testList)

    individualItem.appendChild(itemDiv)
    listItem.appendChild(individualItem)
    return listItem
}

