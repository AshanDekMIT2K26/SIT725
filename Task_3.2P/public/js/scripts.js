let currentUser = null; // Global variable to store current logged-in user role

// Mock data for charging stations
const chargingStations = [
    { id: 1, name: "Melbourne CBD Station", lat: -37.8136, lng: 144.9631, availability: "3/5 slots free", connector: "Type 2, CCS", price: "$0.30/kWh", rating: "4.5/5", image: "images/carlton-gardens.jpg" }, // Green Placeholder
    { id: 2, name: "Southbank Chargers", lat: -37.8248, lng: 144.9691, availability: "1/2 slots free", connector: "CCS, CHAdeMO", price: "$0.35/kWh", rating: "3.9/5", image: "images/southbank.jpg" }, // Blue Placeholder
    { id: 3, name: "Carlton Gardens Station", lat: -37.8055, lng: 144.9698, availability: "4/4 slots free", connector: "Type 2", price: "$0.25/kWh", rating: "4.8/5", image: "images/Fitzory.jpg" }, // Orange Placeholder
    { id: 4, name: "St Kilda Beach Charging", lat: -37.8679, lng: 144.9764, availability: "2/3 slots free", connector: "Type 2, CHAdeMO", price: "$0.28/kWh", rating: "4.2/5", image: "images/Richmond.jpg" }, // Purple Placeholder
    { id: 5, name: "Fitzroy North ChargePoint", lat: -37.7877, lng: 144.9792, availability: "5/5 slots free", connector: "Type 2", price: "$0.20/kWh", rating: "4.0/5", image: "images/southern-cross-station.jpg" }, // Pink Placeholder
    { id: 6, name: "Richmond Fast Charge", lat: -37.8200, lng: 145.0000, availability: "0/3 slots free", connector: "CCS", price: "$0.40/kWh", rating: "4.7/5", image: "images/St-klida.jpg" }, // Brown Placeholder
];

// Function to update UI based on login status and role
const updateUIForUser = () => {
    // Hide all dashboard sections by default
    $('#driverDashboard').hide();
    $('#adminDashboard').hide();
    $('#operatorDashboard').hide();
    $('#logoutBtn').hide(); // Hide logout by default

    if (currentUser) { // If a user is logged in
        $('#loginBtn').hide(); // Hide login button
        $('#logoutBtn').show(); // Show logout button
    } else {
        $('#loginBtn').show(); // Show login button
    }

    if (currentUser === 'driver') {
        $('#driverDashboard').show();
        $('#driverName').text('EV Driver');
        // Specific content/features for driver when logged in
    } else if (currentUser === 'admin') {
        $('#adminDashboard').show();
        $('#adminName').text('Admin User');
    } else if (currentUser === 'operator') {
        $('#operatorDashboard').show();
        $('#operatorName').text('Station Operator');
    }
    // The hero section with map/cards is always visible to all, even when logged out.
};

// Simulate GPS location 
const simulateGPSLocation = () => {
    const lat = -37.8136; // Example Lat for Melbourne CBD
    const lng = 144.9631; // Example Lng for Melbourne CBD
    // Only update if driver dashboard is active
    if (currentUser === 'driver') {
        $('#driverLocation').text(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
};

// Function to render charging stations on the simulated map and list
const renderChargingStations = (stationsToRender = chargingStations) => {
    const mapContainer = $('#mapContainer');
    mapContainer.find('.station-pin').remove(); // Clear existing pins

    const stationListContainer = $('#stationList');
    stationListContainer.find('.col.s12.m6.l4').remove(); // Clear existing cards

    stationsToRender.forEach((station, index) => {
        // Simulate pin position on the static map image based on lat/lng (rough estimation for Melbourne)
        // Can adjust these ranges 
        const mapLngMin = 144.9000;
        const mapLngMax = 145.0500;
        const mapLatMin = -37.8700;
        const mapLatMax = -37.7500;

        const leftPercentage = ((station.lng - mapLngMin) / (mapLngMax - mapLngMin)) * 100;
        const topPercentage = 100 - (((station.lat - mapLatMin) / (mapLatMax - mapLatMin)) * 100); // Invert top for map

        const pin = $(`<div class="station-pin" style="left:${leftPercentage.toFixed(2)}%; top:${topPercentage.toFixed(2)}%; animation-delay:${index * 0.1}s;" data-station-id="${station.id}">
                            <i class="material-icons">ev_station</i>
                       </div>`);
        mapContainer.append(pin);

        // Add station card to the list 
        const stationCard = $(`
            <div class="col s12 m6 l4" style="--animation-delay: ${index * 0.15}s;">
                <div class="card station-card-item">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${station.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${station.name}<i class="material-icons right">more_vert</i></span>
                        <p>Availability: ${station.availability}</p>
                        <p>Connector: ${station.connector}</p>
                        <p>Rating: ${station.rating}</p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${station.name}<i class="material-icons right">close</i></span>
                        <p>Price: ${station.price}</p>
                        <p>This is a detailed description of ${station.name}. It offers fast charging and excellent service.</p>
                        <p>Location: Lat ${station.lat.toFixed(4)}, Lng ${station.lng.toFixed(4)}</p>
                    </div>
                    <div class="card-action">
                        <a href="#!" class="view-details-btn" data-station-id="${station.id}">View Details</a>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}" target="_blank" class="navigate-btn">Navigate</a>
                        <a href="#!" class="pay-now-btn modal-trigger" data-target="paymentModal" data-station-id="${station.id}">Pay Now</a>
                    </div>
                </div>
            </div>
        `);
        stationListContainer.append(stationCard);
    });

    // Attach event listeners to newly added elements
    $('.view-details-btn').click(function() {
        const stationId = $(this).data('station-id');
        const station = chargingStations.find(s => s.id === stationId);
        alert(`Details for ${station.name}:\nAvailability: ${station.availability}\nConnectors: ${station.connector}\nPrice: ${station.price}\nRating: ${station.rating}\n\n(This would typically open a dedicated station detail page or modal for reviews/ratings)`); // UC1
    });

    $('.pay-now-btn').click(function() {
        const stationId = $(this).data('station-id');
        const station = chargingStations.find(s => s.id === stationId);
        // Simulate a dynamic amount for demonstration
        const amount = (Math.random() * (25 - 5) + 5).toFixed(2); // Random amount between $5 and $25

        $('#paymentAmount').text(amount);
        $('#paymentRef').text(`REF-${station.id}-${Math.floor(Math.random() * 9000) + 1000}`);

    });
};

// Function to populate search dropdown
const populateSearchDropdown = (query = '') => {
    const dropdown = $('#search-results-dropdown');
    dropdown.empty();
    
    const filteredStations = chargingStations.filter(station => 
        station.name.toLowerCase().includes(query.toLowerCase()) ||
        station.connector.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredStations.length > 0 && query.length > 0) { // Only show dropdown if typing
        filteredStations.forEach(station => {
            const item = $(`<a href="#!" class="collection-item" data-station-id="${station.id}">${station.name} (${station.availability})</a>`);
            item.click(function() {
                $('#search-input').val(station.name); // Set input value
                renderChargingStations([station]); // Show only selected station
                dropdown.hide(); // Hide dropdown
            });
            dropdown.append(item);
        });
        dropdown.show();
    } else if (filteredStations.length > 0 && query.length === 0) { // Initial load: show all in dropdown
         filteredStations.forEach(station => {
            const item = $(`<a href="#!" class="collection-item" data-station-id="${station.id}">${station.name} (${station.availability})</a>`);
            item.click(function() {
                $('#search-input').val(station.name); // Set input value
                renderChargingStations([station]); // Show only selected station
                dropdown.hide(); // Hide dropdown
            });
            dropdown.append(item);
        });
        dropdown.show();
    }
    else {
        dropdown.hide();
    }
};

$(document).ready(function () {
    // Initialize Materialize modals
    $('.modal').modal();

    // Initial UI update based on current user (none at start)
    updateUIForUser();

    // Render stations on initial load
    renderChargingStations();
    simulateGPSLocation(); 

    // Populate search dropdown initially (show all)
    populateSearchDropdown();

    // Search input live filtering
    $('#search-input').on('keyup', function() {
        const query = $(this).val();
        populateSearchDropdown(query);
    });

    // Hide dropdown when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-card').length) {
            $('#search-results-dropdown').hide();
        }
    });


    // Login Form Submission
    $('#loginSubmitBtn').click(() => {
        const username = $('#username').val();
        const password = $('#password').val(); // Password is not validated in this stage

        if (username === 'driver' || username === 'admin' || username === 'operator') {
            currentUser = username;
            $('#loginModal').modal('close');
            updateUIForUser(); // Update UI after successful login
            // Hide the hero section elements if a specific dashboard takes over entirely
            $('#heroSection').hide();
        } else {
            alert('Invalid username. Please use "driver", "admin", or "operator".');
            return;
        }
    });

    // Logout Button
    $('#logoutBtn').click(() => {
        currentUser = null; // Clear current user
        updateUIForUser(); // Update UI to show logged-out state
        $('#heroSection').show(); // Show hero section again after logout
        renderChargingStations(); // Re-render all stations for public view
        populateSearchDropdown(); // Reset dropdown
        $('#search-input').val(''); // Clear search input
        alert('You have been logged out.');
    });

    // Dark Mode Toggle (NFR02)
    $('#darkModeToggle').click(() => {
        $('body').toggleClass('dark-mode');
    });

    // Voice Search button handler (Product Function)
    $('#voiceSearchBtn').click(() => {
        alert('Voice-enabled queries are a key product function! Functionality for this is coming soon (FR2).');
    });

    // Payment Option Clicks (placeholders for FR4)
    $('#applePayBtn, #googlePayBtn, #paypalBtn, #nfcPayBtn').click(function() {
        const paymentMethod = $(this).find('p').text();
        const amount = $('#paymentAmount').text();
        const ref = $('#paymentRef').text();
        alert(`Simulating payment of $${amount} via ${paymentMethod} for reference ${ref}. (Secure payment processing via Stripe/PayPal API would go here as per FR4)`);
        $('#paymentModal').modal('close');
    });
});
