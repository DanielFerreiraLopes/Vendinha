# Vendinha
<h3>Cenário:</h3>
Uma vendinha precisa informatizar o controle de contas de seus clientes (dívidas penduradas)
para facilitar a busca e o cadastro desses dados que antes eram feitas por papel. O cliente chega
na loja, faz a compra e pede para o atendente pendurar para que seja acertado no final do mês.
<p></p>
Pensando nisso, é necessário criar um sistema simples de cadastro para que o dono da venda
consiga controlar as dívidas de seus clientes.

<h3>Sistema Vendinha:</h3>
O sistema da vendinha é um sistema que possibilita realizar um CRUD dos clientes e registrar as dividas dos cliente atravez de uma API, o sistema foi desenvolvido em Asp.NET usando a liguagem C#, foi usado HTML, CSS e JavaScript juntamente com React para construção da interfaçe do sistema, foi usado PostgreSQL no para construir o banco de dados e o FrameWork NHibernate para a persistencia dos dados no banco de dados.

<h3>Como Executar a Aplicação</h3>
Para executar a API este projeto estarei usando Visual Studio 2022 na estrutura NET 8.0 e o Visual Studio Code para mexer no Front e executar a aplicação.</br>
<p></p>
Os Script do Banco de Dados está "Vendinha\Vendinha\databese-schema.sql";</br>
E os dados para acessar o banco de dados então "Vendinha\Vendinha\hibernate.cfg.xml";</br>
Caso queira alterar
<p></p>
Usando os dados padrão que estão no projeto você deve criar uma conexão(Em PostgreSQL) com:</br>
host: 127.0.0.1,</br>
porta: 5432(porta padrão),</br>
usuário: postgres(usuário padrão);</br>
<p></p>
Então crie um banco de dados com o nome "vendinha", crie uma role do banco com a senha "123456" e então execute o Script no banco de dados da vendinha, o Script esta em "Vendinha\Vendinha\databese-schema.sql"
<p></p>
<p></p>
No Visual Studio abra a solução do projeto Vendinha.sln</br>
Abra o Gerenciador de Pacoter do NuGet do Projeto e verifique se os pacotes "NHibernate" e "Npgsql" estão instalado, caso não instale os pacotes , além disso verifique se existe a referencia de projeto em Vendinha.Api referenciando Vendinha</br>
Execute o projeto da Vendinha.Api e verifique se a API esta sendo executada(a API é executada na porta 7233), caso não estiver revise os passo anteriores e a conexão do banco em "Vendinha\Vendinha\hibernate.cfg.xml".</br>
<p></p>
<p></p>
No Visual Studio Code</br>
Abra a pasta "VendinhaReact", então abra o terminal e execute os comandos para baixar as bibliotecas do projeto:</br>
"npm i express" //Para download do Node js.</br>
"npm i simple-react-routing" //Para melhorar navegação do usuário em não precisar atualizar a tela o tempo todo.</br>
<p></p>
Agora para executar o projeto dê o comando "npm run dev" no terminal e abra o projeto em http://localhost:5173/





