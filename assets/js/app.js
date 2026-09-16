const cl = console.log;

const postForm = document.getElementById('postForm')
const title = document.getElementById('title')
const content = document.getElementById('content')
const userId = document.getElementById('userId')
const addBtn = document.getElementById('addBtn')
const updateBtn = document.getElementById('updateBtn')


let base_url = 'https://jsonplaceholder.typicode.com/'
let post_url = `${base_url}/posts`

// let postArr = [];


function createPost(arr){
    let res = '';
    // cl(arr)

    arr.forEach(ele =>{
        res += `<div class="col-3 mt-5" id="${ele.id}">
                    <div class="card h-100">
                        <div class="card-header">
                            <h3 class="m-0">${ele.title}</h3>
                        </div>
                        <div class="card-body">
                            <p class="m-0">${ele.body}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button onclick="onEdit(this)" class="btn btn-sm btn-primary" type="button">Edit</button>
                            <button onclick="onDelete(this)" class="btn btn-sm btn-danger" type="button">Remove</button>
                        </div>
                    </div>
                </div>`
                let postContainer = document.getElementById('postContainer')
                        postContainer.innerHTML = res;
    })
}

// createPost(data)


function onCreatePost(){

    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', post_url, true)
    
    xhr.send(null)
    
    xhr.onload = function (){
        // cl(xhr.status)
    
        // cl(xhr.response)
    
        if(xhr.status >= 200 && xhr.status <= 299){
             let data = JSON.parse(xhr.response)
            //  cl(xhr.response)
            
            createPost(data)
            cl(data)
        }
    }
}

onCreatePost()

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
        if(xhr.status === 201 && xhr.readyState === 4){
            let res = JSON.parse(xhr.response)
            
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
            <button onclick="onEdit(this)" class="btn btn-sm btn-primary" type="button">Edit</button>
            <button onclick="onDelete(this)" class="btn btn-sm btn-danger" type="button">Remove</button>
            </div>
            </div>`
            postContainer.prepend(newPost)
        }
        postForm.reset()
    }
}

function onEdit(ele){
    let editId = ele.closest('.col-3').id;
    // cl(editId)

    localStorage.setItem('editId', editId)

    
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `${post_url}/${editId}`)

    xhr.send(null)

    xhr.onload  = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            // cl(res)

            title.value = res.title
            content.value = res.body
            userId.value = res.userId

            addBtn.classList.add('d-none')
            updateBtn.classList.remove('d-none')

        }
    }
}

function onUpdate(){
    let updateId = localStorage.getItem('editId')
    // cl(updateId)
    let update_url = `${post_url}/${updateId}`

    let updateObj = {
        title : title.value,
        body : content.value,
        userId : userId.value,
        id : updateId
    }

    let xhr = new XMLHttpRequest();

    xhr.open("PATCH", update_url, true)

    xhr.send(JSON.stringify(updateObj))

    xhr.onload = function(){
        if(xhr.status === 200){
            let data = JSON.parse(xhr.response)

            let col = document.getElementById(updateId)
            let h3 = col.querySelector('.card-header h3')
            let p = col.querySelector('.card-body p')

            h3.innerText = updateObj.title
            p.innerText = updateObj.body

            postForm.reset()

            localStorage.removeItem('editId')

            addBtn.classList.remove('d-none')
            updateBtn.classList.add('d-none')
        }
    }
}

function onDelete(ele){
    let deleteId = ele.closest('.col-3').id;
    // cl(deleteId)

    let delete_url = `${post_url}/${deleteId}`
    // cl(delete_url)

    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', delete_url, true)

    xhr.send(null)

    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response)

            ele.closest('.col-3').remove()
        }
    }
}


postForm.addEventListener('submit', onSubmit)
updateBtn.addEventListener('click', onUpdate)
