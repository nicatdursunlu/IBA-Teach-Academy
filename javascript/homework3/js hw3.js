function createNewUser() {
    
    let firstname = prompt("Enter the fisrtname: ");
    let lastname = prompt("Enter the lastname: ");
    
    let newUser = {
        
        firstname: firstname,
        lastname: lastname,
        
        getLogin() {
            alert(newUser.firstname.charAt(0).toLowerCase() + newUser.lastname.toLowerCase()) ;
        }
        
    };
    return  newUser
}

let user = new createNewUser()
user.getLogin()
