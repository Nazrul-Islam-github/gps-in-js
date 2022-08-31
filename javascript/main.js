window.onload = main;
let CURRENT_LOCATION;
let A = null;
let B = null;
function main() {
    if (window.navigator && window.navigator.geolocation) {
        let geolocation = window.navigator.geolocation;
        if (geolocation) {
            geolocation.watchPosition(onLocationUpdate, onError, {
                enableHighAccuracy: true,
                maximumAge: 1000
            })
        } else {
            alert("not run this app ")
        }
    }
}


function onLocationUpdate(event) {
    CURRENT_LOCATION = event.coords;
    console.log(CURRENT_LOCATION);
    document.getElementById("loc").innerHTML = `Your Location:<br>Lat${CURRENT_LOCATION.latitude} <br> Lag: ${CURRENT_LOCATION.longitude}`

}

function onError(error) {
    alert("not access location: " + error.message)
}

function setA() {
    A = CURRENT_LOCATION;
    updateInfo();
}

function setB() {
    B = CURRENT_LOCATION
    updateInfo();
}


function updateInfo() {
    if (A != null) {
        document.getElementById("aBtn").innerHTML = A.latitude + "<br>" + A.longitude;
    }

    if (B != null) {
        document.getElementById("bBtn").innerHTML = B.latitude + "<br>" + B.longitude;
    }

    if (A != null && B != null) {
        let dist = getDistance(A, B);
        document.getElementById("info").innerHTML = "distance: " + dist + "metters";
    }
}


function latLogToXYZ(latlog, R) {
    const xyz = { x: 0, y: 0, z: 0 };
    xyz.y = Math.sin(degToRad(latlog.latitude)) * R;
    const r = Math.cos(degToRad(latlog.latitude)) * R
    xyz.x = Math.sin(degToRad(latlog.longitude)) * r;
    xyz.z = Math.cos(degToRad(latlog.longitude)) * r;
    return xyz;


}

function degToRad(degree) {
    return degree * Math.PI / 180;
}

function getDistance(location1, location2) {
    const R = 6371000;
    const xyz1 = latLogToXYZ(location1, R);
    const xyz2 = latLogToXYZ(location2, R);
    const eucl = euclidean(xyz1, xyz2)
    return eucl;
}


function euclidean(p1, p2) {
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) +
        (p1.y - p2.y) * (p1.y - p2.y) +
        (p1.z - p2.z) * (p1.z - p2.z)
    )
}