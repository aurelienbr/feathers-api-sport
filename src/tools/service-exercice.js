module.exports = {
  async verifExercice(value, ownerId, service) {
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        name,
        ownerId,
        $limit: 0
      }
    });

    if (result.total > 0) {
      throw new Error(`Exercice ${name} already exist`);
    }
    return name;
  },
  async searchIdExercice(arrayExercice, service) {
    let result = [];

    for (const exercice of arrayMuscle) {
      const name = exercice.toLowerCase();
      let exerciceResult = await service.find({
        query: {
          name
        }
      });
      if (exerciceResult.data <= 0) {
        throw new Error(`muscle ${name} does not exist`);
      }
      result = [...result, exerciceResult.data[0]._id];
    }

    return result;
  },
  async searchExerciceList(arrayId, service) {
    let result = [];
    for (const _id of arrayId) {
      let exerciceResult = await service.find({
        query: {
          _id
        }
      });
      if (exerciceResult.data <= 0) {
        throw new Error(`Exercice with id ${_id} does not exist`);
      }
      result = [...result, exerciceResult.data];
    }

    return result;
  },
  async verifExerciceList(arrayId, service) {
    let result = [];
    for (const _id of arrayId) {
      let exerciceResult = await service.find({
        query: {
          _id
        }
      });
      if (exerciceResult.data <= 0) {
        throw new Error(`Exercice with id ${_id} does not exist`);
      }
      result = [...result, exerciceResult.data[0]._id];
    }

    return result;
  }
};
