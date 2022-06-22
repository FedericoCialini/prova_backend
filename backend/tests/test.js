const supertest = require("supertest");
const app = require("../index");
const pool = require("../config/db-config");

let insertedIdJob;
let insertedIdProject

beforeAll(async ()=>{
    const [project_res,] = await pool.query("INSERT INTO projects(title) VALUES (?)",["TEST"])
    insertedIdProject = project_res.insertId;
    const [result,] = await pool.query("INSERT INTO jobs (creationDate,price,status,project_id) VALUES(?,?,?,?)",[new Date(),999.999,'cancelled',insertedIdProject]);
    insertedIdJob = result.insertId;
})

afterAll(async ()=>{
    await pool.query("DELETE FROM jobs");
    await pool.query("DELETE FROM projects");
})



describe("Add a job",()=>{
    describe("When is valid",()=>{
        test("Job correctly added",async ()=>{
            const res = await  supertest(app)
                .post(`/api/jobs/${insertedIdProject}`)
                .send({price:40,status:'in progress'});
            expect(res.body.price).toBe(40);
            expect(res.body.status).toBe('in progress');
        });
    });
    describe("When is invalid",()=>{
        test("Price not valid",async ()=>{
            const res = await supertest(app)
                .post(`/api/jobs/${insertedIdJob}`)
                .send({price:"two dollars",status:"delivered"});
            expect(res.body.message).toBe("Price error")
            expect(res.statusCode).toBe(400);

        });
        test("Price missing",async ()=>{
            const res = await supertest(app)
                .post(`/api/jobs/${insertedIdJob}`)
                .send({status:"delivered"});
            expect(res.body.message).toBe("Price error")
            expect(res.statusCode).toBe(400);

        });
        test("Status not valid",async ()=>{
            const res = await supertest(app)
                .post(`/api/jobs/${insertedIdJob}`)
                .send({price:40,status:"wrong status"});
            expect(res.body.message).toBe("Status error");
            expect(res.statusCode).toBe(400);
        });
        test("Status missing",async ()=>{
            const res = await supertest(app)
                .post(`/api/jobs/${insertedIdJob}`)
                .send({price:40});
            expect(res.body.message).toBe("Status error");
            expect(res.statusCode).toBe(400);
        })
    });
})

describe('Update a job',()=>{
    describe("When is valid",()=>{
        test("Job correctly updated",async ()=>{
            const res = await supertest(app)
                        .patch(`/api/jobs/${insertedIdJob}`)
                        .send({price:40,status:"delivered"});
            expect(res.body.status).toBe('delivered');
            expect(res.body.price).toBe(40);
        });
    })
    describe("When is invalid",()=>{
        test("Price not valid",async ()=>{
            const res = await supertest(app)
                .patch(`/api/jobs/${insertedIdJob}`)
                .send({price:"two dollars",status:"delivered"});
            expect(res.body.message).toBe("Price error")
            expect(res.statusCode).toBe(400);

        });
       test("Price missing",async ()=>{
           const res = await supertest(app)
               .patch(`/api/jobs/${insertedIdJob}`)
               .send({status:"delivered"});
           expect(res.body.message).toBe("Price error")
           expect(res.statusCode).toBe(400);

       });
       test("Status not valid",async ()=>{
           const res = await supertest(app)
                        .patch(`/api/jobs/${insertedIdJob}`)
                        .send({price:40,status:"wrong status"});
           expect(res.body.message).toBe("Status error");
           expect(res.statusCode).toBe(400);
       });
       test("Status missing",async ()=>{
           const res = await supertest(app)
               .patch(`/api/jobs/${insertedIdJob}`)
               .send({price:40});
           expect(res.body.message).toBe("Status error");
           expect(res.statusCode).toBe(400);
       })
    });
})

describe('Add a job',()=>{
   describe("When is added",()=>{
          test("project added",async ()=>{
              const res = await supertest(app).post("/api/projects").send({title:"titolo",jobs:[{
                      price : 9.5,
                      status: 'cancelled'
                  }]});
              expect(res.statusCode).toBe(200);
              expect(res.body.jobs).toHaveLength(1);
              expect(res.body.title).toBe("titolo");
          });
   });
   describe("When is invalid",()=>{
      test("title is empty",async ()=>{
          const res = await supertest(app).post("/api/projects").send({title:"",jobs:[{
                  price : 9.5,
                  status : "in progress"
              }]});
          expect(res.statusCode).toBe(400);
      }) ;
      test("title not added",async ()=>{
          const res = await supertest(app).post("/api/projects").send({jobs:[{
                  price : 9.5,
                  status : "in progress"
              }]});
          expect(res.statusCode).toBe(400);
      }) ;
      test("jobs not added",async ()=>{
          const res = await supertest(app).post("/api/projects").send({title:"titolo"});
          expect(res.body.jobs).toBeUndefined()
          expect(res.statusCode).toBe(400);
      }) ;
      test("jobs invalid",async ()=>{
          const res = await supertest(app).post("/api/projects").send({title:"titolo",jobs:[{
                  status : "in progress"
              }]});
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe("An invalid Job was sent");
      }) ;
   });
});