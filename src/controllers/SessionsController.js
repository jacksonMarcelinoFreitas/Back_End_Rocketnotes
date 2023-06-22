class SessionsController{
  async create(request, response){
    const {email, password} = request.body

    return response.json({email, password}); //importante para garantir a parada da execução;
  }
}

module.exports = SessionsController;