const API_URL = "http://localhost:5001/api";

export const api = {
  // Auth
  signup: (name, email, password) =>
    fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then((r) => r.json()),

  login: (email, password) =>
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json()),

  // Courses
  getCourses: () => fetch(`${API_URL}/courses`).then((r) => r.json()),

  getCourseById: (id) =>
    fetch(`${API_URL}/courses/${id}`).then((r) => r.json()),

  // Cart
  addToCart: (courseId, token) =>
    fetch(`${API_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    }).then((r) => r.json()),

  getCart: (token) =>
    fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  // Orders
  createOrder: (token) =>
    fetch(`${API_URL}/orders/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
};
