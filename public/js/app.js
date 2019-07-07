const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('#weather');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target)
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${locationInput.value}`).then((response) => {
        response.json().then(({
            error,
            location,
            forecast
        }) => {
            if (error) {
                locationInput.value = '';
                return messageOne.textContent = error;
            }
            messageOne.textContent = location;
            messageTwo.textContent = forecast;
            locationInput.value = '';
        })
    })
})