module.exports = {
  async verifSession(value, ownerId, service) {
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        name,
        ownerId,
        $limit: 0
      }
    });
    if (result.total > 0) {
      throw new Error(`Session ${name} already exist`);
    }
    return name;
  },
  async verifSessionWithId(value, ownerId, _id, service) {
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        name,
        ownerId
      }
    });
    if (result.total > 0 && result.data[0]._id != _id) {
      throw new Error(`Session ${name} already exist`);
    }
    return name;
  },
  async searchNameSession(_id, ownerId, service) {
    const result = await service.find({
      query: {
        _id,
        ownerId
      }
    });
    if (result.data <= 0) {
      return undefined;
    }
    return result.data[0].name;
  },
  async searchIdSession(value, ownerId, service) {
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        name,
        ownerId,
        $limit: 1
      }
    });
    if (result.data <= 0) {
      return undefined;
    }
    return result.data[0]._id;
  },
  async getIdSession(value, _id, service) {
    const result = await service.find({
      query: {
        _id,
        $limit: 1
      }
    });
    if (result.data <= 0) {
      return undefined;
    }
    return result.data[0];
  },
  async verifSessionList(arrayId, service) {
    let result = [];
    for (const obj of arrayId) {
      let _id = obj.idSession;
      let sessionResult = await service.find({
        query: {
          _id
        }
      });
      if (sessionResult.data <= 0) {
        throw new Error(`Session with id ${_id} does not exist`);
      }
      result = [...result, sessionResult.data[0]._id];
    }

    return result;
  },
  async searchNameArraySessions(arrayId, service) {
    let result = [];
    for (const _id of arrayId) {
      let SessionsResult = await service.find({
        query: {
          _id
        }
      });
      if (SessionsResult.data <= 0) {
        throw new Error(`id ${_id} does not exist`);
      }
      result = [...result, SessionsResult.data[0].name];
    }

    return result;
  } /*,
  async searchExercice(arrayId, service) {
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
      result = [...result, exerciceResult.data[0].name];
    }

    return result;
  }*/
};
