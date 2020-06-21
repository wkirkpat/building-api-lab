$("#loadButton").click(() => {
    $.get("http://localhost:3000/api/chirps", (data) => {
        console.log(data);
        $("#chirps").text(data);
    });

    console.log("click");
})