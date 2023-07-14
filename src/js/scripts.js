
// Search bar behavior

// Get the search input element
const searchInput = document.getElementById('searchInput');

// Get the cross icon element
const crossIcon = document.getElementById('crossIcon');

// Add an event listener for input events
searchInput.addEventListener('input', function() {
  const searchValue = this.value;

  // Check if the search value has at least three characters
  if (searchValue.length >= 3) {
    // Show the cross icon
    crossIcon.style.display = 'inline-block';
  } else {
    // Hide the cross icon
    crossIcon.style.display = 'none';
  }
});

// Add an event listener for click events on the cross icon
crossIcon.addEventListener('click', function() {
  // Clear the search input
  searchInput.value = '';

  // Hide the cross icon
  crossIcon.style.display = 'none';
});