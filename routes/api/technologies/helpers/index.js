const Technologies = require("../../../../models/Technologies");

module.exports = {
  findTechAndReturnTotalVotes: async (id) => {
    const tech = await Technologies.findById({ _id: id });
    return tech.votes;
  },

  handleUpdateVotes: async (id, updatedVote) => {
    const filter = { _id: id };
    const update = { votes: updatedVote };
    await Technologies.findOneAndUpdate(filter, update, {
      new: true,
    });
  },

  findTechnology: async (name) => {
    const tech = await Technologies.findOne({ name });
    return tech ? tech : false;
  },

  createNewTech: async (techData) => {
    const { name, description, creator, image } = techData;
    const date = new Date();
    const votes = 0;

    let technology = new Technologies({
      name,
      description,
      creator,
      votes,
      image,
      date,
    });

    image
      ? (technology.image = image)
      : (technology.image = "https://via.placeholder.com/300/09f/fff.png");

    return technology;
  },
};
