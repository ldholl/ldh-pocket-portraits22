async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector(`#username-signup`).value.trim();
    const email = document.querySelector(`#email-signup`).value.trim();
    const password = document.querySelector(`#password-signup`).value.trim();

    if (username && email && password) {
        const response = await fetch(`/api/user`, {
            method: `post`,
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { "Content-Type": "application/json"}
        });
        
        if (response.ok) {
            console.log(`success`);
            document.location.replace(`/`)
        }
        else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector(`#username-login`).value.trim();
    const password = document.querySelector(`#password-login`).value.trim();

    if (username && password) {
        const response = await fetch(`/api/user/login`, {
            method: `post`,
            body: JSON.stringify({
                username,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            console.log(`success`);
            // Redirects user to their homepage when logged in
            document.location.replace(`/`);
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector(`.signup-form`).addEventListener(`submit`, signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);