(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = [
  {
    id: 1,
    label: 'Lorem',
    tags: [
      {
        name: 'Segmento',
        value: 'Automotivo',
      },
      {
        name: 'Segmento',
        value: 'Esportivo',
      },
      {
        name: 'Cor preferida',
        value: 'Azul',
      },
      {
        name: 'Cliente em potencial',
        value: null,
      },
    ],
  },
  {
    id: 2,
    label: 'Ipsum',
    tags: [
      {
        name: 'Segmento',
        value: 'Automotivo',
      },
      {
        name: 'Segmento',
        value: 'Financeiro',
      },
      {
        name: 'Cor preferida',
        value: 'Azul',
      },
    ],
  },
  {
    id: 3,
    label: 'Dolor',
    tags: [
      {
        name: 'Segmento',
        value: 'Automotivo',
      },
      {
        name: 'Segmento',
        value: 'Esportivo',
      },
      {
        name: 'Cor preferida',
        value: 'Verde',
      },
    ],
  },
  {
    id: 4,
    label: 'Sit',
    tags: [
      {
        name: 'Segmento',
        value: 'Automotivo',
      },
      {
        name: 'Segmento',
        value: null,
      },
      {
        name: 'Exclusivo',
        value: null,
      },
      {
        name: 'Cor preferida',
        value: 'Verde',
      },
    ],
  },
  {
    id: 5,
    label: 'Amet',
    tags: [
      {
        name: 'Segmento',
        value: 'Automotivo',
      },
      {
        name: 'Segmento',
        value: 'Esportivo',
      },
      {
        name: 'Cor preferida',
        value: 'Azul',
      },
      {
        name: 'Cliente em potencial',
        value: null,
      },
    ],
  },
];

},{}],2:[function(require,module,exports){
const data = require('./data.js');

const parameters = [
  {
    type: 'contain',
    tag: 'Segmento',
    value: 'Esportivo',
  },
  {
    type: 'contain',
    tag: 'Cor preferida',
    value: 'AZUL',
  },
  {
    type: 'not-contain',
    tag: 'Exclusivo',
    value: false,
  },
];

function testIfContain(tag, search) {
  let passedTest = false;

  const T_Name = tag.name ? tag.name.toUpperCase() : '';
  const T_Value = tag.value ? tag.value.toUpperCase() : '';

  const S_Tag = search.tag ? search.tag.toUpperCase() : false;
  const S_Value = search.value ? search.value.toUpperCase() : false;

  // Verifica se foi informado valor da Tag
  if (S_Value) {
    // Só passa se a Tag e o seu Valor forem os específicados
    if (T_Name === S_Tag && T_Value === S_Value) {
      passedTest = true;
    }
  } else {
    // Passa se a Tag tive o Nome já
    if (T_Name === S_Tag) {
      passedTest = true;
    }
  }

  return passedTest;
}

function search(users, search) {
  // Percorre cada usuário
  const test = users.map((u) => {
    const searchResults = [];

    // Percorre as validações
    search.map((s, index) => {
      // contain => o teste sempre falha até que a verificação prove o contrário
      // not-contain => o teste nunca falha, até que a verificação prove o contrário

      let testResult = s.type === 'contain' ? false : true;

      // Percorre cada uma das tags do cliente e realiza os testes
      // Se uma tag passar em um teste, então o teste é considerado sucesso
      // o cliente tem um requisito cumprido
      u.tags.map((t) => {
        if (s.type === 'contain' && testIfContain(t, s)) {
          testResult = true;
        }
        if (s.type === 'not-contain' && testIfContain(t, s)) {
          testResult = false;
        }
      });

      // Adiciona o resultado deste teste a listagem de testes
      searchResults.push(testResult);
    });

    // Verifica se ele passou em todos os testes
    // Se sim, então o usuário pode ser retornado

    let finalResult = true;
    searchResults.map((r) => {
      // Se falhar em um deles, então todo o teste falhou
      if (!r) finalResult = false;
    });

    // Se passou em todas as validações, retorna ele
    return finalResult && u;
  });

  // Remove todos os `falses` do array e retorna
  return test.filter(Boolean);
}

const r = search(data, parameters);
console.log('Busca:');
parameters.map((p) => {
  console.log(`${p.type} Tag: ${p.tag} | Valor: ${p.value}`);
});
console.log('\nResultado:');
console.log(r);

},{"./data.js":1}]},{},[2]);
