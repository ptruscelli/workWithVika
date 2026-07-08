// Submits to Formspree in the background and 
// swaps the form for a "Thank you!" message in place,
// instead of Formspree's default full-page redirect.
const form = document.getElementById("contact-form");

// Built here rather than in the HTML source so it isn't sitting in plain
// text for spam bots to scrape from the page 
const fallbackEmail = ["v.f.sokolova", "gmail.com"].join("@");

if (form) {
  const submitButton = form.querySelector("button[type='submit']");
  const successMessage = document.getElementById("form-success");
  const errorMessage = document.getElementById("form-error");
  const submitButtonDefaultText = submitButton.textContent;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorMessage.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`);
      }

      form.hidden = true;
      successMessage.hidden = false;
    } catch (error) {
      errorMessage.textContent = `Something went wrong sending your message — please try again, or email me directly on ${fallbackEmail}`;
      errorMessage.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = submitButtonDefaultText;
    }
  });
}
