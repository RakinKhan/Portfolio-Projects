//This function returns the aveage of two colors
let hexAvgFunction = (colour1, colour2) => {
    if (!(colour1.charAt(0) === '#') || !(colour2.charAt(0) === '#')) {
        return "Error"
    } 

    let one = {
        red: parseInt(colour1.slice(1, 3), 16),
        green: parseInt(colour1.slice(3, 5), 16),
        blue: parseInt(colour1.slice(5, 7), 16)
    }
    let two = {
        red: parseInt(colour2.slice(1, 3), 16),
        green: parseInt(colour2.slice(3, 5), 16),
        blue: parseInt(colour2.slice(5, 7), 16)
    }

    let three = {
        red: Math.round((one.red + two.red )/ 2).toString(16).toUpperCase().padStart(2, '0'),
        green: Math.round((one.green + two.green )/ 2).toString(16).toUpperCase().padStart(2, '0'),
        blue: Math.round((one.blue + two.blue )/ 2).toString(16).toUpperCase().padStart(2, '0')
    }
    
    return `#${three.red}${three.green}${three.blue}`

}


console.log(hexAvgFunction("#991AE6", "#FF0000"))