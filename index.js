const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

// courses
courses = [
  { id: 1, course: "C" },
  { id: 2, course: "C++" },
  { id: 3, course: "Java" },
  { id: 4, course: "Angular" },
  { id: 5, course: "React" },
  { id: 6, course: "PHP" },
  { id: 7, course: "Html" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id/", (req, res) => {
  const id = req.params.id;
  course = courses.find((ele) => ele.id == parseInt(id));
  if (!course) {
    res.status(404).send("Course with given id is not found");
  } else {
    res.send(course);
  }
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("name required minimum of length 3");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  let course = courses.find((ele) => ele.id === parseInt(id));
  if (!course) {
    res.status(404).send("Course with given id is not found");
    return;
  }

  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("name required minimum of length 3");
    return;
  }

  //courses.push(course);
  courses.forEach((course) => {
    if (course.id === parseInt(id)) {
      course.course = req.body.name;
    }
  });
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  let course = courses.find((ele) => ele.id === parseInt(id));
  if (!course) {
    res.status(404).send("Course with given id is not found");
    return;
  } else {
    courses = courses.filter((course) => course.id !== parseInt(id));

    res.send(course);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
