async function editUserSettings() {
  const response = await fetch("http://localhost:5000/api/user/settings", {
    method: "PUT",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Failed to edit user settings");
  }
}

export { editUserSettings };
