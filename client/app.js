$("#loadButton").click(() => {
  loadChirps();
});

$("#submitButton").click(() => {
  let name = $("#nameText").val();
  let text = $("#chirpText").val();
  let chirp = JSON.stringify({
    name: name,
    text: text,
  });
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/api/chirps",
    data: chirp,
    contentType: "application/json; charset=utf-8",
  }).done(() => {
    loadChirps();
  });
});

//This basically loads every chirp and makes new HTML elements and styles them. 
//This adds a ton of HTML to the page and I wasn't sure how else to do it in Jquery, so here we are
//Also has the Put and Delete Ajax requests in here because I needed to attach them to buttons
//on each individual chirp
let loadChirps = () => {
  $.get("http://localhost:3000/api/chirps", (data) => {
    $("#chirps").empty();
    const entries = Object.entries(data);
    entries.splice(-1, 1);
    entries.forEach((entry) => {
      $("#chirps").append(
        `
        <div class="card mb-3">
          <h4 class="card-header justify-content-between">
            <div>${entry[1].name}</div>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Edit
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="editChirpName"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <input
                      class="modal-title"
                      id="editChirpName"
                      value="${entry[1].name}"
                    />
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <textarea class="modal-body form-control" id="editChirpText">
          ${entry[1].text}
        </textarea
                  >
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      id="edit${entry[0]}"
                      data-dismiss="modal"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
        
            <button type="button" class="close" id="${entry[0]}" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </h4>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>${entry[1].text}</p>
            </blockquote>
          </div>
        </div>
        `        
      );

      $(`#${entry[0]}`).click(() => {
        $.ajax({
          method: "DELETE",
          url: `http://localhost:3000/api/chirps/${entry[0]}`,
        });
        loadChirps();
      }); 

      $(`#edit${entry[0]}`).click(() => {
        let chirp = JSON.stringify({
          name: $("#editChirpName").val(),
          text: $("#editChirpText").val(),
        });
        $.ajax({
          method: "PUT",
          url: `http://localhost:3000/api/chirps/${entry[0]}`,
          data: chirp,
          contentType: "application/json; charset=utf-8",
        });
        loadChirps();
      });
    });
  });
};

loadChirps();
