const API_BASE_URL = "http://localhost:5000";

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response.json();
}

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
}

export async function getSuppliers() {
  const response = await fetch(`${API_BASE_URL}/suppliers`);
  return response.json();
}

export async function getWarehouses() {
  const response = await fetch(`${API_BASE_URL}/warehouses`);
  return response.json();
}

export async function getInventory() {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  return response.json();
}

export async function getMovements() {
  const response = await fetch(`${API_BASE_URL}/movements`);
  return response.json();
}

export async function stockIn(data) {
  const response = await fetch(`${API_BASE_URL}/stock-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function stockOut(data) {
  const response = await fetch(`${API_BASE_URL}/stock-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}