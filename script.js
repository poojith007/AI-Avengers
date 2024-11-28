// Simulate live video feed
const videoFeed = document.getElementById('videoFeed');
const startWebcamButton = document.getElementById('startWebcamButton');
const stopWebcamButton = document.getElementById('stopWebcamButton');

let webcamStream;

startWebcamButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            webcamStream = stream;
            videoFeed.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
            videoFeed.textContent = "Unable to access live feed.";
        });
});

stopWebcamButton.addEventListener('click', () => {
    if (webcamStream) {
        const tracks = webcamStream.getTracks();
        tracks.forEach(track => track.stop());
        videoFeed.srcObject = null;
    }
});

// Incident Alerts Simulation
const alertsList = document.getElementById('alertsList');
function addAlert(message) {
    const li = document.createElement('li');
    li.textContent = message;
    alertsList.appendChild(li);
}

setInterval(() => {
    const alerts = [
        "Unauthorized access detected in Zone 3",
        "Suspicious activity detected near Gate A",
        "Sensor tampering detected in Warehouse 1"
    ];
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    addAlert(randomAlert);
}, 5000);

// Location Access
document.getElementById('getLocationButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('locationDetails').textContent = `Latitude: ${lat}, Longitude: ${lon}`;
        });
    } else {
        document.getElementById('locationDetails').textContent = "Geolocation not supported by this browser.";
    }
});

// Sign-In Form handling
document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    alert(`Logged in as: ${username}`);
});

// Sign-Up Form handling
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    alert(`Signed up as: ${newUsername}`);
});

// Toggle between Sign In and Sign Up forms
document.getElementById('signupLink').addEventListener('click', () => {
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
});

