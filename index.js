const express = require("express");
const app = express();
const shortid = require("shortid"); 
app.use(express.json())
//we're going to want to edit this list, so use let instead of const.
let users = [
  {
    id: 1,
    name: "Youko Nakajima",
    bio:
      "Youko was a 16-year-old living a fairly ordinary life as an honor student in Japan, whose primary worry is her naturally red hair. One day at school, a man named Keiki suddenly appeared and bowed at her feet, swearing loyalty to her. The school was then attacked by a giant bird, and she reluctantly accepted his protection. He gave her a sword and transports her and two of her classmates to the kingdom of Kou.",
  },
  {
    id: 2,
    name: "Keiki",
    bio:
      "Keiki is a kirin and the Saiho of Kei. He contacted Youko in Japan and brought her to the Twelve Kingdoms, though they were separated. Soon afterwards, he fell under a spell from Kou's Saiho, and was forced to appear in front of a pretender to the throne of Kei. Like all Kirin, Keiki abhors violence and prefers peaceful resolutions. Keiki appears as a very quiet and unemotional type, however does have caring qualities, especially seen towards the kirin Taiki.",
  },
  {
    id: 3,
    name: "Rakushun ",
    bio:
      "Rakushun is a hanjyuu with the form of a rat. Though Youko is initially distrustful of him, he becomes her first good friend after she is taken from Japan, after managing to teach some essential skills to Yoko about life. Rakushun is proud of being a hanjyuu and is somewhat uncomfortable in his human form; Youko only learns that he could appear as a human after quite some time. He is very intelligent and knowledgeable and enrolled in the Daigaku of En. Youko wishes him to teach her about the politics and customs of the world.",
  },
  {
    id: 4,
    name: "Enki",
    bio:
      "As a taika from Japan, the kirin of En (or Enki) is also known as Rokuta. He was found by his nyokai after his parents abandoned him at a young age. He originally felt that humans could not rule a kingdom properly and was reluctant to choose a new king, but he felt that Shoryu truly deserved to become king of En. He assisted Youko in her journey to Kei and played a part in helping the Saiho of Tai.",
  },
  {
    id: 5,
    name: "Shouryuu",
    bio:
      "Shoryu is the king of En. Like Youko, Shoryu is a taika from feudal Japan, approximately 500 years ago. He was originally the leader of a clan, and after it was wiped out, he was taken by Enki to rule the kingdom of En. Though En was originally in terrible condition, his 500-year rule has led to an extremely calm and prosperous nation. Shoryu helped Youko by providing her with an army to retake the kingdom of Kei and rescue Keiki. As a fellow taika, Shoryu feels that he should help guide Youko in her new life.",
  },

];

app.get("/api/users/", (request, response) => {
  if (users) {
    response.status(200).json(users);
  } else {
    response.status(500).json({ errorMessage: "error" });
  }
});
//find user, go through array, match id of user with id typed in searchbar, return that user. User will send us id in request, so we request.params.id. id needs to come back as a number, not json.
app.get("/api/users/:id/", (request, response) => {
  let id = Number(request.params.id);
  const user = users.find((user) => {
    return user.id === id;
  });
  if (user && user.bio && user.name) {
    response.status(200).json(user);
  } else if (!user) {
    response.status(404).json("user id does not exist");
  } else if ((user && !user.bio) || !user.name) {
    response
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  } else {
    response.status(500).json("unknown error");
  }
});
//read data incoming from body, add to collection, return the new collection with the added data
app.post("/api/users/", (request, response) => {
  //const {newUserInfo} = request.body;

    if(!request.body.name || !request.body.bio) {
      response.status(400).json({errorMessage: "Please provide name and bio for the user"});
    } else {
      //const newUserId = shortid.generate();
      request.body.id = users.length + 1
      users.push(request.body);
      console.log(users)
      const newUser = users.filter((user) => { 
        return user.id === request.body.id
      });
       // newUser ? response.status(201).json(newUser) : response.status(500).json({errorMessage: 'There was an error saving the user'})
        if(newUser){
          response.status(201).json(newUser) 
        } else {
          response.status(500).json({errorMessage: "There was an error saving the user"})
        }
    }
});

//exact working copy: users will work even if i change the name to say 'new users'.
// app.delete("/api/users/:id", (req, res) => {
//   const id = req.params.id;
//   users = users.filter(u => u.id !== Number(id));
//   res.status(200).json(users)
// })

//rewriting exact working copy:

// app.delete("/api/users/:id", (request, response) => {
//   const id = request.params.id;
//   newUsers = users.filter((user) => {
//    return user.id !== Number(id)
//   })
//     response.status(200).json(newUsers)
// })

//using filter and not find because find returns one element, filter can return multiple. So we will perform the same operation on every element inside of the array. filter returns true of false. If it returns true on one item, it will return that item inside of an array of whatever other items. If it returns false, it will return false on that item. We're using the number id to parse the id from the url into a number considering that the url values we receive will always be strings. So lets say id: 2 is in the url and the first array item is id: 1. id 1 will still return because it's true that id: 1 is not equal to id: 2. When we reach id 2, it will be false that id: 2 is not equal to id: 2, and so that will return false and filter it out. Then we return the new collection. Because we get a new array we return that new array, not the old one. So here we'll return deletedUser.
///THE PROBLEM WITH THIS CODE IS THAT THE FILTER DOESN'T RETURN ANYTHING. SEE ABOVE FOR WORKING CODE.

// app.delete("/api/users/:id/", (request, response) => {
//   const id = request.params.id;
//   newUsers = users.filter((user) => {
//     user.id !== Number(id);
//   });
//   response.status(200).json(newUsers);
// });

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

app.delete("/api/users/:id", (request, response) => {
  const { id } = request.params
  const user = users.filter((user) => { return user.id === id})
  console.log(id)
  console.log(user)
	if (user.length > 0) {
		users = users.filter(user => user.id !== id);

		const deletedUser = users.find(user => user.id === id);
		deletedUser
			? response.status(500).json({ errorMessage: "The user could not be removed." })
			: response.json(user);
	} else {
		response.status(404).json({ message:"The user with the specified ID does not exist."  });
	}
});

app.put("/api/users/:id", (request, response) => {
  const body = request.body;
  const {id} = request.params;

  if (!body.name || !body.bio) {
    response
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    const user = users.find(user => user.id === id);
    //console.log(users)
    console.log(user)
    if (user) {
     // users = users.map((user) => {
        //return user.id === id ? {  } : user;
     // });

      //if user get rid of the object whos id matches user.id, then response.status(200) 

      Object.assign(user, body)

      response.status(200).json(user)
      
    //   const newUser = users.find((user) => user.id === id);
    //   newUser
    //     ? response.json(newUser)
    //     : response
    //         .status(500)
    //         .json({ errorMessage: "The information could not be modified." });
    } else {
      response
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  }
});

app.listen(5020);

//nodemon index.js
