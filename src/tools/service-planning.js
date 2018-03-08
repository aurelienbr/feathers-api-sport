module.exports = {
  async verifPlanning(ownerId, service) {
    const name = value.toLowerCase();
    const result = await service.find({
      query: {
        ownerId,
        $limit: 0
      }
    });
    if (result.total > 0) {
      throw new Error('User already got a planning');
    }
    return true;
  }
};
