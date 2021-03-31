console.log('client side java script os loaded!')


//const inputBox = document.querySelector('#inputBox')

const fetchAddress = (address) => fetch(`/weather?address=${address}`).then((response) => {
    if (response.ok) {
        return response.json()
    } else {
        throw new Error('Couldnt load')
    }
}).then(response => {
    if (response.err) {
        document.querySelector('#forecast').innerHTML = response.err
        document.querySelector('#address').innerHTML = ''
        document.querySelector('#location').innerHTML = ''
    } else {
        document.querySelector('#forecast').innerHTML = response.forecast
        document.querySelector('#address').innerHTML = response.address
        document.querySelector('#location').innerHTML = response.location
    }

})

/*document.querySelector('.getWeather').addEventListener('click', e => {
    fetchAddress(inputBox.value)
})
 */

/* const fetchAddress = (address) => fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    if (response.ok) {
        console.log('ok')
    } else {
        console.log('nope')
    }
}) */

const sendForm = document.querySelector('#inputdiv')
sendForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchAddress(document.querySelector('#inputBox').value)
})