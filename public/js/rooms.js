
let allRooms = [];

async function loadRooms() {
    let response = await fetch('rooms.json');
    allRooms = await response.json();
    filterRooms();
}

function filterRooms() {
    let category = document.getElementById("room-category").value;
    let maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

    let roomList = document.getElementById("room-list");
    roomList.innerHTML = "";

    allRooms.filter(room => 
        (category === "all" || room.type === category) && Number(room.price) <= maxPrice
    ).forEach(room => {
        let div = document.createElement("div");
        div.classList.add("col-md-4", "mt-3");

        let available = room.available;
        let statusClass = available ? "available" : "booked";
        
        div.innerHTML = `
            <div class="room-card">
                <img src="${room.img}" alt="${room.name}">
                <div class="info">
                    <h5>${room.name}</h5>
                    <p>Price: ₹${room.price} per night</p>
                    <span class="${statusClass}">${available ? "Available" : "Booked"}</span>
                    ${available ? `<button class="book-btn" onclick="bookRoom(this, '${room.name}', ${room.price})">Book Now</button>` : ""}
                </div>
            </div>`;
        roomList.appendChild(div);
    });
}

function bookRoom(button, roomName, price) {
    alert(`✅ Booking Confirmed!\nRoom: ${roomName}\nPrice: ₹${price} per night`);
    button.innerText = "Booked";
    button.disabled = true;
}

window.onload = loadRooms;

