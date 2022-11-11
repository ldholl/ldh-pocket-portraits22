async function deleteFormHandler(event) {
    event.preventDefault();
  
    // will delete any person that has url with any user logged
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    // will only delete person under logged user
    // const id = 3
    const response = await fetch(`/api/person/${id}`, {
      method: 'DELETE'
    });

    console.log(response)
  
    if (response.ok) {
    document.getElementById('modalDeleteProfile').style.display='none'
    } else {
        console.log('did not delete!')
    }
  }
  
  document.getElementById('deletePerson').addEventListener('click', deleteFormHandler);
  
