function getRand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

let opts = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
        'args': '-rtsp_transport tcp -i rtsp://admin:opencv123@192.168.1.154:554 -vframes 1 img/out'+getRand(4, 100)+'.png'
    })
}

function capture() {
    fetch('http://localhost:3000/capimages/', opts)
        .then(res => res.json())
        .then(result => {
            console.log(result);           
         })
        .catch((error) => {
            console.log('error', error);
        });
}