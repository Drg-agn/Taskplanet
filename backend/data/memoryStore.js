// Temporary in-memory database. Data resets every time the server restarts.
// Replace with the Mongoose-based controllers (from earlier) when you set up MongoDB.

const users = [];
const posts = [];

let userIdCounter = 1;
let postIdCounter = 1;

module.exports = {
  users,
  posts,
  generateUserId: () => String(userIdCounter++),
  generatePostId: () => String(postIdCounter++),
};