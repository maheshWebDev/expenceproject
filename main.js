const addExpence = document.getElementById("form");
addExpence.addEventListener("submit",post);
window.addEventListener("DOMContentLoaded",get);

// post request

function post(e){
    e.preventDefault();
    let amount = document.getElementById("num").value;
    let description = document.getElementById("text").value;
    let category =document.getElementById("op").value
    // console.log("hello")
    const obj = {
        amount : amount,
        description : description,
        category : category
    }
    axios.post("https://crudcrud.com/api/8b9ffc919f39463b843d856d935b76ee/expence/",obj)
    .then((response)=>{showOnScreen(response.data)})
    .catch((err)=>{console.log(err)})
}

// show on screen
function showOnScreen(obj){
let list = document.getElementById("list")
let addToList =`<li id=${obj._id}>${obj.amount}  ${obj.description}  ${obj.category}
<button onClick=deleteDetails("${obj._id}")>Delete</button>
<button onClick=editDetails("${obj._id}","${obj.amount}","${obj.description}","${obj.category}")>Edit</button>`
list.innerHTML += addToList;
}

// get request
function get(e){
    e.preventDefault();
    axios.get("https://crudcrud.com/api/8b9ffc919f39463b843d856d935b76ee/expence/")
    .then((response)=>{for(let i=0;i<response.data.length;i++){showOnScreen(response.data[i])}})
    .catch((err)=>{console.log(err)})
}

// delete details
function deleteDetails(id){
    axios.delete(`https://crudcrud.com/api/8b9ffc919f39463b843d856d935b76ee/expence/${id}`)
    .then((response)=>{return removeDetails(id)})
    .catch((err)=>{console.log(err)})
}

// remove details

function removeDetails(id){
    let from = document.getElementById("list");
    let remove = document.getElementById(id);
    from.removeChild(remove);
}

// edit details
function editDetails(id,amount,description,category){
    document.getElementById("num").value=amount;
    document.getElementById("text").value=description;
    document.getElementById("op").value=category;
    deleteDetails(id);
}