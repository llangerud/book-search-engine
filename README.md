# book-search-engine

  ![badge](https://img.shields.io/badge/license-MIT-blue.svg)
  ## Description
  This is a MERN application built with MongoDB, Express, React and Node that allows users to search the Google Books API and save/delete books in a personal account. Authentictation is done using JSON Web Tokens and passwords are hashed with bcrypt. It has been refactored from a RESTful API to a GraphQL API. The first commit in this repository is the working REST API application. 

  
  It is deployed  <a href=https://book-search-engine76954.herokuapp.com>here</a>.

  ![screenshot](/Screenshot.jpg)

  ## Table of Contents
  * <a href="#installation">Installation</a>
  * <a href="#usage">Usage</a>
  * <a href="#license">License</a>

  ## Installation
  Before running this application, please ensure you have Node installed. Then, from the command line, run "npm i" to install all the required dependencies. Scripts are setup to run in development as well as production.
  ## Usage
  Update the config to connect to your local MongoDB. Test routes in the GraphQL playground. To see the GraphQL updates, check out the following files/folders: 
  Client side:
  components: LoginForm and Signup Form
  pages: SavedBooks/SearchBooks
  utils/auth.js - client and server side
  Server side:
  config and server.js
  schemas folder
  

  ## License
  This project is covered under an MIT license. 
  
