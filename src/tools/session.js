module.exports = {
  async existSession(ownerId, name, service){
    const result = await service.find({
      query: {
        ownerId,
        name,
        $limit: 0
      }
    });

    if(result.total > 0) {
      return false;
    }
    return true;
  }


};
