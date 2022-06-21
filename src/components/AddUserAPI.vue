<template>
  <div id="container">
    <input placeholder="Prenom"/>
    <input placeholder="Nom"/>
    <input placeholder="Framework"/>
    <q-button @click="getUsers()">See each user on the console</q-button>
    <q-button @click="postUsers()">Valider</q-button>
  </div>
</template>

<script setup>
import axios from "axios";

const getUsers =() => {
  const getData = axios.get("https://4078-92-103-197-34.eu.ngrok.io/users");
  console.log(getData)
}

const postUsers =() => {
  axios.post(`https://4078-92-103-197-34.eu.ngrok.io/users`, {
    body: {
      firstname: "Prénom",
      lastname: "Nom",
      framework: "Framework",
    },
  })
}
</script>
