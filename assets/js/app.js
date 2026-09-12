const cl = console.log;


let base_url = 'https://jsonplaceholder.typicode.com/'
let post_url = `${base_url}/posts`


let xhr = new XMLHttpRequest();

xhr.open('GET', post_url, true)

xhr.send()

xhr.onload = function (){
    cl(xhr.status)

    cl(xhr.responseText)

    if(xhr.status >= 200 && xhr.status <= 299){
        let data = JSON.parse(xhr.response)
        let res = '';
        data.forEach(ele => {
            res += `<div class="col-3 mt-5" id=${ele.id}>
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

