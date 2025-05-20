 // REGISTER USER
    document.getElementById("register-form").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const team_name = document.getElementById("team").value;

      fetch("https://test.blockfuselabs.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          team_name
        }),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            alert("User registered successfully!");
            console.log("Registration successful:", data);
            localStorage.setItem("registeredUser", JSON.stringify(data));
            window.location.href = "./login.html";
          } else {
            alert(data.message || "Registration failed.");
            console.error("Registration error:", data);
          }
        })
        .catch((error) => {
          console.error("Network error during registration:", error);
          alert("Network error.");
        });
    });

     

    document.getElementById("login-form").addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      fetch("https://test.blockfuselabs.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify({ email, password })
      })
        .then(async (response) => {
          let data = await response.json();
          if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(data));
           
            window.location.href = "./createPost.html";
          } else {
            alert(data.message || "Login failed.");
            console.error("Login error:", data);
          }
        })
        .catch((error) => {
          console.error("Network error during login:", error);
          alert("Network error.");
        });
    });

    
     document.getElementById('postForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const token = localStorage.getItem('authToken');

      if (!title || !content) {
        alert('Please fill all fields');
        return;
      }

      if (!token) {
        alert('No auth token found. Please login first.');
        return;
      }

      try {
        const response = await fetch('https://test.blockfuselabs.com/api/posts', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ title, content, category_id: 1 })
        });

        const contentType = response.headers.get('Content-Type');
        const text = await response.text();

        console.log('Status:', response.status);
        console.log('Content-Type:', contentType);
        console.log('Response text:', text);

        if (contentType && contentType.includes('application/json')) {
          const data = JSON.parse(text);
          if (!response.ok) {
            alert('Failed to create post: ' + JSON.stringify(data));
          } else {
            alert('Post created successfully!');
          }
        } else {
          alert('Server did not return JSON:\n' + text);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Network error or CORS issue');
      }
    });