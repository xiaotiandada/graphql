const posts = require("../../data/index");
const resolvers = {
 Query: {
    posts: () => posts,
 },
};
module.exports = resolvers;