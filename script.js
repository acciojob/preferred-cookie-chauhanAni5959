// Helper function to get cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

// Helper function to set cookie with expiration (1 year)
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Apply preferences from cookies to document and form inputs
function applyPreferences() {
  const fontSize = getCookie('fontsize');
  const fontColor = getCookie('fontcolor');

  if (fontSize && !isNaN(parseInt(fontSize)) && parseInt(fontSize) >= 8 && parseInt(fontSize) <= 72) {
    document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
    document.getElementById('fontsize').value = fontSize;
  }

  if (fontColor && /^#[0-9a-fA-F]{6}$/.test(fontColor)) {
    document.documentElement.style.setProperty('--fontcolor', fontColor);
    document.getElementById('fontcolor').value = fontColor;
  }
}

// Save preferences in cookies when form is submitted
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const fontSizeValue = document.getElementById('fontsize').value;
  const fontColorValue = document.getElementById('fontcolor').value;

  const fontSize = parseInt(fontSizeValue);
  if (isNaN(fontSize) || fontSize < 8 || fontSize > 72) {
    alert('Font size must be between 8 and 72');
    return;
  }

  setCookie('fontsize', fontSize);
  setCookie('fontcolor', fontColorValue);

  document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
  document.documentElement.style.setProperty('--fontcolor', fontColorValue);

  alert('Preferences saved!');
});

// Apply preferences when page loads
window.addEventListener('DOMContentLoaded', applyPreferences);
