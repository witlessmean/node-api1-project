const express = require("express");
const app = express();
const shortid = require("shortid");

app.use(express.json());

//we're going to want to edit this list, so use let instead of const. 
let users = [
  {
    id: shortid.generate(),
    name: "Youko Nakajima",
    bio:
      "Youko was a 16-year-old living a fairly ordinary life as an honor student in Japan, whose primary worry is her naturally red hair. One day at school, a man named Keiki suddenly appeared and bowed at her feet, swearing loyalty to her. The school was then attacked by a giant bird, and she reluctantly accepted his protection. He gave her a sword and transports her and two of her classmates to the kingdom of Kou.",
  },
  {
    id: shortid.generate(),
    name: "Keiki",
    bio:
      "Keiki is a kirin and the Saiho of Kei. He contacted Youko in Japan and brought her to the Twelve Kingdoms, though they were separated. Soon afterwards, he fell under a spell from Kou's Saiho, and was forced to appear in front of a pretender to the throne of Kei. Like all Kirin, Keiki abhors violence and prefers peaceful resolutions. Keiki appears as a very quiet and unemotional type, however does have caring qualities, especially seen towards the kirin Taiki.",
  },
  {
    id: shortid.generate(),
    name: "Rakushun ",
    bio:
      "Rakushun is a hanjyuu with the form of a rat. Though Youko is initially distrustful of him, he becomes her first good friend after she is taken from Japan, after managing to teach some essential skills to Yoko about life. Rakushun is proud of being a hanjyuu and is somewhat uncomfortable in his human form; Youko only learns that he could appear as a human after quite some time. He is very intelligent and knowledgeable and enrolled in the Daigaku of En. Youko wishes him to teach her about the politics and customs of the world.",
  },
  {
    id: shortid.generate(),
    name: "Enki",
    bio:
      "As a taika from Japan, the kirin of En (or Enki) is also known as Rokuta. He was found by his nyokai after his parents abandoned him at a young age. He originally felt that humans could not rule a kingdom properly and was reluctant to choose a new king, but he felt that Shoryu truly deserved to become king of En. He assisted Youko in her journey to Kei and played a part in helping the Saiho of Tai.",
  },
  {
    id: shortid.generate(),
    name: "Shouryuu",
    bio:
      "Shoryu is the king of En. Like Youko, Shoryu is a taika from feudal Japan, approximately 500 years ago. He was originally the leader of a clan, and after it was wiped out, he was taken by Enki to rule the kingdom of En. Though En was originally in terrible condition, his 500-year rule has led to an extremely calm and prosperous nation. Shoryu helped Youko by providing her with an army to retake the kingdom of Kei and rescue Keiki. As a fellow taika, Shoryu feels that he should help guide Youko in her new life.",
  },
];

app.get("/api/users/", (request, response) => {
  if (users) {
    response.status(200).json(users);
  } else {
    response.status(500).json({ error: "error" });
  }
});
//find user, go through array, match id of user with id typed in searchbar, return that user. User will send us id in request, so we request.params.id
app.get("/api/users/:id/", (request, response) => {
  let id = request.params.id
  const user = users.find((user) => {
    return user.id === id
  })
  if(user) {
    response.status(200).json(user)
  } else {
    response.status(404).json('user id does not exist')
  }
})
//read data incoming from body, add to collection, return the new collection with the added data
app.post("/api/users/", (request, response) => {
  const newUser = request.body
  users.push(newUser)
  response.status(201).json(users)
})
//using filter and not find because find returns one element, filter can return multiple. So we will perform the same operation on every element inside of the array. filter returns true of false. If it returns true on one item, it will return that item inside of an array of whatever other items. If it returns false, it will return false on that item. We're using the number id to parse the id from the url into a number considering that the url values we receive will always be strings. So lets say id: 2 is in the url and the first array item is id: 1. id 1 will still return because it's true that id: 1 is not equal to id: 2. When we reach id 2, it will be false that id: 2 is not equal to id: 2, and so that will return false and filter it out. Then we return the new collection. Because we get a new array we return that new array, not the old one. So here we'll return deletedUser 


app.delete("/api/users/:id/", (request, response) => {
    const id = request.params.id
    deletedUser = users.filter((user) => {
      user.id !== id
       })
       response.status(200).json(deletedUser) 
      })



// app.delete("/api/users/:id", (request, response) => {
//   const id = request.params.id
//   const found = users.find((user) => id === user.id);

//   if (!found) {
//     response.status(404).json({ message: "no id" });
//   } else {
//     const newUsers = users.filter((user) => user.id !== id);
   
//     response.status(201).json(newUsers);
//   }
// });

app.listen(5001);

//nodemon index.js

