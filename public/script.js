//
// let subtropical = document.getElementById("subtropical")
// subtropical.addEventListener("click", function() {}
// );

const getFormInfo = document.forms[0]
getFormInfo.addEventListener('submit', function(e) {
    e.preventDefault()
    const first_name = getFormInfo.querySelector('input[id="first-name"]').value;
    const last_name = getFormInfo.querySelector('input[id="last-name"]').value;
    const password = getFormInfo.querySelector('input[id="password"]').value;

    let ajax = new XMLHttpRequest();
    let method = "GET";
    let url = "http://localhost:63342/weathervault/dailei5.github.io/UserLogin.html?_ijt=f6bk1drvlkf1fe7ou6ncmaatir"
    let async = true;

    ajax.open(method, url, async);
    ajax.send();
    ajax.onreadystatechange = function () {
        console.log("hi")
    }



})









//
// pool.createQuery("SELECT * FROM UserAccounts", function (error, rows, fields) {
//     if (error) {
//         console.log('Error in query');
//     }
//     else {
//         console.log('Query completed successfully')
//     }
// })