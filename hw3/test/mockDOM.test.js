var fs = require('fs');

test('test selectEvent', () => {

    //Read the index.html file into a string
    var html = fs.readFileSync('public/index.html', 'utf8');
    expect(html).toEqual(expect.anything()); //any non-null value is okay

    //put the HTML into a testing DOM and do a sanity check
    document.body.innerHTML = html;
    const $ = require('jquery');
    expect($('h1').html()).toBe("Cheesecake Order Form");
    expect($('img').attr("src")).toBe("https://upload.wikimedia.org/wikipedia/commons/9/9c/Mondays_at_Il_Forno_-_Cheesecake_with_strawberry_sauce.jpg");
    expect($('p:first').html()).toBe("Quantity Topping");
    expect($('form div label').html()).toBe("Notes:");
    expect($('textarea').attr("placeholder")).toBe("Enter any special instructions here.");
    expect($('#order_submit_button').html()).toBe("Order");
});