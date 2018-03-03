module.exports = {
  async verifEmail(value, service){
    const email = value.toLowerCase();
    const result = await service.find({
      query: {
        email,
        $limit: 0
      }
    });
    if(result.total > 0) {
      return false;
    }
    return true;
  }
};
