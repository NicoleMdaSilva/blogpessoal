import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuários e Auth (e2e)', () => {
  let token: any;
  let usuarioID: any; //any não dev ser utilizado
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_blogpessoal_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false, //Não vai mostrar log do banco
          dropSchema: true //Ele vai dizer que nosso schema vai ser apagado
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();


  });
  afterAll(async () => {
    await app.close()
  });

  it('01 - Deve Cadastrar Usuario', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuario/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ''
      });
    expect(HttpStatus.CREATED)

    usuarioID = resposta.body.id
  }) //Escreve sempre pra leitura ser facilitada

  it('02 - Deve Autentificar Usuario (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/auth/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot'
      });
    expect(HttpStatus.OK)

    token = resposta.body.token;
  });

  it('03 - Não Deve Duplicar o Usuario', async () =>{
    request(app.getHttpServer())
    .post('/usuario/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ''
    })
    expect(HttpStatus.BAD_REQUEST);
  });

  it('04 - Deve listar todos os Usuarios', async () =>{
    request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
    expect(HttpStatus.OK)
  });

  it('05 - Deve Atualizar um Usuário', async () =>{
    request(app.getHttpServer())
    .put('/usuario/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioID,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ''
    })
    .then(resposta => {
      expect('Root Atualizado').toEqual(resposta.body.name)
    }) //Ele vai receber as informações do request
    expect(HttpStatus.OK)
  });
});
