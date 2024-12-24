const main = document.querySelector(".main")

let array;

fetch("json/data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (desserts) {
    let out = "";
    array = desserts;
    console.log(array)
    for (let dessert of desserts) {
        out += `
        <div class="card">

                <!-- CARD IMAGE -->
                
                <div class="img-container">
                    <img src="${dessert.image.desktop}" alt="Dessert Image" class="dessert-img">
                </div>

                <!-- ADD TO CARD BUTTON -->

                <button class="add-to-cart-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                        <g fill="#C73B0F" clip-path="url(#a)">
                            <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M.333 0h20v20h-20z"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="add-to-cart-span">Add to Cart</span>
                </button>

                <!-- ADD AMMOUNT BUTTON -->

                <div class="add-ammount hidden">
                    <button class="decrement-btn">
                        <span class="minus-sign">-</span>
                    </button>
                    <p class="ammount">1</p>
                    <button class="increment-btn">
                        <span class="plus-sign">+</span>
                    </button>
                </div>

                <!-- CARD DETAILS -->

                <div class="card-details">
                    <h4 class="card-short-name">${dessert.category}</h4>
                    <h3 class="card-long-name">${dessert.name}</h3>
                    <p class="card-price">$<span class="price-span">${Number(dessert.price).toFixed(2)}</span></p>
                </div>
            </div>
        `;
    }
    main.innerHTML = out;
    mainScript();
    });
function mainScript() {
    const body = document.body;
    const confirmOrderButton = document.querySelector(".confirm-order-btn")
    const shadow = document.querySelector(".shadow")
    const orderConfirmed = document.querySelector(".order-confirmed")

    const startNewOrder = document.querySelector(".start-new-order-btn")

    const addToCartButton = document.querySelectorAll(".add-to-cart-btn")
    const addAmount = document.querySelectorAll(".add-ammount")
    const desertImage = document.querySelectorAll(".dessert-img")

    const emptyCart = document.querySelector(".empty-cart")
    const chosenItems = document.querySelector(".chosen-items")

    const decrementNumber = document.querySelectorAll(".decrement-btn")
    const ammount = document.querySelectorAll(".ammount")
    const incrementNumber = document.querySelectorAll(".increment-btn")

    const chosenItemsList = document.querySelector(".chosen-items-list")
    const cardLongName = document.querySelectorAll(".card-long-name")
    const priceSpan = document.querySelectorAll(".price-span")
    const itemCartAmmount = document.querySelectorAll(".item-ammount")
    const totalPriceSpan = document.querySelector(".total-price-span")

    const orderInfoItems = document.querySelector(".order-info-items")

    confirmOrderButton.addEventListener('click', () => {
        shadow.classList.remove("hidden");
        orderConfirmed.classList.remove("hidden");
        body.classList.add("overflow");
        body.classList.add("body-height");
    })
    startNewOrder.addEventListener('click', () => {
        shadow.classList.add("hidden");
        orderConfirmed.classList.add("hidden");
        body.classList.remove("overflow");
        body.classList.remove("body-height");
    })
    let itemName;
    let itemPrice;
    let itemAmmount;
    for(let i=0;i<addToCartButton.length;i++) {
        addToCartButton[i].addEventListener('click', () => {
            addToCartButton[i].classList.add("hidden");
            addAmount[i].classList.remove("hidden");
            desertImage[i].classList.add("selected");
            cartCheck();
            itemName = cardLongName[i].innerText;
            itemPrice = priceSpan[i].innerText;
            itemAmmount = ammount[i].innerText;
            cartItems();
        }) 
    }
    let check;
    cartCheck()
    function cartCheck() {
        let images = Array.from(desertImage);
        check = images.some((img) => img.classList.contains("selected")); 
        cartVisibility();
    }
    function cartVisibility() {
        if(check === false) {
            chosenItems.classList.add("hidden");
            emptyCart.classList.remove("hidden");
        } else if(check === true) {
            chosenItems.classList.remove("hidden");
            emptyCart.classList.add("hidden");
        }
    }
    let itemAmmountDecrement;
    for(let i=0;i<decrementNumber.length;i++) {
        decrementNumber[i].addEventListener('click', () => {
            let value = Number(ammount[i].innerText)
            let finalValue;
            finalValue = Number(value - 1);
            if(finalValue === 0) {
                addToCartButton[i].classList.remove("hidden");
                addAmount[i].classList.add("hidden");
                desertImage[i].classList.remove("selected");
                finalValue = 1;
                cartCheck();
                itemAmmountDecrement = 0;
                //decrementAmmount();
            }
            ammount[i].innerText = finalValue;
            cardName = cardLongName[i];
            itemPrice = priceSpan[i].innerText;
            itemAmmount = finalValue;
            decrementAmmount();
        })
    }
    let cardName;
    for(let i=0;i<incrementNumber.length;i++) {
        incrementNumber[i].addEventListener('click', () => {
            let value = Number(ammount[i].innerText)
            let finalValue;
            finalValue = Number(value + 1);
            ammount[i].innerText = finalValue;
            cardName = cardLongName[i];
            itemPrice = priceSpan[i].innerText;
            itemAmmount = finalValue;
            itemAmmountDecrement = itemAmmount;
            incrementAmmount();
        })
    }
    let totalCartItemPrice;
    let removeItemButton;
    function cartItems() {
        const chosenItemsList = document.querySelector(".chosen-items-list")

        chosenItemsList.innerHTML += `
            <div class="chosen-item">
                <div class="item-details">
                    <h4 class="item-name">${itemName}</h4>
                    <div class="item-numbers">
                        <p class="item-ammount">
                            <span class="item-ammount-span">${itemAmmount}</span>x
                        </p>
                        <p class="price-per-item">@ $<span class="price-per-item-span">${itemPrice}</span></p>
                        <p class="total-item-price">$ <span class="total-item-price-span">${Number(Number(itemAmmount)*Number(itemPrice)).toFixed(2)}</span></p>
                    </div>
                </div>
                <button class="remove-item-btn">
                    <div class="remove-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                        </svg>
                    </div>
                </button>
            </div>
        `;
        removeItemButton = document.querySelectorAll(".remove-item-btn")
        totalPrice();
        // IF NAME === NAME, +1 TO ORDER, ELSE IF NUMBER < 1, REMOVE
    }
    function totalPrice() {
        const cartTotalItemPrice = document.querySelectorAll(".total-item-price-span")
        const cartItemsNumber = document.querySelector(".cart-items-number")

        cartItemsNumber.innerText = cartTotalItemPrice.length;
        
        let fullPrcie = 0;
        for(let i=0;i<cartTotalItemPrice.length;i++) {
            let price = Number(cartTotalItemPrice[i].innerText);
            fullPrcie += price;
            totalPriceSpan.innerText = fullPrcie.toFixed(2);
        }
    }
    function incrementAmmount() {
        const itemCartName = document.querySelectorAll(".item-name");
        const itemAmmountSpan = document.querySelectorAll(".item-ammount-span")
        const totalItemPrice = document.querySelectorAll(".total-item-price-span")

        for(let i=0;i<itemCartName.length;i++) {
            if(itemCartName[i].innerText === cardName.innerText) {
                itemAmmountSpan[i].innerText = itemAmmount;
                totalCartItemPrice = Number(Number(itemAmmount)*Number(itemPrice)).toFixed(2);
                totalItemPrice[i].innerText = totalCartItemPrice;
                totalPrice();
            }
        }
    }
    function decrementAmmount() {
        const itemCartName = document.querySelectorAll(".item-name");
        const itemAmmountSpan = document.querySelectorAll(".item-ammount-span")
        const totalItemPrice = document.querySelectorAll(".total-item-price-span")
        const chosenItem = document.querySelectorAll(".chosen-item")
        const chosenItemsDiv = document.querySelector(".chosen-items-list")

        for(let i=0;i<itemCartName.length;i++) {
            if(itemCartName[i].innerText === cardName.innerText) {
                if(itemAmmountDecrement > 0) { 
                    itemAmmountSpan[i].innerText = itemAmmount;
                    totalCartItemPrice = Number(Number(itemAmmount)*Number(itemPrice)).toFixed(2);
                    totalItemPrice[i].innerText = totalCartItemPrice;
                    totalPrice();
                }
                if(itemAmmountDecrement < 1) {
                    chosenItemsDiv.removeChild(chosenItem[i]);
                    itemAmmountDecrement = itemAmmount;
                    removeItemButton = document.querySelectorAll(".remove-item-btn")
                    totalPrice();
                    checkAria();
                }
            } 
        }
    }
    let removeItem;
    let removeItemName;
    document.addEventListener('click', (event) => {
        if(event.target.closest('.remove-item-btn')) {
            removeItem = event.target.closest('.chosen-item');
            removeItemName = removeItem.querySelector(".item-name").innerText;
            const itemCartName = document.querySelectorAll(".item-name");
            const chosenItem = document.querySelectorAll(".chosen-item")
            const chosenItemsDiv = document.querySelector(".chosen-items-list")

            for(let i=0;i<itemCartName.length;i++) {
                if(itemCartName[i].innerText === removeItemName) {
                    chosenItemsDiv.removeChild(chosenItem[i]);
                    itemAmmountDecrement = itemAmmount;
                    for(let j=0;j<cardLongName.length;j++){
                        if(cardLongName[j].innerText === removeItemName) {
                            addToCartButton[j].classList.remove("hidden");
                            addAmount[j].classList.add("hidden");
                            desertImage[j].classList.remove("selected");
                            ammount[j].innerText = 1;
                            totalPrice();
                            let chosenItemNumber = document.querySelectorAll(".chosen-item");
                            if(chosenItemNumber.length < 1) {
                                cartCheck();
                                checkAria();
                            }
                        }
                    }
                } 
            }
        }
    })

    const navToggle = document.querySelectorAll('.add-to-cart-btn');
    
    for(let i=0;i<navToggle.length;i++) {
        navToggle[i].addEventListener("click", () => {
        checkAria();
    }
    )}
    function checkAria() {
        if(chosenItems.classList.contains("hidden")) {
            chosenItemsList.setAttribute("aria-expanded", false);
        } else {
            chosenItemsList.setAttribute("aria-expanded", true);
        }
    }

    confirmOrderButton.addEventListener('click', () => {
        const chosenItem = document.querySelectorAll(".chosen-item");
        const priceNumberSpan = document.querySelector(".price-number-span")
        priceNumberSpan.innerText = totalPriceSpan.innerText;
        for(let i=0;i<chosenItem.length;i++) {
            let name = chosenItem[i].querySelector(".item-name").innerText;
            let ammount = chosenItem[i].querySelector(".item-ammount").innerText;
            let price = chosenItem[i].querySelector(".price-per-item-span").innerText;
            let totalPrice = chosenItem[i].querySelector(".total-item-price-span").innerText;
            let img;
            for (let dessert of array) {
                if(name === dessert.name) {
                    img = dessert.image.thumbnail;
                }
            }
            orderInfoItems.innerHTML += `
                <div class="order-item">
                    <img src="${img}" alt="Order Thumbnail" class="order-img">
                    <div class="order-item-details">
                        <p class="order-item-name">${name}</p>
                        <div class="order-item-price-details">
                            <p class="order-item-p"><span class="order-ammount-span">${ammount}</span></p>
                            <p class="order-item-price">@ $<span class="order-item-price-span">${price}</span></p>
                        </div>
                    </div>
                    <p class="order-item-total-price">$<span class="order-item-total-price-span">${totalPrice}</span></p>
                </div>
            `;
        }
    })
    startNewOrder.addEventListener('click', () => {
        orderInfoItems.innerHTML = '';
        chosenItemsList.innerHTML = '';
        for(let i=0;i<desertImage.length;i++) {
            addToCartButton[i].classList.remove("hidden");
            addAmount[i].classList.add("hidden");
            desertImage[i].classList.remove("selected");
            ammount[i].innerText = 1;
        }
        let cartItemsNumber = document.querySelector(".cart-items-number");
        cartItemsNumber.innerText = 0;
        cartCheck();
    })
    function imageChangeOnResize() {
        if (window.matchMedia("(max-width: 600px)").matches) {
            for(let i=0;i<desertImage.length;i++) {
                desertImage[i].src = `${array[i].image.mobile}`;
            }
        }
        if (window.matchMedia("(min-width: 600px)").matches) {
            for(let i=0;i<desertImage.length;i++) {
                desertImage[i].src = `${array[i].image.tablet}`;
            }
        }
        if (window.matchMedia("(min-width: 1100px)").matches) {
            for(let i=0;i<desertImage.length;i++) {
                desertImage[i].src = `${array[i].image.desktop}`;
            }
        }
    }
    imageChangeOnResize();
    window.addEventListener("resize", imageChangeOnResize);


    
    let scoreIn;
    let scoreDe;
    let intervalIn = null;
    let intervalDe = null;

    for(let i=0;i<incrementNumber.length;i++) {
            incrementNumber[i].addEventListener('mousedown', e => {
                if(e.button === 2) {
                    return;
                } else { 
                    scoreIn = Number(ammount[i].innerText);
                    intervalIn = setTimeout(function(){
                        intervalIn = setInterval(() => {
                        scoreIn++;
                        ammount[i].innerText = scoreIn;
                        }, 100);
                    },500)
                }
            });
        
            incrementNumber[i].addEventListener('mouseup', e => {
                    clearTimeout(intervalIn);
                    clearInterval(intervalIn);
            });
            incrementNumber[i].addEventListener('mouseleave', e => {
                    clearTimeout(intervalIn);
                    clearInterval(intervalIn);
            });

            incrementNumber[i].addEventListener('touchstart', e => {
                if(e.button === 2) {
                    return;
                } else { 
                    scoreIn = Number(ammount[i].innerText);
                    intervalIn = setTimeout(function(){
                        intervalIn = setInterval(() => {
                        scoreIn++;
                        ammount[i].innerText = scoreIn;
                        }, 100);
                    },500)
                }
            });
        
            incrementNumber[i].addEventListener('touchend', e => {
                    clearTimeout(intervalIn);
                    clearInterval(intervalIn);
            });
    }

    for(let i=0;i<decrementNumber.length;i++) {
            decrementNumber[i].addEventListener('mousedown', e => {
                if(e.button === 2) {
                    return;
                } else {
                    scoreDe = Number(ammount[i].innerText);
                    if(scoreDe < 1) {
                        return;
                    } else if(scoreDe > 1) {
                        intervalDe = setTimeout(function(){
                            intervalDe = setInterval(() => {
                                if(scoreDe < 1) {
                                    return;
                                } else if(scoreDe > 1) {
                                scoreDe--;
                                ammount[i].innerText = scoreDe;
                                }
                            }, 100);
                        },500)
                    }
                }
            });
        
            decrementNumber[i].addEventListener('mouseup', e => {
                clearTimeout(intervalDe);
                clearInterval(intervalDe);
            });
            decrementNumber[i].addEventListener('mouseleave', e => {
                clearTimeout(intervalDe);
                clearInterval(intervalDe);
            });

            decrementNumber[i].addEventListener('touchstart', e => {
                if(e.button === 2) {
                    return;
                } else {
                    scoreDe = Number(ammount[i].innerText);
                    if(scoreDe < 1) {
                        return;
                    } else if(scoreDe > 1) {
                        intervalDe = setTimeout(function(){
                            intervalDe = setInterval(() => {
                                if(scoreDe < 1) {
                                    return;
                                } else if(scoreDe > 1) {
                                scoreDe--;
                                ammount[i].innerText = scoreDe;
                                }
                            }, 100);
                        },500)
                    }
                }
            });
        
            decrementNumber[i].addEventListener('touchend', e => {
                clearTimeout(intervalDe);
                clearInterval(intervalDe);
            });
    }
}

//HOLD MB1 TO INCREMENT