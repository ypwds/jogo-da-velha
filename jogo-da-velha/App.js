import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function App() {

  //Constante usado para alterar as telas do jogo
  const [tela, setTela] = useState('menu');

  //Constante para tela de jogo
  const [jogadorAtual, setJogadorAtual] = useState('');

  //Tabuleiro - Matrix 3x3
  const [tabuleiro, setTabuleiro] = useState([]);

  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;

    //Usando o operador eliptico para garantir o dados do tabuleiro sejam passado para o array
    setTabuleiro([...tabuleiro]);

    //Mudando o jogador atual
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');

    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    //Verificando linhas
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }

    //Verificando colunas
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    //Verificando diagonal 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }

    //Verificando diagonal 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2]);
    }

    //Nenhum ganhador
    if ((jogadasRestantes - 1) === 0) {
      return finalizarJogo('');
    }

    //Jogo ainda não finalizou
    setJogadasRestantes((jogadasRestantes - 1));
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');

  }

  //Chamada das telas
  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  //Criando as funções das telas que serão chamadas
  //Tela de menu
  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Image
          style={styles.logo}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3443/3443191.png',
          }}
        />

        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>

        <View style={styles.inLineItems}>
          {/* Criar uma interface/view clicável */}
          <TouchableOpacity style={styles.boxJogador} onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxJogador} onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //Tela de Jogar
  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>

        {/* Criando o tabuleiro do jogo*/}
        {
          tabuleiro.map((linha, numLinha) => {
            return (
              <View key={numLinha} style={styles.inLineItems}>
                {
                  linha.map((coluna, numColuna) => {
                    return (
                      <TouchableOpacity
                        key={numColuna}
                        style={styles.boxJogador}
                        onPress={() => jogar(numLinha, numColuna)}
                        disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            );
          })
        }

        <TouchableOpacity style={styles.btnMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBtnMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>

      </View>
    );
  }

  //Tela do ganhador
  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Resultado final</Text>

        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Nenhum ganhador!!!</Text>
        }
        {
          ganhador !== '' &&
          <View style={styles.boxJogador}>
            <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
          </View>
        }

        <TouchableOpacity style={styles.btnMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBtnMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 20,
    color: '#555',
    marginTop: 20,
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    //React usa alinhamento Flex
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  jogadorX: {
    fontSize: 40,
    color: '#553fda',
  },
  jogadorO: {
    fontSize: 40,
    color: '#da3f3f'
  },
  inLineItems: {
    flexDirection: 'row'
  },
  btnMenu: {
    marginTop: 20
  },
  textoBtnMenu: {
    color: '#4e6fe4'
  },
  ganhador: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333'
  },
  logo: {
    width: 100,
    height: 100,
  }
});
