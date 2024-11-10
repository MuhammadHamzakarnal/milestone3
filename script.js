document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("resumeform");
  var resumeOutput = document.getElementById("resumeOutput");
  var profilePictureInput = document.getElementById("profilepicture");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var resumeData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      religion: document.getElementById("rel").value,
      education: document.getElementById("education").value,
      experience: document.getElementById("experience").value,
      skills: document.getElementById("skills").value,
      profilePicture: null,
    };

    if (profilePictureInput.files && profilePictureInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var _a;
        resumeData.profilePicture =
          (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        generateResume(resumeData);
      };
      reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
      generateResume(resumeData);
    }
  });

  function generateResume(data) {
    var profilePictureHtml = "";
    if (data.profilePicture) {
      profilePictureHtml = '<img src="'.concat(
        data.profilePicture,
        '" alt="Profile Picture" style="max-width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />'
      );
    }

    var resumeHtml = "\n      <h2>Resume</h2>\n      "
      .concat(profilePictureHtml, "\n      <p><strong>Name:</strong> ")
      .concat(data.name, "</p>\n      <p><strong>Email:</strong> ")
      .concat(data.email, "</p>\n      <p><strong>Contact:</strong> ")
      .concat(data.phone, "</p>\n      <p><strong>Religion:</strong> ")
      .concat(data.religion, "</p>\n      <h3>Education</h3>\n      <p>")
      .concat(data.education, "</p>\n      <h3>Experience</h3>\n      <p>")
      .concat(data.experience, "</p>\n      <h3>Skills</h3>\n      <p>")
      .concat(data.skills, "</p>\n    ");

    resumeOutput.innerHTML = resumeHtml;
    resumeOutput.style.display = "block";

    form.style.display = "none";
  }
});
