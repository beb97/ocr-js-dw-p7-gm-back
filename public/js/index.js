(async () => {

    const url = '/post';
    const posts = await fetch(url)
        .then(response => response.json())
        .then(json => createPosts(json))
        .catch(response => "error");
})();

function createPosts(posts) {
    for(let post of posts) {
        createPost(post);
    }
}

function createPost(item) {
    console.log(item);
    let itemTemplate = document.querySelector("#item-template");
    let tableClone = itemTemplate.cloneNode(true)

    // tableClone.getElementsByClassName("item-link")[0].setAttribute("href", "/");
    tableClone.querySelector(".message").innerHTML = item.message;
    tableClone.querySelector(".author").innerHTML = item.user.email;
    // tableClone.getElementsByClassName("img")[0].setAttribute("src", "/");
    
    document.getElementById("item-list").appendChild(tableClone);
}