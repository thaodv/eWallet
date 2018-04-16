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