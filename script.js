// Initialize EmailJS with your User ID
(function(){
  emailjs.init("BVIemZ27RhdbGAbVg");
})();

// Toggle hamburger menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Modal functions
function openModal() {
  document.getElementById('contactModal').style.display = 'flex';
  document.getElementById('contactForm').reset();
  document.getElementById('formMessage').style.display = 'none';
  document.getElementById('otherFormInput').style.display = 'none';
}

function closeModal() {
  document.getElementById('contactModal').style.display = 'none';
  document.getElementById('contactForm').reset();
  document.getElementById('otherFormInput').style.display = 'none';
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.remove('active'); // Close hamburger menu when modal closes
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('contactModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Toggle visibility of other form input
function toggleOtherInput() {
  const formName = document.getElementById('formName').value;
  const otherInput = document.getElementById('otherFormInput');
  otherInput.style.display = formName === 'Other' ? 'block' : 'none';
  if (formName !== 'Other') {
    otherInput.value = '';
  }
}

// Send email using EmailJS
function sendEmail() {
  const fullName = document.getElementById('fullName').value;
  const whatsappNumber = document.getElementById('whatsappNumber').value;
  let formName = document.getElementById('formName').value;
  const otherFormInput = document.getElementById('otherFormInput').value;
  const messageElement = document.getElementById('formMessage');

  // Use other form input if "Other" is selected
  if (formName === 'Other') {
    formName = otherFormInput;
  }

  // Basic validation
  if (!fullName || !whatsappNumber || !formName) {
    messageElement.textContent = 'Please fill out all fields.';
    messageElement.className = 'message error';
    messageElement.style.display = 'block';
    return;
  }

  // Add current date and time
  const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const templateParams = {
    full_name: fullName,
    whatsapp_number: whatsappNumber,
    form_name: formName,
    submission_time: submissionTime
  };

  emailjs.send('service_m8m6gn7', 'template_pvs848c', templateParams)
    .then(function(response) {
      messageElement.textContent = 'Your request has been sent successfully!';
      messageElement.className = 'message';
      messageElement.style.display = 'block';
      document.getElementById('contactForm').reset();
      setTimeout(closeModal, 2000);
    }, function(error) {
      messageElement.textContent = 'Failed to send your request. Please try again.';
      messageElement.className = 'message error';
      messageElement.style.display = 'block';
    });
}
