razermodule.exports = {
  async existExercice(_id, service){
    const result = await service.find({
      query: {
        _id,
        $limit: 0
      }
    });

    if(result.total > 0) {
      return true;
    }
    return false;
  }
};
