const express = require("express");
const router = express.Router();
const passport = require("passport");
const Group = require("../models/Group");
const Message = require("../models/Message");

// @type Get
// @path /api/group/test
// @des test group
// @acess Public

router.get("/test", (req, res) => {
  res.send("Group Api Working");
});

// @type POST
// @path /api/group/create
// @des create group
// @acess Private

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let newGroup = new Group({
      name: req.body.name
    });
    newGroup.users.unshift({ user: req.user.id });
    newGroup
      .save()
      .then(group => res.json(group))
      .catch(e => res.status(404).json(e));
  }
);

// @type GET
// @path /api/group
// @des get list of all groups
// @acess Public

router.get("/", (req, res) => {
  Group.find()
    .populate("users.user")
    .populate("messages.message")
    .then(groups => {
      res.status(200).json(groups);
    })
    .catch(err => res.status(404).json(e));
});

// @type POST
// @path /api/group/join
// @des create group
// @acess Private

router.post(
  "/join/:group_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findOne({ _id: req.params.group_id })
      .then(group => {
        if (group) {
          console.log("Current user", req.user.id);
          console.log("group users", group.users[0].user);
          if (
            group.users.filter(user => user.user.toString() === req.user.id)
              .length > 0
          ) {
            res.json({ msg: "Already added to the group" });
          }

          group.users.unshift({ user: req.user.id });
          group
            .save()
            .then(group =>
              res.json({ msg: "Added to group successfully", group: group })
            )
            .catch();
        } else {
          res.json({ msg: "Wrong group id" });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @type GET
// @path /api/group/messages
// @des get messages
// @acess Private

router.get(
  "/messages/:group_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findOne({ _id: req.params.group_id })
      .then(group => {
        if (!group) {
          res.status(404).json({ msg: "Group not found" });
        }
        res.status(200).json({ messages: group.messages });
      })
      .catch(e => res.status(500).json({ error: e }));
  }
);

// @type POST
// @path /api/group/addMessage
// @desc add Message
// @access Private

router.post(
  "/addMessage/:group_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const content = req.body.content;
    Group.findOne({ _id: req.params.group_id })
      .then(group => {
        if (!group) {
          res.status(404).json({ msg: "Group not found" });
        } else {
          let newMessage = new Message({
            content: content,
            createdBy: req.user.id
          });

          newMessage
            .save()
            .then(message => {
              group.lastMessage = content;
              group.messages.unshift({ message: message._id });
              Group.findOneAndUpdate(
                { _id: group._id },
                { $set: group },
                { new: true }
              )
                .then(group =>
                  res
                    .status(200)
                    .json({ status: "Message added successfully", group })
                )
                .catch(err => {
                  throw err;
                });
            })
            .catch(err => {
              throw err;
            });
        }
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
