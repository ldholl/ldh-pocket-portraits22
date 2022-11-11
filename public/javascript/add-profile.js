let hasChildrenProfile = 0;
let hasPetsProfile = 0;
let likesSportsProfile = 0;
let likesMediaProfile = 0;

document.getElementById('has_children').addEventListener('click', addChildren);

function addChildren(){
    if (hasChildrenProfile === 0){
        hasChildrenProfile = 1;
    }
    else if (hasChildrenProfile === 1){
        hasChildrenProfile = 0
    }
}

document.getElementById('has_pets').addEventListener('click', addPets);

function addPets(){
    if (hasPetsProfile === 0){
        hasPetsProfile = 1;
    }
    else if (hasPetsProfile === 1){
        hasPetsProfile = 0
    }
}

document.getElementById('likes_sports').addEventListener('click', addSports);
function addSports(){
    if (likesSportsProfile === 0){
        likesSportsProfile = 1;
    }
    else if (likesSportsProfile === 1){
        likesSportsProfile = 0
    }
}

document.getElementById('likes_media').addEventListener('click', addMedia);
function addMedia(){
    if (likesMediaProfile === 0){
        likesMediaProfile = 1;
    }
    else if (likesMediaProfile === 1){
        likesMediaProfile = 0
    }
}



async function addProfileHandler(event){
    event.preventDefault();

    let lastName = document.querySelector('input[id="last_name"]').value.trim();
    let firstName = document.querySelector('input[id="first_name"]').value.trim();

    console.log('making profile')

    const response = await fetch(`/api/person`, {
        method: 'POST',
        body: JSON.stringify({
            last_name: lastName,
            first_name: firstName,
            has_children: hasChildrenProfile,
            has_pets: hasPetsProfile,
            likes_sports: likesSportsProfile,
            likes_media: likesMediaProfile
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace(`/`);
}

document.getElementById('submitProfile').addEventListener('click', addProfileHandler)