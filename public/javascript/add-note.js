async function addNoteHandler(event){
    event.preventDefault();

    let newNote = document.querySelector('input[id="newNote"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const response = await fetch(`/api/notes`,{
        method: 'POST',
        body: JSON.stringify({
            note_text: newNote,
            person_id: id

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.reload();
}



document.getElementById('submit-note').addEventListener('click', addNoteHandler);


