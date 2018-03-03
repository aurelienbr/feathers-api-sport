module.exports = {
  async verifEmail(value, service){
    const email = value.toLowerCase();
    const result = await service.find({
      query: {
        email,
        $limit: 0
      }
    });
<<<<<<< HEAD:src/tools/service-users.js
=======

>>>>>>> 1efde1e7328ec7c1b8137db9a39370d245f2cf2a:src/tools/email.js
    if(result.total > 0) {
      return false;
    }
    return true;
  }
};
