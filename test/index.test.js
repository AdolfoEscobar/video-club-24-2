const supertest = require("supertest");

const app = require('../app')

describe("Probar el sistema de autenticacion",()=>{
    it("Deberia de obtener un login con user y password correctos", (done)=>{
        supertest(app).post("/login")
        .send({"email": "test@test.com", "password": "123456"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});