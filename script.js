// Battery status simulation
let batteryLevel = 100;
function updateBattery() {
  batteryLevel -= Math.random() * 5; // Simulate gradual drain
  batteryLevel = Math.max(batteryLevel, 0); // Don't go below 0%
  document.getElementById("battery-status").textContent = `${Math.round(batteryLevel)}%`;
  
  // Update battery icon based on level
  const batteryIcon = document.querySelector(".fa-battery-full");
  batteryIcon.className = "fa-solid " + (
    batteryLevel > 80 ? "fa-battery-full" :
    batteryLevel > 50 ? "fa-battery-three-quarters" :
    batteryLevel > 20 ? "fa-battery-half" :
    "fa-battery-quarter"
  );
}

// Frontlight toggle
document.getElementById("frontlight-toggle").addEventListener("click", () => {
  const toggle = document.getElementById("frontlight-toggle");
  const isOn = toggle.textContent === "On";
  toggle.textContent = isOn ? "Off" : "On";
  document.querySelector(".fa-lightbulb").classList.toggle("text-yellow-300");
});

// Wi-Fi functionality
const wifiModal = document.getElementById('wifi-modal');
const wifiList = document.getElementById('wifi-list');
const wifiPasswordContainer = document.getElementById('wifi-password-container');
const wifiPasswordInput = document.getElementById('wifi-password');
const connectWifiBtn = document.getElementById('connect-wifi');
const disconnectWifiBtn = document.getElementById('disconnect-wifi');
const closeWifiBtn = document.getElementById('close-wifi');
let selectedNetwork = null;

// Mock Wi-Fi networks
const networks = [
  { ssid: 'Home WiFi', strength: 3, secured: true },
  { ssid: 'Coffee Shop', strength: 2, secured: false },
  { ssid: 'Office Network', strength: 4, secured: true }
];

// Show Wi-Fi modal
document.querySelector(".fa-wifi").parentElement.addEventListener("click", () => {
  // Populate network list
  wifiList.innerHTML = networks.map(network => `
    <div class="network-item p-2 border-b cursor-pointer flex justify-between items-center" data-ssid="${network.ssid}">
      <span>${network.ssid}</span>
      <div class="flex items-center">
        ${Array(4).fill().map((_, i) => 
          `<i class="fa-solid ${i < network.strength ? 'fa-wifi' : 'fa-wifi-slash'} mx-0.5" style="color: ${i < network.strength ? '#000' : '#ccc'}"></i>`
        ).join('')}
        ${network.secured ? '<i class="fa-solid fa-lock ml-2"></i>' : ''}
      </div>
    </div>
  `).join('');
  
  wifiModal.classList.remove('hidden');
});

// Handle network selection
wifiList.addEventListener('click', (e) => {
  const networkItem = e.target.closest('.network-item');
  if (!networkItem) return;
  
  selectedNetwork = networkItem.dataset.ssid;
  const network = networks.find(n => n.ssid === selectedNetwork);
  
  // Reset UI
  wifiPasswordContainer.classList.add('hidden');
  connectWifiBtn.classList.add('hidden');
  disconnectWifiBtn.classList.add('hidden');
  
  if (network.secured) {
    wifiPasswordContainer.classList.remove('hidden');
    connectWifiBtn.classList.remove('hidden');
  } else {
    connectWifiBtn.classList.remove('hidden');
  }
});

// Connect to network
connectWifiBtn.addEventListener('click', () => {
  const network = networks.find(n => n.ssid === selectedNetwork);
  const password = network.secured ? wifiPasswordInput.value : null;
  
  // Simulate connection
  document.getElementById("wifi-status").textContent = "Connected";
  document.querySelector(".fa-wifi").classList.remove("text-gray-500");
  wifiModal.classList.add('hidden');
  alert(`Connected to ${selectedNetwork}`);
});

// Disconnect
disconnectWifiBtn.addEventListener('click', () => {
  document.getElementById("wifi-status").textContent = "Disconnected";
  document.querySelector(".fa-wifi").classList.add("text-gray-500");
  wifiModal.classList.add('hidden');
});

// Close modal
closeWifiBtn.addEventListener('click', () => {
  wifiModal.classList.add('hidden');
});

// Settings functionality
const settingsModal = document.getElementById('settings-modal');
const titleInput = document.getElementById('title-input');
const showNamesCheckbox = document.getElementById('show-names');
const gridColumnsSelect = document.getElementById('grid-columns');
const saveSettingsBtn = document.getElementById('save-settings');

// Toggle settings modal
document.querySelector(".status-item:last-child").addEventListener("click", () => {
  // Load current settings
  titleInput.value = document.querySelector("main h1").textContent;
  settingsModal.classList.remove('hidden');
});

// Save settings
saveSettingsBtn.addEventListener('click', () => {
  document.querySelector("main h1").textContent = titleInput.value;
  // Other settings would be applied here when implemented
  settingsModal.classList.add('hidden');
});

// Close modal when clicking outside
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.add('hidden');
  }
});

// Initialize battery updates
setInterval(updateBattery, 5000);
updateBattery(); // Initial update
