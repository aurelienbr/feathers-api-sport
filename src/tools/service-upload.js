module.exports = {
  async uploadImage(uri, service) {
    // TODO verif here image upload
    let result = await service.create({
      uri
    });
    if (result) {
      return result;
    }
    return undefined;
  }
  // TODO add here video etc...
};
