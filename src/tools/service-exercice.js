module.exports = {
  async verifExercice(value, ownerId, service){
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        name,
        ownerId,
        $limit: 0
      }
    });
    if(result.length > 0) {
      throw new Error(`Exercice ${name} already exist`);
    }
    return name;
  },
};
