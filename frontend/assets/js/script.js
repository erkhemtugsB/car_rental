'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

// JavaScript to handle login modal and form submission

function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      closeLoginModal();
      // Handle successful login (e.g., show edit buttons)
    } else {
      alert('Login failed');
    }
  });
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('loginModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Add this function to check if the user is authenticated

function checkAuth() {
  fetch('/check-auth')
    .then(response => response.json())
    .then(data => {
      if (data.authenticated) {
        // Show edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => btn.style.display = 'block');
      }
    });
}

// Call checkAuth on page load
document.addEventListener('DOMContentLoaded', checkAuth);