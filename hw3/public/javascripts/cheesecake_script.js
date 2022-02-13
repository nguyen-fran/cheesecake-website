/**
 * author: Francisco Nguyen
 */

//handler for when users clicks the submit button of the form
orderSubmitHandler = function (event) {
    var top_notes = $("#special_instr").val();

    //check if the notes textbox contains the word "vegan"
    if (top_notes.toLowerCase().includes("vegan")) {
        alert("This cheesecake contains dairy.");
    } else {
        //building the submitted form text based on the user's inputs
        var thank_you = "<p>Thank you! Your order has been placed.</p>";
        var top_num = $("<p></p>").text("Quantity: " + $("#topping_num").val());

        /*
        help: needed to get the value of the selected radio button
        source: https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
        */
        var top_radio = document.getElementsByName("topping");
        var top_quant;
        //iterate through radio buttons to find which one was checked
        for (i = 0; i < top_radio.length; i++) {
            if (top_radio[i].checked) {
                top_quant = "Topping: " + top_radio[i].value;
                break;
            }
        }
        top_notes = "Notes: " + top_notes;

        //hiding form from page and printing thank you text
        $("img").after(thank_you, top_quant, top_num, top_notes);
        $("#order_form").hide();
        event.preventDefault();
    }
}

//handler for when user interacts with the month dropdown menu
monthDropdownHandler = function (event) {
    $("#month").text($(this).text());
    //request data from server and updates order list data to the month
    $.post("/orders", {month: $(this).text()})
        .done(function(data) {
                var order_data = data["data"];
                //might not need to iterate since I know exactly how the JSON object is formatted and ordered
                $("li").each(function(i) {
                    $(this).text(order_data[i]["quantity"] + " " + order_data[i]["topping"]);
                });
            }, "json");
}

$(document).ready(function(){
    //actions for when the submit button for the form is clicked
    $("#order_submit_button").on("click", orderSubmitHandler);

    //changes the text for order month to the one clicked on in drop down menu
    $("a").on("click", monthDropdownHandler);
});
