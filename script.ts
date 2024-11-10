interface ResumeData {
  name: string;
  email: string;
  phone: string;
  religion: string;
  education: string;
  experience: string;
  skills: string;
  profilePicture: string | null;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeform") as HTMLFormElement;
  const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
  const profilePictureInput = document.getElementById(
    "profilepicture"
  ) as HTMLInputElement;

  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const resumeData: ResumeData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      religion: (document.getElementById("rel") as HTMLInputElement).value,
      education: (document.getElementById("education") as HTMLTextAreaElement)
        .value,
      experience: (document.getElementById("experience") as HTMLTextAreaElement)
        .value,
      skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
      profilePicture: null,
    };

    if (profilePictureInput.files && profilePictureInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        resumeData.profilePicture = e.target?.result as string;
        generateResume(resumeData);
      };
      reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
      generateResume(resumeData);
    }
  });

  function generateResume(data: ResumeData): void {
    let profilePictureHtml = "";
    if (data.profilePicture) {
      profilePictureHtml = `<img src="${data.profilePicture}" alt="Profile Picture" style="max-width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />`;
    }

    const resumeHtml = `
      <h2>Resume</h2>
      ${profilePictureHtml}
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Contact:</strong> ${data.phone}</p>
      <p><strong>Religion:</strong> ${data.religion}</p>
      <h3>Education</h3>
      <p>${data.education}</p>
      <h3>Experience</h3>
      <p>${data.experience}</p>
      <h3>Skills</h3>
      <p>${data.skills}</p>
    `;

    resumeOutput.innerHTML = resumeHtml;
    resumeOutput.style.display = "block";

    form.style.display = "none";
  }
});
