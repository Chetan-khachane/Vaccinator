// fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${date}`) Fetch call
///Below we targeted the elements that we are gonna work in this script.
const submit = document.querySelector('.subBtn')
const inputs = document.querySelectorAll('.panel_inputs')
const info = document.querySelector('.info')

//A global object that keeps track on given information by user in inputs 

const inputValues = {
    date: null,
    pincode: 401501,
    initial: null,
    createDate: function () {
        const date = new Date()
        this.date = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    }
}

//when user clicks on submit button then fetch all values from all  inputs given from them
//below event handler does all fetching of values given by user
submit.addEventListener('click', () => {

    let i = 0
    for (let prop in inputValues) {
        if (i !== 3 && i !== 0)
            inputValues[prop] = inputs[i].value
        i++;
    }
    console.log(inputValues)
    checkAvailabilityForDay();
})

inputValues.createDate()


//for checking for only a one day availability of vaccines 

const checkAvailabilityForDay = async () => {
    let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${inputValues.pincode}&date=${inputValues.date}`)
    response = await response.json()
    displayResponse(response)
}
//Bellow function will display the response that we have fetched from API

const displayResponse = ({
    sessions
}) => {
    //below array is used for filtering out the keys and properties that are required
    const allowed = [
        'address',
        'available_capacity',
        'available_capacity_dose1',
        'available_capacity_dose2',
        'center_id',
        'date',
        'district_name',
        'fee',
        'fee_type',
        'min_age_limit',
        'name',
        'pincode',
        'vaccine',
        'from',
        'to',
        'state_name',
        'slots'
    ]
    //Below  we do all work of filtering objects as well as displaying it
    //Below we filter all keys that are defined allowed list from sessions array
    sessions.forEach(data => {
        const filteredkeys = Object.keys(data).filter(key => allowed.includes(key))
        //for each data , below we create an li and append it to ul
        const li = document.createElement('li')
        li.className = 'card'
        //Below pairing all filteredkeys with thier respective value in sessions
        const filterKeyValues = filteredkeys.map(key => `${key}: ${data[key]}`)
        filterKeyValues.forEach(prop => {
            const p = document.createElement('p')
            p.innerText = prop
            li.appendChild(p)
        })


        info.appendChild(li)
    })
    console.log('Done changes according to control panel feed')
}

checkAvailabilityForDay()