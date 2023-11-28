function logout() {
    $.ajax({
        url: "/logout",
        type: "POST",
        success: function (data) {
            if (data.loggedOut) {
                window.location.href = "/";
            } else {
                alert("No user logged in");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
