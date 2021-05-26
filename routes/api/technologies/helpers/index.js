const Technologies = require("../../../../models/Technologies");

module.exports = {
  findTechAndReturnTotalVotes: async (id, column) => {
    const tech = await Technologies.findById({ _id: id });
    return tech[column];
  },

  handleUpdateVotes: async (id, updatedVote, column) => {
    const filter = { _id: id };
    const update = { [column]: updatedVote };

    await Technologies.findOneAndUpdate(filter, update, {
      new: true,
    });
  },

  findTechnology: async (name) => {
    const tech = await Technologies.findOne({ name });
    return tech ? tech : false;
  },

  createNewTech: async (techData) => {
    const { name, description, creator, image, category } = techData;
    const date = new Date();
    const like = 0;
    const unlike = 0;

    let technology = new Technologies({
      name,
      description,
      creator,
      like,
      unlike,
      image,
      date,
      category: category.toLowerCase(),
    });

    image
      ? (technology.image = image)
      : (technology.image = "https://via.placeholder.com/300/09f/fff.png");

    return technology;
  },
};
