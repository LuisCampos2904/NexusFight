const enviarPontuacao = (pontuacao) => {
  const url = 'http://localhost:3000/api/pontuacao';
  const dadosPontuacao = {
    nomeJogador: 'Aleatório',
    pontuacao: pontuacao,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosPontuacao)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Pontuação enviada com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao enviar pontuação', error);
  });
};

const pontuacaoAtual = 1000;
enviarPontuacao(pontuacaoAtual);

const buscarPontuacoes = () => {
  const url = 'http://localhost:3000/api/pontos';

  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('Pontuações:', data);
  })
  .catch(error => {
    console.error('Erro ao buscar pontuações:', error);
  });
};

buscarPontuacoes();

class BaseFase extends Phaser.Scene {
  constructor(key) {
    super({
      key
    });
  }
}

// PreIntroducao

class PreIntroducao extends BaseFase {
  constructor() {
    super('PreIntroducao');
  }

  preload() {
    this.load.image('fundoPreto', 'assets/fundoPreto.jpg');
    this.load.spritesheet('player1', 'assets/karhnaRun.png', {
      frameWidth: 80,
      frameHeight: 80
    });
  }

  create() {
    this.fundoPreto = this.add.image(config.width / 2, config.height / 2, 'fundoPreto').setScale(2.0, 2.0);
    this.textStartgame = this.add.text(20, 100, 'Karhna é um jovem guerreiro que decidiu se aventurar numa importante missão.', {
        fontSize: '18px',
        fill: '#FFFFFF'
      })
    this.textStartgame2 = this.add.text(20, 120, 'Para ganhar 10.000 moedas de ouro, o mesmo aceitou ir até o', {
        fontSize: '18px',
        fill: '#FFFFFF'
      })
    this.textStartgame3 = this.add.text(20, 140, 'esconderijo onde residem 1 assassino e 2 formidáveis cavaleiros, para tirar', {
        fontSize: '18px',
        fill: '#FFFFFF'
      })
    this.textStartgame4 = this.add.text(20, 160, 'suas vidas. A pessoa que o encubiu desta missão foi uma senhora chamada Carmen,', {
        fontSize: '18px',
        fill: '#FFFFFF'
      })
    this.textStartgame5 = this.add.text(20, 180, 'e seus objetivos..., seria bom que o guerreiro tivesse perguntado...', {
        fontSize: '18px',
        fill: '#FFFFFF'
      })
    this.textStartgame6 = this.add.text(20, 200, '(tecle [->] para avançar)', {
        fontSize: '18px',
        fill: '#FFFF00'
      })

    var player1 = this.physics.add.sprite(config.width/2, config.height/2, 'player1').setScale(3, 3);
    player1.setCollideWorldBounds(true);

    this.anims.create({
      key: 'parado',
      frames: [{
        key: 'player1',
        frame: 4
      }],
      frameRate: 20
    });
    this.anims.create({
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'direita',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 5,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });

    this.player1 = player1;

    this.physics.add.collider(player1, this.background);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    var player1 = this.player1;
    player1.anims.play('direita', true);
    player1.flipX = false;
    player1.setVelocityY(-6.75);  
    
    if(this.cursors.right.isDown){
      this.scene.start('Fase1');
    }

  }

}

// Introducao

class Introducao extends BaseFase {
  constructor() {
    super('Introducao');
  }

  preload() {
    this.load.image('fundoPreto', 'assets/fundoPreto.jpg');
    this.load.image('cenario1', 'assets/EntradaMasmorra.jpg');
    this.load.spritesheet('player1', 'assets/karhnaRun.png', {
      frameWidth: 80,
      frameHeight: 80
    });
  }

  create() {
    
    this.background = this.add.image(config.width / 2, config.height / 2, 'cenario1').setScale(1.3, 1.3);

    var player1 = this.physics.add.sprite(200, config.height, 'player1').setScale(3, 3);
    player1.setCollideWorldBounds(true);

    this.fundoPreto = this.add.image(config.width / 2, 20, 'fundoPreto').setScale(2.0, 0.1);
    this.textObjetivo = this.add.text(20, 17, 'Objetivo: entrar no esconderijo, matar todos e ir embora.', {
        fontSize: '25px',
        fill: '#FFFF00'
      })
    .setShadow(0,0,'#000',1);

    this.anims.create({
      key: 'parado',
      frames: [{
        key: 'player1',
        frame: 4
      }],
      frameRate: 20
    });
    this.anims.create({
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'direita',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 5,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });

    this.player1 = player1;

    this.physics.add.collider(player1, this.background);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    var player1 = this.player1;
    var background = this.background;

    if (this.cursors.left.isDown) {
      player1.setVelocityX(-160);
      player1.anims.play('esquerda', true);
      player1.flipX = true;
    } else if (this.cursors.right.isDown) {
      player1.setVelocityX(160);
      player1.anims.play('direita', true);
      player1.flipX = false;
    } else {
      player1.setVelocityX(0);
      player1.anims.play('parado');
    }
    
    if (player1.x >= (config.width / 2) - 50) {
      this.scene.start('Fase1');
    }
  }

}

///////////////////////////////////////////////////////////////////////

// FASE 1

class Fase1 extends BaseFase {
  constructor() {
    super('Fase1');
  }

  preload() {
    this.load.spritesheet('hp', 'assets/hp.png', {
      frameWidth: 300,
      frameHeight: 300
    });
    this.load.spritesheet('hp2', 'assets/hp.png', {
      frameWidth: 300,
      frameHeight: 300
    });

    this.load.image('round1', 'assets/round1.png');
    this.load.spritesheet('player1', 'assets/karhnaRun.png', {
      frameWidth: 80,
      frameHeight: 80
    });
    this.load.spritesheet('karhnaAttack', 'assets/karhnaAttack.png', {
      frameWidth: 96,
      frameHeight: 80
    });
    this.load.spritesheet('karhnaJump1', 'assets/karhnaJumpStart.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('karhnaJump2', 'assets/karhnaJumpEnd.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('karhnaJumpAll', 'assets/player1JumpAll.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('boss1', 'assets/mago1Walk.png', {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet('boss1Dead', 'assets/mago1Dead.png', {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet('player1Dead', 'assets/player1Dead.png', {
      frameWidth: 80,
      frameHeight: 64
    });
    this.load.spritesheet('boss1golpe', 'assets/boss1golpe.png', {
      frameWidth: 128,
      frameHeight: 128
    });
  }



  create() {

    this.add.image(config.width / 2, config.height / 2, 'round1').setScale(1.1, 1.3);

    var hp = this.add.sprite(100, config.height - 550, 'hp').setScale(0.25, 0.25);
    this.hp = hp;

    var hp2 = this.add.sprite(800, config.height - 550, 'hp2').setScale(0.25, 0.25);
    this.hp2 = hp2;

    var boss1 = this.physics.add.sprite(config.width - 100, config.height, 'boss1').setScale(2.2, 2.2);
    boss1.setCollideWorldBounds(true);
    boss1.body.immovable = true;
    boss1.setSize(15, 80);
    boss1.setOffset(60, 60);
    this.boss1 = boss1;
    //boss1.setInteractive(); //deixa o elemento "clicável"

    var player1 = this.physics.add.sprite(200, config.height, 'player1').setScale(2, 2);
    player1.setCollideWorldBounds(true);
    player1.setSize(25, 80);
    player1.setOffset(32, 0);
    this.player1 = player1;
    //player1.body.immovable = true;

    this.physics.add.collider(player1, boss1);

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Definição dos HPs, Nomes e Timer
    this.hpPlayer = 500;
    this.textHpPlayer = this.add.text(40, 100, 'HP: ' + this.hpPlayer, {
      fontSize: '30px',
      fill: '#ffffff'
    })
    this.textNomePlayer = this.add.text(320, 50, 'Player1 VS', {
      fontSize: '30px',
      fill: '#FFFF00'
    })
    this.hpBoss = 500;
    this.textHpBoss = this.add.text(740, 100, 'HP: ' + this.hpBoss, {
      fontSize: '30px',
      fill: '#ffffff'
    })
    this.textNomeBoss = this.add.text(520, 50, 'Boss1', {
      fontSize: '30px',
      fill: '#FFFF00'
    })
    this.timer = 60;
    this.textTimer = this.add.text(360, 90, 'Tempo Restante: ' + this.timer, {
      fontSize: '20px',
      fill: '#ffffff'
    })

    //Animações do Player
    this.anims.create({
      key: 'parado',
      frames: [{
        key: 'player1',
        frame: 4
      }],
      frameRate: 20
    });
    this.anims.create({
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'direita',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 5,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'cima',
      frames: this.anims.generateFrameNumbers('karhnaJumpAll', {
        start: 0,
        end: 14
      }),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'baixo',
      frames: this.anims.generateFrameNumbers('karhnaJump2', {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'agachar',
      frames: this.anims.generateFrameNumbers('karhnaJump1', {
        start: 0,
        end: 0
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'ataque',
      frames: this.anims.generateFrameNumbers('karhnaAttack', {
        start: 0,
        end: 7
      }),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'morte',
      frames: this.anims.generateFrameNumbers('player1Dead', {
        start: 0,
        end: 7
      }),
      frameRate: 5,
      repeat: 0
    });

    //Animações do Boss
    this.anims.create({
      key: 'parado2',
      frames: [{
        key: 'boss1',
        frame: 0
      }],
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'direita2',
      frames: this.anims.generateFrameNumbers('boss1', {
        start: 0,
        end: 5
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'esquerda2',
      frames: this.anims.generateFrameNumbers('boss1', {
        start: 0,
        end: 5
      }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'boss1Morte',
      frames: this.anims.generateFrameNumbers('boss1Dead', {
        start: 0,
        end: 0
      }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'boss1golpe',
      frames: this.anims.generateFrameNumbers('boss1golpe', {
        start: 0,
        end: 1
      }),
      frameRate: 7,
      repeat: -1
    });

    //Animações da HealthBar
    this.anims.create({
      key: 'dano',
      frames: this.anims.generateFrameNumbers('hp', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: 0
    });
    this.anims.create({
      key: 'dano2',
      frames: this.anims.generateFrameNumbers('hp2', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: 0
    });

  }

  update() {

    let cursors = this.input.keyboard.createCursorKeys();

    var player1 = this.player1;
    var boss1 = this.boss1;
    var hp = this.hp;
    var hp2 = this.hp2;
    this.timer = this.timer - 0.02;
    if ((this.hpBoss >= 1) && (this.hpPlayer >= 1) && (this.timer >= 0.5)) {
      this.textTimer.setText('Tempo Restante: ' + parseInt(this.timer, 10));
    }

    //condições de ressurreição
    if (((this.hpPlayer <= 1) || (this.timer <= 0)) && (this.hpBoss > 1)) {
      this.textGameOver = this.add.text(310, config.height / 2 - 50, 'GAME OVER', {
        fontSize: '60px',
        fill: '#FF0000'
      })
      this.textReturn = this.add.text(290, 310, '(Tecle ↑ para tentar novamente)', {
        fontSize: '20px',
        fill: '#FFFF00'
      })
    }
    if (((this.hpPlayer <= 1) || (this.timer <= 0)) && (cursors.up.isDown) && (this.hpBoss > 1)) {
      this.scene.start('Introducao');
    }

    //condições de saída
    if ((player1.body.x >= config.width - 200) && (this.hpBoss <= 0)) {
      this.textSaida = this.add.text(630, 410, 'Tecle ↑ para subir.', {
        fontSize: '20px',
        fill: '#FFFF00'
      })
    }
    if ((player1.body.x >= config.width - 200) && (this.hpBoss <= 0) && (cursors.up.isDown)) {
      this.scene.start('Fase2');
    }

    //Condições de Dano no Player
    if ((this.timer < 1) && (this.timer >= 0.9) && (this.hpBoss >= 1) && (this.hpPlayer >= 1)) {
      hp.anims.play('dano', true);
      boss1.setVelocity(0, 0);
      boss1.anims.play('parado2', true);
      player1.setVelocity(0, 0);
      player1.body.immovable = true;
      player1.anims.play('morte', true);
      player1.setSize(60, 80);
      player1.setOffset(10, -20);
      this.textHpPlayer.setText('HP: ' + this.hpPlayer * 0);
    }
    if ((player1.body.x > (boss1.body.x - 90)) && (player1.body.x < (boss1.body.x + 75)) && (cursors.down.isUp) && (boss1.body.x < config.width / 2) && (this.timer >= 1) && (this.hpBoss > 0)) {
      this.hpPlayer = this.hpPlayer - 5;
      if (this.hpPlayer >= 0) {
        this.textHpPlayer.setText('HP: ' + this.hpPlayer);
      }
      if (this.hpPlayer == 0) {
        hp.anims.play('dano', true);
        boss1.setVelocity(0, 0);
        boss1.anims.play('parado2', true);
        player1.setVelocity(0, 0);
        player1.body.immovable = true;
        player1.anims.play('morte', true);
        player1.setSize(60, 80);
        player1.setOffset(10, -20);
      }
    }
    //Condições de Dano no Boss  
    if ((player1.body.x > (boss1.body.x - 75)) && (player1.body.x < (boss1.body.x + 75)) && (this.space.isDown) && (player1.body.y > 435) && (cursors.down.isUp) && (cursors.up.isUp)) {
      this.hpBoss = this.hpBoss - 1;
      if (this.hpBoss >= 0) {
        this.textHpBoss.setText('HP: ' + this.hpBoss);
      }
      if (this.hpBoss == 0) {
        hp2.anims.play('dano2', true);
        boss1.setVelocity(0, 0);
        boss1.anims.play('boss1Morte', true);
        boss1.setSize(60, -2);
        boss1.setOffset(35, 143);
      }
    }

    //Condições do Player
    console.log(player1.body.y);
    if ((this.hpPlayer > 0) && ((this.timer > 1) || (this.hpBoss <= 0))) {
      if ((cursors.left.isDown) && (cursors.down.isDown) && (this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.right.isDown) && (cursors.down.isDown) && (this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.left.isDown) && (cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.right.isDown) && (cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.left.isDown) && (this.space.isDown) && (cursors.down.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((cursors.right.isDown) && (this.space.isDown) && (cursors.down.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((cursors.left.isDown) && (cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.right.isDown) && (cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.left.isDown) && (cursors.up.isUp) && (this.space.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('esquerda', true);
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      } else if ((cursors.right.isDown) && (cursors.up.isUp) && (this.space.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('direita', true);
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      } else if ((cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.down.isDown) && (player1.body.y < 410)) {
        player1.setVelocityY(+200);
        player1.anims.play('baixo', true);
      } else if ((this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((player1.body.y > 435) || (player1.body.touching.down)) {
        player1.setVelocityX(0);
        player1.anims.play('parado');
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      }
    }
    //Condições do Boss
    if ((this.hpBoss > 0) && (this.hpPlayer > 0) && (this.timer >= 1)) {
      if (boss1.body.x < player1.body.x) {
        boss1.flipX = true;
      }
      if (boss1.body.x > player1.body.x) {
        boss1.flipX = false;
      }
      if (boss1.body.x > (config.width - 150)) {
        boss1.setVelocity(-100, 0).setBounce(1, 0);
        boss1.anims.play('esquerda2', true);
        boss1.setSize(15, 80);
        boss1.setOffset(60, 60);
      }
      if (boss1.body.x < config.width - 780) {
        boss1.setVelocity(100, 0).setBounce(1, 0);
        boss1.anims.play('direita2', true);
        boss1.setSize(15, 80);
        boss1.setOffset(60, 60);
      }
      if (boss1.body.x < config.width / 2) {
        boss1.anims.play('boss1golpe', true);
      }
      if (boss1.body.x > config.width / 2) {
        boss1.anims.play('esquerda2', true);
        boss1.setSize(15, 80);
        boss1.setOffset(60, 60);
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////

// FASE 2

class Fase2 extends BaseFase {
  constructor() {
    super('Fase2');
  }
  preload() {
    this.load.spritesheet('hp', 'assets/hp.png', {
      frameWidth: 300,
      frameHeight: 300
    });
    this.load.spritesheet('hp2', 'assets/hp.png', {
      frameWidth: 300,
      frameHeight: 300
    });

    this.load.image('round1', 'assets/round1.png');
    this.load.spritesheet('player1', 'assets/karhnaRun.png', {
      frameWidth: 80,
      frameHeight: 80
    });
    this.load.spritesheet('karhnaAttack', 'assets/karhnaAttack.png', {
      frameWidth: 96,
      frameHeight: 80
    });
    this.load.spritesheet('karhnaJump1', 'assets/karhnaJumpStart.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('karhnaJump2', 'assets/karhnaJumpEnd.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('karhnaJumpAll', 'assets/player1JumpAll.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('boss2', 'assets/boss2walk.png', {
      frameWidth: 78,
      frameHeight: 86
    });
    this.load.spritesheet('boss2Dead', 'NexusFight/Personagens/Cavaleiros/Knight_1/Dead.png', {
      frameWidth: 80,
      frameHeight: 86
    });
    this.load.spritesheet('player1Dead', 'assets/player1Dead.png', {
      frameWidth: 80,
      frameHeight: 64
    });
    this.load.spritesheet('boss2golpe', 'NexusFight/Personagens/Cavaleiros/Knight_1/Attack 1.png', {
      frameWidth: 84,
      frameHeight: 86
    });
    this.load.spritesheet('boss2golpe2', 'NexusFight/Personagens/Cavaleiros/Knight_1/Attack 3.png', {
      frameWidth: 101,
      frameHeight: 86
    });
  }

  create() {

    this.add.image(config.width / 2, config.height / 2, 'round1').setScale(1.1, 1.3);

    var hp = this.add.sprite(100, config.height - 550, 'hp').setScale(0.25, 0.25);
    this.hp = hp;

    var hp2 = this.add.sprite(800, config.height - 550, 'hp2').setScale(0.25, 0.25);
    this.hp2 = hp2;

    var boss1 = this.physics.add.sprite(config.width - 100, config.height, 'boss2').setScale(2.2, 2.2);
    boss1.setCollideWorldBounds(true);
    boss1.body.immovable = true;
    boss1.setSize(15, 80);
    boss1.setOffset(0, 0);
    this.boss1 = boss1;
    //boss1.setInteractive(); //deixa o elemento "clicável"

    var player1 = this.physics.add.sprite(200, config.height, 'player1').setScale(2, 2);
    player1.setCollideWorldBounds(true);
    player1.setSize(25, 80);
    player1.setOffset(32, 0);
    this.player1 = player1;
    //player1.body.immovable = true;

    this.physics.add.collider(player1, boss1);

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Definição dos HPs, Nomes e Timer
    this.hpPlayer = 1000;
    this.textHpPlayer = this.add.text(40, 100, 'HP: ' + this.hpPlayer, {
      fontSize: '30px',
      fill: '#ffffff'
    })
    this.textNomePlayer = this.add.text(320, 50, 'Player1 VS', {
      fontSize: '30px',
      fill: '#FFFF00'
    })
    this.hpBoss = 1250;
    this.textHpBoss = this.add.text(740, 100, 'HP: ' + this.hpBoss, {
      fontSize: '30px',
      fill: '#ffffff'
    })
    this.textNomeBoss = this.add.text(520, 50, 'Boss2', {
      fontSize: '30px',
      fill: '#FFFF00'
    })
    this.timer = 60;
    this.textTimer = this.add.text(360, 90, 'Tempo Restante: ' + this.timer, {
      fontSize: '20px',
      fill: '#ffffff'
    })

    //Animações do Player
    this.anims.create({
      key: 'parado',
      frames: [{
        key: 'player1',
        frame: 4
      }],
      frameRate: 20
    });
    this.anims.create({
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'direita',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 5,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'cima',
      frames: this.anims.generateFrameNumbers('karhnaJumpAll', {
        start: 0,
        end: 14
      }),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'baixo',
      frames: this.anims.generateFrameNumbers('karhnaJump2', {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'agachar',
      frames: this.anims.generateFrameNumbers('karhnaJump1', {
        start: 0,
        end: 0
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'ataque',
      frames: this.anims.generateFrameNumbers('karhnaAttack', {
        start: 0,
        end: 7
      }),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'morte',
      frames: this.anims.generateFrameNumbers('player1Dead', {
        start: 0,
        end: 7
      }),
      frameRate: 5,
      repeat: 0
    });

    //Animações do Boss
    this.anims.create({
      key: 'paradoB2',
      frames: [{
        key: 'boss2',
        frame: 0
      }],
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'direitaB2',
      frames: this.anims.generateFrameNumbers('boss2', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'esquerdaB2',
      frames: this.anims.generateFrameNumbers('boss2', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'morteB2',
      frames: this.anims.generateFrameNumbers('boss2Dead', {
        start: 0,
        end: 5
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'golpeB2',
      frames: this.anims.generateFrameNumbers('boss2golpe', {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'golpeB2.2',
      frames: this.anims.generateFrameNumbers('boss2golpe2', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    //Animações da HealthBar
    this.anims.create({
      key: 'dano',
      frames: this.anims.generateFrameNumbers('hp', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: 0
    });
    this.anims.create({
      key: 'dano2',
      frames: this.anims.generateFrameNumbers('hp2', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: 0
    });

    this.unic = 0;
  }

  update() {

    let cursors = this.input.keyboard.createCursorKeys();

    var player1 = this.player1;
    var boss1 = this.boss1;
    var hp = this.hp;
    var hp2 = this.hp2;

    //Condições do Tempo e Random
    this.timer = this.timer - 0.02;
    if ((this.hpBoss > 0) && (this.hpPlayer > 0) && (this.timer >= 0)) {
      this.textTimer.setText('Tempo Restante: ' + parseInt(this.timer, 10));
      this.random = parseInt((this.timer % 10) + 1, 10);
    }
    else {
      this.random = 11;
    }

    //Condições de ressurreição
    if (((this.hpPlayer <= 0) || (this.timer <= 0)) && (this.hpBoss > 0)) {
      this.textGameOver = this.add.text(310, config.height / 2 - 50, 'GAME OVER', {
        fontSize: '60px',
        fill: '#FF0000'
      })
      this.textReturn = this.add.text(290, 310, '(Tecle ↑ para tentar novamente)', {
        fontSize: '20px',
        fill: '#FFFF00'
      })
    }
    if (((this.hpPlayer <= 0) || (this.timer <= 0)) && (cursors.up.isDown) && (this.hpBoss > 0)) {
      this.scene.start('Introducao');
    }

    //Condições de saída
    if ((player1.body.x >= config.width - 200) && (this.hpBoss <= 0)) {
      this.textSaida = this.add.text(630, 410, 'Tecle ↑ para subir.', {
        fontSize: '20px',
        fill: '#FFFF00'
      })
    }
    if ((player1.body.x >= config.width - 200) && (this.hpBoss <= 0) && (cursors.up.isDown)) {
      this.scene.start('Fase3');
    }

    //Condições de Dano no Player
    //Tempo esgotado
    if ((this.timer < 1) && (this.timer >= 0.9) && (this.hpBoss >= 1) && (this.hpPlayer >= 1)) {
      this.hpPlayer = this.hpPlayer * 0;
      this.textTimer.setText('Tempo Restante: 0');
    }
    //Vida esgotada
    if (this.hpPlayer >= 1) {
      this.textHpPlayer.setText('HP: ' + this.hpPlayer);
    }
    if ((this.hpPlayer < 1) && (this.unic == 0)) {
      this.textHpPlayer.setText('HP: 0');
      hp.anims.play('dano', true);
      boss1.setVelocity(0, 0);
      boss1.anims.play('paradoB2', true);
      player1.setVelocity(0, 0);
      player1.body.immovable = true;
      player1.anims.play('morte', true);
      player1.setOffset(10, -20);
      this.unic = 1;
    }
    //Boss 2 - Golpe 1
    if ((player1.body.x > (boss1.body.x - 90)) && (player1.body.x < (boss1.body.x + 75)) && ((this.random <= 6) && (this.random > 3)) && (this.timer >= 1) && (this.hpBoss >= 1)) {
      this.hpPlayer = this.hpPlayer - 1;
    }
    //Boss 2 - Golpe 2
    if ((player1.body.x > (boss1.body.x - 90)) && (player1.body.x < (boss1.body.x + 75)) && (cursors.down.isUp) && ((this.random <= 3) && (this.random > 0)) && (this.timer >= 1) && (this.hpBoss >= 1)) {
      this.hpPlayer = this.hpPlayer - 5;
    }
    //Condições de Dano no Boss  
    if ((player1.body.x > (boss1.body.x - 75)) && (player1.body.x < (boss1.body.x + 75)) && (this.space.isDown) && (player1.body.y > 435) && (cursors.down.isUp) && (cursors.up.isUp) && (this.hpBoss >= 1)) {
      this.hpBoss = this.hpBoss - 1;
      if (this.hpBoss >= 1) {
        this.textHpBoss.setText('HP: ' + this.hpBoss);
      }
      if (this.hpBoss < 1) {
        this.textHpBoss.setText('HP: 0');
        hp2.anims.play('dano2', true);
        boss1.setVelocity(0, 0);
        boss1.anims.play('morteB2', true);
        boss1.setSize(60, -10);
        boss1.setOffset(10, 110);
      }
    }

    //Condições do Player
    console.log(player1.body.y);
    if ((this.hpPlayer > 0) && ((this.timer > 1) || (this.hpBoss <= 0))) {
      if ((cursors.left.isDown) && (cursors.down.isDown) && (this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.right.isDown) && (cursors.down.isDown) && (this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.left.isDown) && (cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.right.isDown) && (cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.left.isDown) && (this.space.isDown) && (cursors.down.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((cursors.right.isDown) && (this.space.isDown) && (cursors.down.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((cursors.left.isDown) && (cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.right.isDown) && (cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.left.isDown) && (cursors.up.isUp) && (this.space.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('esquerda', true);
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      } else if ((cursors.right.isDown) && (cursors.up.isUp) && (this.space.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('direita', true);
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      } else if ((cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.down.isDown) && (player1.body.y < 410)) {
        player1.setVelocityY(+200);
        player1.anims.play('baixo', true);
      } else if ((this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((player1.body.y > 435) || (player1.body.touching.down)) {
        player1.setVelocityX(0);
        player1.anims.play('parado');
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      }
    }
    //Condições do Boss
    if ((this.hpBoss > 0) && (this.hpPlayer > 0) && (this.timer >= 1)) {
      if (boss1.body.x < player1.body.x) {
        boss1.flipX = false;
      }
      if (boss1.body.x > player1.body.x) {
        boss1.flipX = true;
      }
      if (boss1.body.x > (config.width - 200)) {
        boss1.setVelocity(-100, 0).setBounce(1, 0);
        boss1.anims.play('esquerdaB2', true);
        boss1.setSize(20, 80);
        boss1.setOffset(30, 20);
      }
      if (boss1.body.x < config.width - 780) {
        boss1.setVelocity(100, 0).setBounce(1, 0);
        boss1.anims.play('direitaB2', true);
        boss1.setSize(20, 80);
        boss1.setOffset(30, 20);
      }
      if (this.random > 6) {
        boss1.anims.play('esquerdaB2', true);
      }
      if ((this.random <= 6) && (this.random > 3) && (this.hpPlayer > 0)) {
        boss1.anims.play('golpeB2', true);
      }
      if ((this.random <= 3) && (this.random > 0) && (this.hpPlayer > 0)) {
        boss1.anims.play('golpeB2.2', true);
      }
    }
  }
}

/////////////////////////////////////////////////////////////

// FASE 3

class Fase3 extends BaseFase {
  constructor() {
    super('Fase3');
  }
  preload() {
    this.load.spritesheet('hp', 'assets/hp.png', {
      frameWidth: 300,
      frameHeight: 300
    });
    this.load.spritesheet('hp2', 'assets/hp.png', {
      frameWidth: 300,
      frameHeight: 300
    });

    this.load.image('round1', 'assets/round1.png');
    this.load.spritesheet('player1', 'assets/karhnaRun.png', {
      frameWidth: 80,
      frameHeight: 80
    });
    this.load.spritesheet('karhnaAttack', 'assets/karhnaAttack.png', {
      frameWidth: 96,
      frameHeight: 80
    });
    this.load.spritesheet('karhnaJump1', 'assets/karhnaJumpStart.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('karhnaJump2', 'assets/karhnaJumpEnd.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('karhnaJumpAll', 'assets/player1JumpAll.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('boss3', 'NexusFight/Personagens/Cavaleiros/Knight_3/Walk.png', {
      frameWidth: 78,
      frameHeight: 86
    });
    this.load.spritesheet('boss3Dead', 'NexusFight/Personagens/Cavaleiros/Knight_3/Dead.png', {
      frameWidth: 80,
      frameHeight: 86
    });
    this.load.spritesheet('player1Dead', 'assets/player1Dead.png', {
      frameWidth: 80,
      frameHeight: 64
    });
    this.load.spritesheet('boss3golpe', 'NexusFight/Personagens/Cavaleiros/Knight_3/Attack 1.png', {
      frameWidth: 84,
      frameHeight: 86
    });
    this.load.spritesheet('boss3golpe2', 'NexusFight/Personagens/Cavaleiros/Knight_3/Attack 3.png', {
      frameWidth: 101,
      frameHeight: 86
    });
    this.load.spritesheet('boss3golpe3', 'NexusFight/Personagens/Cavaleiros/Knight_3/Run+Attack.png', {
      frameWidth: 73,
      frameHeight: 86
    });
  }

  create() {

    this.add.image(config.width / 2, config.height / 2, 'round1').setScale(1.1, 1.3);

    var hp = this.add.sprite(100, config.height - 550, 'hp').setScale(0.25, 0.25);
    this.hp = hp;

    var hp2 = this.add.sprite(800, config.height - 550, 'hp2').setScale(0.25, 0.25);
    this.hp2 = hp2;

    var boss1 = this.physics.add.sprite(config.width - 100, config.height, 'boss3').setScale(2.2, 2.2);
    boss1.setCollideWorldBounds(true);
    boss1.body.immovable = true;
    boss1.setSize(15, 80);
    boss1.setOffset(0, 0);
    this.boss1 = boss1;
    //boss1.setInteractive(); //deixa o elemento "clicável"

    var player1 = this.physics.add.sprite(200, config.height, 'player1').setScale(2, 2);
    player1.setCollideWorldBounds(true);
    player1.setSize(25, 80);
    player1.setOffset(32, 0);
    this.player1 = player1;
    //player1.body.immovable = true;

    this.physics.add.collider(player1, boss1);

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Definição dos HPs, Nomes e Timer
    this.hpPlayer = 1500;
    this.textHpPlayer = this.add.text(40, 100, 'HP: ' + this.hpPlayer, {
      fontSize: '30px',
      fill: '#ffffff'
    })
    this.textNomePlayer = this.add.text(320, 50, 'Player1 VS', {
      fontSize: '30px',
      fill: '#FFFF00'
    })
    this.hpBoss = 2000;
    this.textHpBoss = this.add.text(740, 100, 'HP: ' + this.hpBoss, {
      fontSize: '30px',
      fill: '#ffffff'
    })
    this.textNomeBoss = this.add.text(520, 50, 'Boss3', {
      fontSize: '30px',
      fill: '#FFFF00'
    })
    this.timer = 10000;
    this.textTimer = this.add.text(360, 90, 'Tempo Restante: ' + parseInt(this.timer / 100, 10), {
      fontSize: '20px',
      fill: '#ffffff'
    })

    //Animações do Player
    this.anims.create({
      key: 'parado',
      frames: [{
        key: 'player1',
        frame: 4
      }],
      frameRate: 20
    });
    this.anims.create({
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'direita',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 5,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'cima',
      frames: this.anims.generateFrameNumbers('karhnaJumpAll', {
        start: 0,
        end: 14
      }),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'baixo',
      frames: this.anims.generateFrameNumbers('karhnaJump2', {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'agachar',
      frames: this.anims.generateFrameNumbers('karhnaJump1', {
        start: 0,
        end: 0
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'ataque',
      frames: this.anims.generateFrameNumbers('karhnaAttack', {
        start: 0,
        end: 7
      }),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'morte',
      frames: this.anims.generateFrameNumbers('player1Dead', {
        start: 0,
        end: 7
      }),
      frameRate: 5,
      repeat: 0
    });

    //Animações do Boss
    this.anims.create({
      key: 'paradoB3',
      frames: [{
        key: 'boss3',
        frame: 0
      }],
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'direitaB3',
      frames: this.anims.generateFrameNumbers('boss3', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'esquerdaB3',
      frames: this.anims.generateFrameNumbers('boss3', {
        start: 1,
        end: 2
      }),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'morteB3',
      frames: this.anims.generateFrameNumbers('boss3Dead', {
        start: 0,
        end: 5
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'golpeB3',
      frames: this.anims.generateFrameNumbers('boss3golpe', {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'golpeB3.2',
      frames: this.anims.generateFrameNumbers('boss3golpe2', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'golpeB3.3',
      frames: this.anims.generateFrameNumbers('boss3golpe3', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });

    //Animações da HealthBar
    this.anims.create({
      key: 'dano',
      frames: this.anims.generateFrameNumbers('hp', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: 0
    });
    this.anims.create({
      key: 'dano2',
      frames: this.anims.generateFrameNumbers('hp2', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: 0
    });

    this.unic = 0;
  }

  update() {

    let cursors = this.input.keyboard.createCursorKeys();

    var player1 = this.player1;
    var boss1 = this.boss1;
    var hp = this.hp;
    var hp2 = this.hp2;

    //Condições do Tempo e Random
    this.timer = this.timer - 2;
    if ((this.hpBoss > 0) && (this.hpPlayer > 0) && (this.timer >= 0)) {
      this.textTimer.setText('Tempo Restante: ' + parseInt(this.timer / 100, 10));
      if (this.timer % 100 == 0) {
        this.random = Math.floor(Math.random() * 10 + 1);
      }
    }
    else {
      this.random = 500;
    }

    //Condições de ressurreição
    if (((this.hpPlayer <= 0) || (this.timer <= 0)) && (this.hpBoss > 0)) {
      this.textGameOver = this.add.text(310, config.height / 2 - 50, 'GAME OVER', {
        fontSize: '60px',
        fill: '#FF0000'
      })
      this.textReturn = this.add.text(290, 310, '(Tecle ↑ para tentar novamente)', {
        fontSize: '20px',
        fill: '#FFFF00'
      })
    }
    if (((this.hpPlayer <= 0) || (this.timer <= 0)) && (cursors.up.isDown) && (this.hpBoss > 0)) {
      this.scene.start('Introducao');
    }

    //Condições de saída
    if ((player1.body.x >= config.width - 200) && (this.hpBoss <= 0)) {
      this.textSaida = this.add.text(630, 410, 'Tecle ↓ para descer.', {
        fontSize: '20px',
        fill: '#FFFF00'
      })
    }
    if ((player1.body.x >= config.width - 200) && (this.hpBoss <= 0) && (cursors.down.isDown)) {
      this.scene.start('Endgame');
    }

    //Condições de Dano no Player
    //Tempo esgotado
    if ((this.timer < 100) && (this.hpBoss >= 1) && (this.hpPlayer >= 1)) {
      this.hpPlayer = this.hpPlayer * 0;
      this.textTimer.setText('Tempo Restante: 0');
    }
    //Vida esgotada
    if (this.hpPlayer >= 1) {
      this.textHpPlayer.setText('HP: ' + this.hpPlayer);
    }
    if ((this.hpPlayer < 1) && (this.unic == 0)) {
      this.textHpPlayer.setText('HP: 0');
      hp.anims.play('dano', true);
      boss1.setVelocity(0, 0);
      boss1.anims.play('paradoB3', true);
      player1.setVelocity(0, 0);
      player1.body.immovable = true;
      player1.anims.play('morte', true);
      player1.setOffset(10, -20);
      this.unic = 1;
    }
    //Boss 3 - Golpe 1
    if ((player1.body.x > (boss1.body.x - 90)) && (player1.body.x < (boss1.body.x + 75)) && ((this.random <= 8) && (this.random > 4)) && (this.timer >= 1) && (this.hpBoss >= 1)) {
      this.hpPlayer = this.hpPlayer - 1;
    }
    //Boss 3 - Golpe 2
    if ((player1.body.x > (boss1.body.x - 90)) && (player1.body.x < (boss1.body.x + 75)) && (cursors.down.isUp) && ((this.random <= 4) && (this.random > 2)) && (this.timer >= 1) && (this.hpBoss >= 1)) {
      this.hpPlayer = this.hpPlayer - 2;
    }
    //Boss 3 - Golpe 3
    if ((player1.body.x > (boss1.body.x - 90)) && (player1.body.x < (boss1.body.x + 75)) && (cursors.up.isUp) && ((this.random <= 2) && (this.random > 0)) && (this.timer >= 1) && (this.hpBoss >= 1)) {
      this.hpPlayer = this.hpPlayer - 3;
    }
    //Condições de Dano no Boss  
    if ((player1.body.x > (boss1.body.x - 75)) && (player1.body.x < (boss1.body.x + 75)) && (this.space.isDown) && (player1.body.y > 435) && (cursors.down.isUp) && (cursors.up.isUp) && (this.hpBoss >= 1)) {
      this.hpBoss = this.hpBoss - 2;
      if (this.hpBoss >= 1) {
        this.textHpBoss.setText('HP: ' + this.hpBoss);
      }
      if (this.hpBoss < 1) {
        this.textHpBoss.setText('HP: 0');
        hp2.anims.play('dano2', true);
        boss1.setVelocity(0, 0);
        boss1.anims.play('morteB3', true);
        boss1.setSize(60, -10);
        boss1.setOffset(10, 110);
      }
    }

    //Condições do Player
    console.log(player1.body.y);
    if ((this.hpPlayer > 0) && ((this.timer > 1) || (this.hpBoss <= 0))) {
      if ((cursors.left.isDown) && (cursors.down.isDown) && (this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.right.isDown) && (cursors.down.isDown) && (this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.left.isDown) && (cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.right.isDown) && (cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.left.isDown) && (this.space.isDown) && (cursors.down.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((cursors.right.isDown) && (this.space.isDown) && (cursors.down.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((cursors.left.isDown) && (cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.right.isDown) && (cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.left.isDown) && (cursors.up.isUp) && (this.space.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(-160);
        player1.flipX = true;
        player1.anims.play('esquerda', true);
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      } else if ((cursors.right.isDown) && (cursors.up.isUp) && (this.space.isUp) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityX(160);
        player1.flipX = false;
        player1.anims.play('direita', true);
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      } else if ((cursors.up.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.setVelocityY(-250);
        player1.anims.play('cima', true);
        player1.setSize(25, 80);
        player1.setOffset(12, 0);
      } else if ((cursors.down.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.anims.play('agachar', true);
        player1.setSize(20, 80);
        player1.setOffset(15, 0);
      } else if ((cursors.down.isDown) && (player1.body.y < 410)) {
        player1.setVelocityY(+200);
        player1.anims.play('baixo', true);
      } else if ((this.space.isDown) && ((player1.body.y > 435) || (player1.body.touching.down))) {
        player1.anims.play('ataque', true);
        player1.setSize(25, 80);
        player1.setOffset(40, 0);
      } else if ((player1.body.y > 435) || (player1.body.touching.down)) {
        player1.setVelocityX(0);
        player1.anims.play('parado');
        player1.setSize(25, 80);
        player1.setOffset(32, 0);
      }
    }
    //Condições do Boss
    if ((this.hpBoss > 0) && (this.hpPlayer > 0) && (this.timer >= 1)) {
      if (boss1.body.x < player1.body.x) {
        boss1.flipX = false;
      }
      if (boss1.body.x > player1.body.x) {
        boss1.flipX = true;
      }
      if (boss1.body.x > (config.width - 200)) {
        boss1.setVelocity(-100, 0).setBounce(1, 0);
        boss1.anims.play('esquerdaB3', true);
        boss1.setSize(20, 80);
        boss1.setOffset(30, 20);
      }
      if (boss1.body.x < config.width - 780) {
        boss1.setVelocity(100, 0).setBounce(1, 0);
        boss1.anims.play('direitaB3', true);
        boss1.setSize(20, 80);
        boss1.setOffset(30, 20);
      }
      if ((this.random > 8)) {
        boss1.anims.play('esquerdaB3', true);
      }
      if ((this.random <= 8) && (this.random > 4) && (this.hpPlayer > 0)) {
        boss1.anims.play('golpeB3', true);
      }
      if ((this.random <= 4) && (this.random > 2) && (this.hpPlayer > 0)) {
        boss1.anims.play('golpeB3.2', true);
      }
      if ((this.random <= 2) && (this.random > 0) && (this.hpPlayer > 0)) {
        boss1.anims.play('golpeB3.3', true);
      }
    }
  }
}

////////////////////////////////////////////////////////////

//ENDGAME

class Endgame extends BaseFase {
  constructor() {
    super('Endgame');
  }

  preload() {

    this.load.image('cenario2', 'NexusFight/Cenários/vistaTorre.png');
    this.load.image('cavalo', 'assets/kisspng-horse-pixel-brown-horse-5a79818ac6f7e5.580903061517912458815.png');
    this.load.image('fundoPreto', 'assets/fundoPreto.jpg');
    this.load.spritesheet('player1', 'assets/karhnaRun.png', {
      frameWidth: 80,
      frameHeight: 80
    });
  }

  create() {
    this.background = this.add.image(config.width / 2, config.height / 2, 'cenario2').setScale(2.0, 1.8);

    this.cavalo = this.add.image(config.width / 2, config.height - 110, 'cavalo').setScale(0.4, 0.4);

    var player1 = this.physics.add.sprite(200, config.height, 'player1').setScale(3, 3);
    player1.setCollideWorldBounds(true);

    this.anims.create({
      key: 'parado',
      frames: [{
        key: 'player1',
        frame: 4
      }],
      frameRate: 20
    });
    this.anims.create({
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'direita',
      frames: this.anims.generateFrameNumbers('player1', {
        start: 5,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });

    this.player1 = player1;

    this.physics.add.collider(player1, this.background);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    var player1 = this.player1;
    var background = this.background;

    if (this.cursors.left.isDown) {
      player1.setVelocityX(-160);
      player1.anims.play('esquerda', true);
      player1.flipX = true;
    } else if (this.cursors.right.isDown) {
      player1.setVelocityX(160);
      player1.anims.play('direita', true);
      player1.flipX = false;
    } else {
      player1.setVelocityX(0);
      player1.anims.play('parado');
    }

    if (player1.body.x > config.width / 2 - 250) {
      this.fundoPreto = this.add.image(config.width / 2, config.height / 2, 'fundoPreto').setScale(2.0, 2.0);
      this.textEndgame = this.add.text(270, config.height / 2 - 50, 'FIM DE JOGO', {
        fontSize: '60px',
        fill: '#FFFFFF'
      })
    }
  }

}

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  backgroundColor: '#f000000',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 400
      },
      debug: false
    }
  },
  scene: [PreIntroducao, Introducao, Fase1, Fase2, Fase3, Endgame],
};

const game = new Phaser.Game(config);