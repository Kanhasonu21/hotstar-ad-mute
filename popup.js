document.addEventListener('DOMContentLoaded', function() {
  const mainToggle = document.getElementById('mainToggle');
  const muteMode = document.getElementById('muteMode');
  const volumeMode = document.getElementById('volumeMode');
  const volumeControl = document.getElementById('volumeControl');
  const volumeValue = document.getElementById('volumeValue');
  const volumeSection = document.getElementById('volumeSection');

  // Load saved states
  chrome.storage.sync.get(['enabled', 'controlMode', 'adVolume'], function(result) {
    mainToggle.checked = result.enabled !== false;
    const mode = result.controlMode || 'mute';
    if (mode === 'mute') {
      muteMode.checked = true;
    } else {
      volumeMode.checked = true;
    }
    volumeControl.value = result.adVolume || 20;
    volumeValue.textContent = `${volumeControl.value}%`;
    updateVolumeSection(mainToggle.checked, mode);
  });

  // Save main toggle state
  mainToggle.addEventListener('change', function() {
    chrome.storage.sync.set({
      enabled: mainToggle.checked
    });
    updateVolumeSection(mainToggle.checked, getControlMode());
  });

  // Handle mode changes
  function handleModeChange() {
    const mode = getControlMode();
    chrome.storage.sync.set({
      controlMode: mode
    });
    updateVolumeSection(mainToggle.checked, mode);
  }

  muteMode.addEventListener('change', handleModeChange);
  volumeMode.addEventListener('change', handleModeChange);

  // Update volume display and save volume when changed
  volumeControl.addEventListener('input', function() {
    volumeValue.textContent = `${volumeControl.value}%`;
    chrome.storage.sync.set({
      adVolume: parseInt(volumeControl.value)
    });
  });

  function getControlMode() {
    return muteMode.checked ? 'mute' : 'volume';
  }

  function updateVolumeSection(isEnabled, mode) {
    volumeSection.classList.toggle('disabled', !isEnabled || mode === 'mute');
  }
});