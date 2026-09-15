const cl = console.log;

const postForm = document.getElementById('postForm')
const title = document.getElementById('title')
const content = document.getElementById('content')
const userId = document.getElementById('userId')


let base_url = 'https://jsonplaceholder.typicode.com/'
let post_url = `${base_url}/posts`


let xhr = new XMLHttpRequest();

xhr.open('GET', post_url, true)

xhr.send(null)

xhr.onload = function (){
    cl(xhr.status)

    cl(xhr.responseText)

    if(xhr.status >= 200 && xhr.status <= 299){
        let data = JSON.parse(xhr.response)
        let res = '';
        data.reverse().forEach(ele => {
            res += `<div class="col-3 mt-5" id="${ele.id}">
                <div class="card h-100">
                    <div class="card-header">
                        <h3 class="m-0">${ele.title}</h3>
                    </div>
                    <div class="card-body">
                        <p class="m-0">${ele.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Remove</button>
                    </div>
                </div>
            </div>`
        });
        let postContainer = document.getElementById('postContainer')
        postContainer.innerHTML = res;
    }
}


function onSubmit(eve){
    eve.preventDefault();

    let newObj = {
        title : title.value,
        body : content.value,
        userId : userId.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", post_url);
    xhr.send(JSON.stringify(newObj));
    xhr.onload = () => {
        postForm.reset()
        if(xhr.status === 201 && xhr.readyState == 4){
            
            let newPost = document.createElement("div");
            newPost.className = "col-3 mt-5";
            newPost.id = res.id
            newPost.innerHTML = `<div class="card h-100">
                    <div class="card-header">
                        <h3 class="m-0">${newObj.title}</h3>
                    </div>
                    <div class="card-body">
                        <p class="m-0">${newObj.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="onEdit(this)" class="btn btn-sm btn-primary">Edit</button>
                        <button onclick="onDelete(this)" class="btn btn-sm btn-danger">Remove</button>
                    </div>
                </div>`
            postContainer.prepend(newPost)
        }
    }
}


function onEdit(){
    let editId = ele.closest('.col-3').id;
    cl(editId)

    // let edit               

    let xhr = new XMLHttpRequest();

    xhr.open()
}


postForm.addEventListener('submit', onSubmit)
