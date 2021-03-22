function makeServerCall(method, url, data, options, onSuccess, onError) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status >= 200 && this.status < 300) {
                onSuccess(this);
            }
            else {
                onError(this);
            }
        }
    };
    xhttp.open(method, url, true, 'sokrates', 'dialog');
    if (options) {
        if (options.headers) {
            options.headers.forEach(header => {
                let key = Object.keys(header)[0];
                xhttp.setRequestHeader(key, header[key]);
            });
        }
    }
    xhttp.send(data);
}

export default makeServerCall;