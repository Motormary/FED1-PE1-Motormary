// CSS for navbar

export const contentStyle = `
.nav-content {
  box-sizing: border-box;
  display: flex;
  height: 3.75rem;
  width: 100%;
  max-width: 2560px;
  padding: 0 3rem;
  align-items: center;
  justify-content: space-between;
}

.logo-container a {
    display: flex;
    align-items: center;
}

.logo-container p {
    font-family: "Caveat", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 2rem;
    margin: 0;
    color: #333;
}

.nav-logo {
    max-height: 41px;
    margin-right: 0.5rem;
}

a {
  text-decoration: none;
  color: #676767;
  font-size: 0.875rem;
}

.login-link {
    padding: 0.5rem;
    border: solid 1px #6767;
    border-radius: 6px;
    color: #333;
}

.nav-content > li, ul {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    padding: 0;
}

.dropdown {
    display: inline-block;
    position: relative;
    height: 2.5rem; 
    width: 2.5rem;
    user-select: none;
}

.dropdown:focus {
    outline: none;
}

.dropdown img {
    height: 2.5rem;
    width: 2.5rem; 
    border-radius: 50%; 
    cursor: pointer;
    user-select: none;
}


.dropdown-content {
    visibility: hidden;
    position: absolute;
    right: 0;
    top: 40px;
    background-color: #fff;
    min-width: 140px;
    border-radius: 6px;
    border: 1px solid #6767;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.dropdown-content > button {
    width: 100%;
    background-color: inherit;
    outline: none;
    border: none;
    font-family: inherit;
    text-align: left;
}

.dropdown-content > * {
    display: block;
    font-size: 0.75rem;
    color: #333;
    border-bottom: solid 1px #6767;
    padding: 0.5rem;
    user-select: none;
}

/* Open dropdown when hovered / focused with tab */
.dropdown:focus-within .dropdown-content {
    visibility: visible;
    opacity: 1;
}

/* Make dropdown menu accessible (except logged in username) + colored selection */
.dropdown-content > *:hover:not(:first-child),
.dropdown-content > *:focus-visible:not(:first-child) {
    outline: none;
    background-color: #67676715;
    cursor: pointer;
}

.dropdown-content span {
    color: #676767
}

@media (max-width: 530px) {
    .logo-container p {
        display: none;
    }
}

@media (max-width: 1920px) {
    .nav-content {
        padding: 0 2.5%;
    }
}

@media (max-width: 810px) {
    .dropdown-content {
        top: -0.5rem;
        right: -0.75rem;
        bottom: 0;
        width: 100vw;
        height: fit-content;
        text-align: center;
    }

    .dropdown-content > * {
        font-size: 2rem;
        display: flex;
        justify-content: center;
        padding: 1rem 0;
    }
}


`

export const navStyle = `
position: fixed;
display: flex;
justify-content: center;
width: 100%; 
z-index: 50; 
background-color: #fff;
border-bottom: solid 1px #6767;
box-shadow: 1px 1px 1px 1px #67676715
`
