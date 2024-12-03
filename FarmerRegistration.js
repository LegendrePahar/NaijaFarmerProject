document.getElementById("farmer-register-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Capture form data
  const farmerData = {
    name: document.getElementById("farmer-name").value,
    id: document.getElementById("farmer-id").value,
    phone: document.getElementById("farmer-phone").value,
    location: document.getElementById("farmer-location").value,
    coordinates: document.getElementById("gps-coordinates").value || "Not provided",
    qrBarcode: document.getElementById("input-qr-barcode").value,
    photo: document.getElementById("farmer-photo").files[0],
  };

  // Display success message (this would be replaced by actual server-side logic)
  document.getElementById("success-message").classList.remove("hidden");
  console.log("Farmer Data Submitted:", farmerData);

  // Clear form fields
  document.getElementById("farmer-register-form").reset();
});
