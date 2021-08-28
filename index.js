
// Grab elements by Element selector
let container = document.getElementById("con");
let parametersBox = document.getElementById("parametersBox");
container.removeChild(parametersBox);

// if the user clicks on the params box hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {

    document.getElementById("requestJsonBox").style.display = "none";
    container.insertBefore(parametersBox, document.getElementById("params"));
    insertParams();
})

// if user clicks on JSON box hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = "block";
    if (document.getElementById("parametersBox") != null) {
        container.removeChild(parametersBox);
    }
})

// console.log("this is my js from project postman clone");

// initializing parmas count 
let addParamsCount = 0;

// if the user clicks on + button, add more parameters
function insertParams() {
    let addParam = document.getElementById("addParam");
    addParam.addEventListener("click", () => {
        let params = document.getElementById("params");
        let string = `<div class="input-group my-4" id="parametersBox${addParamsCount + 2}">
        <span class="input-group-text">Parameter ${addParamsCount + 2}</span>
        <input type="text" class="form-control" id="parameterKey${addParamsCount + 2}" placeholder="Enter Parameter ${addParamsCount + 2} key">
        <input type="text" class="form-control" id="parameterValue${addParamsCount + 2}" placeholder="Enter Parameter${addParamsCount + 2} value">
        <button class="btn btn-primary mx-2 deleteParam" id="addParam ${addParamsCount + 2} ">-</button>
        </div>`;
        addParamsCount++;
        let paramElement = getElementFromString(string);
        params.append(paramElement);
        // Add an eventlistener to remove a parameter on clicking - button
        let deleteParam = document.getElementsByClassName("deleteParam");
        for (item of deleteParam) {
            item.addEventListener("click", (e) => {
                e.target.parentElement.remove();
            })
        }
    })

}

// utility functions to get DOM element from string 
function getElementFromString(stringTo) {
    let div = document.createElement("div");
    div.innerHTML = stringTo;
    return div;
}

// if user click on the submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    // show please wait in the respose box to show some patience from the user 
    document.getElementById("responsePrism").innerText = "Please wait......Featching respose";
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // if user has select the params option instead of json , collect all the parameters in the object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addParamsCount + 1; i++) {
            if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    // if method of json is selected 
    else {
        data = document.getElementById("requestJsonText").value;
    }

    // log all the values in the console
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    // check for the request if it is get request then exexute the following 
    if (requestType == "GET") {
        fetch(url)
            .then(Response => Response.text())
            .then(text => {
                document.getElementById("responsePrism").innerHTML = text;
                Prism.highlightAll();
            })
    }
    else {
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then(Response => Response.text())
            .then(text => {
                document.getElementById("responsePrism").innerHTML = text;
                Prism.highlightAll();
            })
    }
    // document.getElementById("responseJsonText").innerText = text;
})





