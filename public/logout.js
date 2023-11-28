function logout() {
    $.ajax({
        url: "/logout",
        type: "POST",
        success: function (data) {
            window.location.href = "/";
        },
        error: function (error) {
            console.log(error);
        }
    });
}