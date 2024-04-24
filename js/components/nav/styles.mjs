export const contentStyle = `
// * {outline: solid 1px red;}
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
a {
  text-decoration: none;
  color: #000;
  font-size: 0.875rem;
}

.login-link {
    padding: 0.5rem;
    border: solid 1px #6767;
    border-radius: 6px;
}

.nav-content > li, ul {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    padding: 0;
}

logo-container {
    padding-inline: 0.125rem;
}

.logo-container p {
    font-weight: bold;
    display: inline;
    text-wrap: nowrap;
}

.dropdown {
    display: inline-block;
    position: relative;
    height: 2.5rem; 
    width: 2.5rem; 
    border-radius: 50%; 
    background-color: #333;
}

.dropdown-content {
    // display: none;
    position: absolute;
    right: 0;
    top: 35px;
    background-color: #fff;
    padding: 0.5rem;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    display: block;
    border-bottom: solid 1px #6767;
    padding: 0.125rem 0;
}

.dropdown:hover .dropdown-content {
    display: block;
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

`

export const navStyle = `
position: fixed;
display: flex;
justify-content: center;
width: 100%; 
z-index: 50; 
background-color: #fff;
border-bottom: solid 1px #6767;
`
