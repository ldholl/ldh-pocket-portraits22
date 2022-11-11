let hasChildren = document.querySelector('input[id="chldrn"]').value.trim();
let hasPets = document.querySelector('input[id="pets"]').value.trim();
let likesSports = document.querySelector('input[id="sports"]').value.trim();
let likesMedia = document.querySelector('input[id="media"]').value.trim();

hasChildren = parseInt(hasChildren);
hasPets= parseInt(hasPets);
likesSports = parseInt(likesSports);
likesMedia = parseInt(likesMedia)

document.getElementById('chldrn').addEventListener('click', changeValueChldrn)
function changeValueChldrn(){
    if(hasChildren === 0){
        hasChildren = 1
    }
    else if(hasChildren === 1) {
        hasChildren = 0
    }
};

document.getElementById('pets').addEventListener('click', changeValuePets)
function changeValuePets(){
    if(hasPets === 0){
        hasPets = 1
    }
    else if(hasPets === 1) {
        hasPets = 0
    }
};

document.getElementById('sports').addEventListener('click', changeValueSports)
function changeValueSports(){
    if(likesSports === 0){
        likesSports = 1
    }
    else if(likesSports === 1) {
        likesSports = 0
    }
};

document.getElementById('media').addEventListener('click', changeValueMedia)
function changeValueMedia(){
    if(media === 0){
        media = 1
    }
    else if(media === 1) {
        media = 0
    }
};



async function editProfileHandler(event){
    event.preventDefault();

    let firstName = document.querySelector('input[id="first_name"]').value.trim();
    let lastName = document.querySelector('input[id="last_name"]').value.trim();


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];


    console.log(hasChildren, hasPets, likesSports, likesMedia)
  
    const response = await fetch(`/api/person/${id}`, {

        method: 'PUT',
        body: JSON.stringify({
            last_name: lastName,
            first_name: firstName,
            has_children: hasChildren,
            has_pets: hasPets,
            likes_sports: likesSports,
            likes_media: likesMedia
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });   

    document.location.reload();
}

document.getElementById('submit-edit').addEventListener('click', editProfileHandler);