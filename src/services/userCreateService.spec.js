const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const AppError = require('../utils/AppError');

describe("UserCreatedService", ()=> {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  //antes de cada teste será inicializado
  beforeEach(()=>{
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  })



  it("user should be create", async () => {
    const user = {
      name: "User Test",
      email: "user@email.com",
      password: "123"
    };

    const userCreated = await userCreateService.execute(user);

    console.log(userCreated);
    expect(userCreated).toHaveProperty("id");

  });

  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "User test 1",
      password: "1234",
      email: "user@gmail.com",
    }
    const user2 = {
      name: "User test 2",
      password: "12345",
      email: "user@gmail.com",
    }

    await userCreateService.execute(user1);
    expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso."));

  });

});

//os testes devem ser realizados independente de serviços externos, como bancos, apis e etc.
//mock - simulação de um objeto ou dependência de forma manual para que haja independencia durante os testes.
//testes com jest