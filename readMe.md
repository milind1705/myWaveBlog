Blog Website

access point
//Signup
Method:"POST"
https://milindblog.herokuapp.com/signup

name: "test name(any)"
email: "test@email.com"
password "password"

//login
Method:"POST"
https://milindblog.herokuapp.com/login
email: "test@email.com"
password "password"

//Create blog
set the token in headers or cookies
Method:"POST"
https://milindblog.herokuapp.com/createBlog
title : Test Blog
description: tell what is in your blog
markDown: write your blog info here

//get blog
Method:"GET"
https://milindblog.herokuapp.com/blog

//get blog by Id
Method:"GET"
https://milindblog.herokuapp.com/blog/:id

update blog
set the token in headers or cookies
Method:"PUT"
https://milindblog.herokuapp.com/blog/:id

delete blog
set the token in headers or cookies
Method:"DELETE"
https://milindblog.herokuapp.com/blog/:id