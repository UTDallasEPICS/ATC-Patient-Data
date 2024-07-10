<script setup>
// import { logoutRedirectUrl } from '../server/api/auth/auth0';
async function logout() {
  const token = useCookie("token").value;
  // const logoutUrl = logoutRedirectUrl(token);
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
  window.location.href = "http://localhost:3000/";
  // console.log("token", token);
  // console.log("logoutUrl", logoutUrl);
}
</script>

<template>
  <nav class="bg-gray-800">
    <button
      class="text-white px-3 py-2 hover:bg-gray-700 m-4 rounded"
      @click="logout"
    >
      Logout
    </button>
  </nav>
</template>
