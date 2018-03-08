module.exports = {
  async verifMuscle(value, service) {
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        name,
        $limit: 0
      }
    });
    if (result.total > 0) {
      return false;
    }
    return true;
  },
  async searchIdMusclesPrincipal(value, service) {
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        name,
        $limit: 1
      }
    });
    if (result.data <= 0) {
      return undefined;
    }
    return result.data[0]._id;
  },
  async searchIdMusclesSecondary(arrayMuscle, service) {
    let result = [];

    for (const muscle of arrayMuscle) {
      const name = muscle.toLowerCase();
      let muscleResult = await service.find({
        query: {
          name
        }
      });
      if (muscleResult.data <= 0) {
        throw new Error(`muscle ${name} does not exist`);
      }
      result = [...result, muscleResult.data[0]._id];
    }

    return result;
  },
  async searchNameMusclesSecondary(arrayId, service) {
    let result = [];
    for (const _id of arrayId) {
      let muscleResult = await service.find({
        query: {
          _id
        }
      });
      if (muscleResult.data <= 0) {
        throw new Error(`id ${_id} does not exist`);
      }
      result = [...result, muscleResult.data[0].name];
    }

    return result;
  },
  async searchNameMusclesPrincipal(_id, service) {
    const result = await service.find({
      query: {
        _id
      }
    });
    if (result.data <= 0) {
      return undefined;
    }
    return result.data[0].name;
  }
};
