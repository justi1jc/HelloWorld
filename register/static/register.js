
$(document).ready(function(){
    $("#submit").click(validate);
    init_fields();
})

/**
 * Sets fields to validate on change.
 */
function init_fields(){
        $("#first_name").change(validate_first_name);
        $("#last_name").change(validate_last_name);
        $("#address1").change(validate_address1);
        $("#city").change(validate_city);
        $("#state").change(validate_state);
        $("#zip").change(validate_zip);
        $("#country").change(validate_country);
}


/**
 * Validates fields and submits if every field is valid.
 */
function validate(){
    var valid = true;
    valid = validate_first_name() && valid;
    valid = validate_last_name() && valid;
    valid = validate_address1() && valid;
    valid = validate_city() && valid;
    valid = validate_state() && valid;
    valid = validate_zip() && valid;
    valid = validate_country() && valid;
    if(valid){
        submit();
    }
}
/**
 * Posts current fields to register user, redirecting to confirmation page
 * upon success.
 */
function submit(){
    $.ajax({
      type: "POST",
      url: "/register/",
      data: get_post_data(),
    }).done(function(){
        window.location.replace("/register/confirmation");
    }).fail(function(){
        alert("An error occurred.");
    });
}

/**
 * Returns a dictionary containing field data for use in posting.
 * @return (Dictionary) post_data
 */
function get_post_data(){
    return {
        csrfmiddlewaretoken : document.getElementsByName('csrfmiddlewaretoken')[0].value,
        first_name : $("#first_name").val(),
        last_name : $("#last_name").val(),
        first_address : $("#address1").val(),
        second_address : $("#address2").val(),
        city : $("#city").val(),
        state : $("#state").val().toUpperCase(),
        zip : $("#zip").val(),
        country : $("#country").val().toUpperCase()
    };
}

/**
 * Returns true if this is a valid first or last name.
 * @param (String) name - The name that will be evaluated.
 * @return (Boolean) valid
 */
function name_message(name){
    if(!name){
        return "Required field.";
    }
    var regex = /^[a-zA-Z-. ]+$/;
    if(!regex.test(name)){
        return "Names can only use letters, period, hyphen, and spaces.";
    }
    return "";
}

/**
 * Validates first_name field. Returns true if valid. Updates visible error
 * message for this field.
 * @return (Boolean) valid
 */
function validate_first_name(){
    var text = $("#first_name").val();
    var message = name_message(text);
    $("#first_name_error").text(message);
    if(message != ""){ return false; }
    return true;
}

/**
 * Validates last_name field. Returns true if valid. Updates visible error
 * message for this field.
 * @return (Boolean) valid
 */
function validate_last_name(){
    var text = $("#last_name").val();
    var message = name_message(text);
    $("#last_name_error").text(message);
    if(message != ""){ return false; }
    return true;
}

/**
 * Validates address1 field. Returns true if valid. Updates visible error
 * message for this field.
 * @return (Boolean) valid
 */
function validate_address1(){
    var text = $("#address1").val();
    var message = "";
    if(!text){ message = "Required field"; }
    $("#address1_error").text(message);
    if(message != ""){ return false; }
    return true;
}

/**
 * Validates city field. Returns true if valid. Updates visible error
 * message for this field.
 * @return (Boolean) valid
 */
function validate_city(){
    var text = $("#city").val();
    var message = "";
    if(!text){ message = "Required field"; }
    $("#city_error").text(message);
    if(message != ""){ return false; }
    return true;
}

/**
 * Validates state field. Returns true if valid. Updates visible error
 * message for this field.
 * @return (Boolean) valid
 */
function validate_state(){
    var text = $("#state").val();
    var message = "";
    if(!text){
        message = "Required field";
        $("#state_error").text(message);
        return false;
    }
    if(text.length != 2){
        message = "Use state abbreviation(eg New York is NY)";
        $("#state_error").text(message);
        return false;
    }
    if(!state_exists(text)){
        message = "Invalid state.";
        $("#state_error").text(message);
        return false;
    }
    return true;
}

/**
 * Returns true if the provided state appears in the list of existing US states.
 * @param (String) state - Two-digid state code that will be evaluated.
 * @return (Boolean) exists
 */
function state_exists(state){
    var states =
        ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
        "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
        "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
        "OR", "PA", "PA", "RI", "SC", "SD", "TN", "tX", "UT", "VT", "VA", "WA",
        "WV", "WI", "WY", "GU", "PR", "VI"];
    var i;
    for(i = 0; i < states.length; i++){
        if(states[i] == state.toUpperCase()){ return true; }
    }
    return false;
}

/**
 * Validates zip field. Returns true if valid. Updates visible error
 * message for this field.
 * @return (Boolean) valid
 */
function validate_zip(){
    var text = $("#zip").val();
    var message = "";
    var regex = /^[0-9]+$/;
    if(!text){ message = "Required field"; }
    else if(!regex.test(text)){
        message = "Zip code can only contain digits 0-9";
    }
    else if(text.length != 5 && text.length != 7){
        message = "Zip code must be either 5 or 7 digits long.";
    }
    $("#zip_error").text(message);
    if(message != ""){ return false; }
    return true;
}

/**
 * Validates country field. Returns true if valid. Updates visible error
 * message for this field.
 * @return (Boolean) valid
 */
function validate_country(){
    var text = $("#country").val();
    var message = "";
    if(!text){ message = "Required field"; }
    if(text.toUpperCase() != "US"){
        message = "US only";
    }
    $("#country_error").text(message);
    if(message != ""){ return false; }
    return true;
}