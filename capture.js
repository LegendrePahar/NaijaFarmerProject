/*document.getElementById("capture-button").addEventListener("click", () => {
    // Simulate image capture
    alert("Camera functionality not yet implemented.");
  });*/

  // Capture Image Button Functionality
document.getElementById("capture-button").addEventListener("click", () => {
  // Create a video element to display the camera stream
  const videoElement = document.createElement("video");
  videoElement.id = "camera-feed";
  videoElement.autoplay = true;
  videoElement.style.width = "100%";
  videoElement.style.border = "1px solid #ccc";
  videoElement.style.borderRadius = "5px";

  // Replace the image preview with the video feed
  const previewContainer = document.querySelector(".image-preview");
  previewContainer.innerHTML = "<h3>Camera Feed:</h3>";
  previewContainer.appendChild(videoElement);

  // Access the user's camera
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      // Display the camera feed in the video element
      videoElement.srcObject = stream;

      // Add a "Capture" button to take a snapshot
      const captureButton = document.createElement("button");
      captureButton.textContent = "Capture Photo";
      captureButton.classList.add("btn-success");
      captureButton.style.marginTop = "10px";

      // Append the capture button
      previewContainer.appendChild(captureButton);

      // Capture Photo Logic
      captureButton.addEventListener("click", () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set canvas dimensions to match the video feed
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Draw the current video frame on the canvas
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to an image URL
        const imageDataUrl = canvas.toDataURL("image/png");

        // Display the captured image in the preview section
        const img = document.createElement("img");
        img.src = imageDataUrl;
        img.alt = "Captured Image";
        img.style.width = "100%";
        img.style.border = "1px solid #ccc";
        img.style.borderRadius = "5px";

        // Replace video feed with captured image
        previewContainer.innerHTML = "<h3>Preview:</h3>";
        previewContainer.appendChild(img);

        // Stop the camera stream
        stream.getTracks().forEach((track) => track.stop());

        // Enable the Submit button
        document.getElementById("submit-button").disabled = false;
      });
    })
    .catch((error) => {
      alert("Unable to access camera: " + error.message);
    });
});

  
  document.getElementById("upload-button").addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.getElementById("image-preview");
          img.src = e.target.result;
          document.getElementById("preview-message").textContent = "Image loaded successfully.";
          document.getElementById("submit-button").disabled = false;
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  });
  
  document.getElementById("submit-button").addEventListener("click", () => {
    alert("Image submitted for verification.");
  });
  
  // Import the QuaggaJS library for barcode scanning
// Ensure you've included the library in your project or CDN: <script src="https://unpkg.com/@ericblade/quagga2"></script>
// Import the QuaggaJS library (Ensure this script is included: <script src="https://unpkg.com/@ericblade/quagga2"></script>)

let scannerInitialized = false; // Track scanner initialization

// Start the scanner
function startScanner() {
  if (scannerInitialized) {
    Quagga.start(); // Resume scanner if already initialized
    return;
  }

  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        target: document.querySelector("#scanner"), // Element to display the camera feed
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment", // Use the rear camera
        },
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "qr_reader"], // Barcode and QR readers
      },
    },
    (err) => {
      if (err) {
        console.error("Error initializing scanner:", err);
        alert("Failed to initialize scanner. Please check camera permissions.");
        return;
      }
      scannerInitialized = true; // Mark as initialized
      console.log("Scanner initialized successfully");
      Quagga.start();
    }
  );

  // Handle detected QR/Barcode
  Quagga.onDetected((data) => {
    const code = data.codeResult.code;
    document.getElementById("scan-result").innerText = `Scanned Code: ${code}`;

    // Automatically stop scanner after a successful scan
    stopScanner();

    // Optional: Send the scanned code to your backend for validation
    // fetch('/validate-code', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ scannedCode: code })
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
  });
}

// Stop the scanner
function stopScanner() {
  Quagga.stop();
  document.getElementById("scanner").style.display = "none"; // Hide the camera feed
  document.getElementById("stop-scanner").style.display = "none"; // Hide the Stop button
  document.getElementById("open-scanner").style.display = "inline-block"; // Show the Open Scanner button
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const openScannerButton = document.getElementById("open-scanner");
  const stopScannerButton = document.getElementById("stop-scanner");
  const scannerElement = document.getElementById("scanner");

  // Open Scanner Button
  openScannerButton.addEventListener("click", () => {
    scannerElement.style.display = "block"; // Show the camera feed container
    stopScannerButton.style.display = "inline-block"; // Show the Stop button
    openScannerButton.style.display = "none"; // Hide the Open Scanner button
    startScanner();
  });

  // Stop Scanner Button
  stopScannerButton.addEventListener("click", stopScanner);
});
