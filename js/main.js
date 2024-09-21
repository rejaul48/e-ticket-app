

// seat booking info
const seat_booking_info = document.getElementById('seatBookingInfo');
// add seat 
const addSeat = document.getElementById('addSeat');
// Available seat
const availableSeat = document.getElementById('availableSeat');
// no seat booking text selected
const noSeatBooking = document.getElementById('notSeatBookingText');
// total price tag selected
const totalPrice = document.getElementById('TotalPrice');
// select coupon apply fieds
const couponField = document.getElementById('couponApply');
const couponBtn = document.getElementById('couponBtn');
const couponDiscount = document.getElementById('couponDiscount');
// Grand total price selected
const GrandTotalPrice = document.getElementById('GrandTotalPrice');

// some data from user using form input and button selected
const userName = document.getElementById('userName');
const userNumber = document.getElementById('userNumber');
const userEmail = document.getElementById('userEmail');
const formSubmitBtn = document.getElementById('formSubmitBtn');

// when clicked this array store all event.innerText;

const cickedStore = [];

// total price 
let totalPriceAmount = 0;

function clickSeat(event) {
    const clickedValue = event.innerText;
    if (cickedStore.includes(clickedValue)) {
        alert("This seat is not available");
        return;
    } else if (cickedStore.length < 4) {
        // selected seat finder color
        event.classList.add('bg-primary');
        event.classList.add('text-white');

        cickedStore.push(event.innerText);

        // increase booking seat
        addSeat.innerText = cickedStore.length;
        // decrease available seat
        const availableSeatNum = parseInt(availableSeat.innerText);
        const availableSeatNow = availableSeatNum - 1;
        availableSeat.innerText = availableSeatNow;


        // seat booking and add into right side
        // no seat booking hide 
        noSeatBooking.style.display = 'none';
        seat_booking_info.innerHTML += `
        <ul class="flex justify-between items-center text-gray-400 mt-3">                      
             <li><span>${event.innerText}</span></li>
             <li><span>Economy</span></li>
            <li><span>550</span></li> 
         </ul>
        `

        //  update total price
        totalPriceAmount += 550;
        totalPrice.innerText = totalPriceAmount.toFixed(2);

        // update Grand Total Price
        GrandTotalPrice.innerText = totalPriceAmount.toFixed(2)

        // remove user form attribute
        if (cickedStore.length > 0) {
            userName.removeAttribute('disabled');
            userNumber.removeAttribute('disabled');
            userEmail.removeAttribute('disabled');

        }



        // Enable Coupon insert field
        if (cickedStore.length > 3) {
            couponField.removeAttribute('disabled');
            couponBtn.removeAttribute('disabled');
            couponBtn.classList.remove('bg-primaryLight');
            couponBtn.classList.add('bg-primary');



        }

    } else {
        alert("You reached maximum no of seats");
        return;
    }




}


// coupon apply

couponBtn.addEventListener('click', () => {


    const couponValue = couponField.value;


    if (couponValue === 'NEW15') {

        const couponDiscountValue = totalPriceAmount * .15;

        couponField.classList.add('hidden');
        couponBtn.classList.add('hidden');

        couponDiscount.innerHTML = `
        <div class="text-lg font-semibold flex justify-between items-center">
                           <h2>Total Discount</h2>
                           <h2>- BDT <span class="ml-1">${couponDiscountValue}</span></h2>
                       </div>
   `;

        //    update Grand total price amount

        const GrandPriceNum = parseInt(GrandTotalPrice.innerText);
        const reduceWithDiscount = GrandPriceNum - couponDiscountValue;
        GrandTotalPrice.innerText = reduceWithDiscount;



    } else if (couponValue === 'Couple 20') {
        const couponDiscountValue = totalPriceAmount * .20;

        couponField.classList.add('hidden');
        couponBtn.classList.add('hidden');

        couponDiscount.innerHTML = `
        <div class="text-lg font-semibold flex justify-between items-center">
                           <h2>Total Discount</h2>
                           <h2>- BDT <span class="ml-1">${couponDiscountValue}</span></h2>
                       </div>
   `;

        //    update Grand total price amount

        const GrandPriceNum = parseInt(GrandTotalPrice.innerText);
        const reduceWithDiscount = GrandPriceNum - couponDiscountValue;
        GrandTotalPrice.innerText = reduceWithDiscount;


    }

    else {
        alert('coupon not match')
    }

})


// user input number validation
userNumber.addEventListener('input', (e) => {

    const numebr = e.target.value;

    if (numebr.length === 11) {
        formSubmitBtn.removeAttribute('disabled');
    } else if (numebr.length === 12) {
        formSubmitBtn.setAttribute('disabled', true);
        alert('number must be 11 digits');
        return;
    } else {
        formSubmitBtn.setAttribute('disabled', true);
    }

})


// reload page when form submitted
document.getElementById('continueBtn').addEventListener('click', ()=>{
    window.location.reload();
})
