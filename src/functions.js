export function inputValidation(property, value) {
    let error = '';
    switch (property) {        
        case 'loginEmail':
            if (value === "") {
                error = 'Please enter email address';
            }
            break;
        case 'loginPassword':
            if (value === "") {
                error = 'Please enter password';
            }
            break;
        default:
            if (value === '' || value < 0) {
                error = 'This field is Required';
            }
            break;
    }
    return error;
}
export function inputChange(e) {
    //e.preventDefault();
    let property = e.target.id;
    let value = e.target.value;
    let prev = this.state.form;        
    prev[property] = value;        
    this.setState({
        form: prev
    })
    let error = inputValidation(property, value);    
    document.getElementById('error_'+property).innerHTML = error;
}
export function fullFormValidation(e) {
    let checkFields = 0;
    let object = this.state.form;        
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            let error = inputValidation(key, object[key]);
            document.getElementById('error_' + key).innerHTML = error;
            if(error !== '') {
                checkFields = 1;
            }          
        }
    }
    return checkFields;
}

export function setCookie(cname, cvalue, exdays) {
    return new Promise((resolve,reject) => {
        try {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            resolve(1);
        } catch(err) {
            reject(err);
        }        
    });
    
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkCookie(cname) {
    return getCookie(cname);
}

export function deleteCookie(cname) {
    return new Promise((resolve,reject) => {
        try {
            document.cookie = cname +'=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/';
            resolve(1);
        } catch(err) {
            reject(err);
        } 
    }); 
}