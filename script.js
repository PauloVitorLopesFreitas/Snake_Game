let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let btStart = document.getElementById('btstart');
let nivelOption = document.getElementById('nivel');
let inputScore =  document.getElementById('score');
let containerScore = document.getElementById('container-score');

let countScore = 0;
let box = 32;
let snake = [];
let jogo;
let direction = "right";
let food = {
  /*gera a comida aleatoriamente no canvas*/
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}
  
function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);  
}

function criarSnake() {

  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "black";   
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  /*definição do elemento de comida*/
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {

  /*captura de teclas para movimentação*/
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";  
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo() { 

  /*reset para a posição inicial ao sair da margem*/
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  /*Verificação de colisão*/
  /*Percorre todas as partes da snake e verifica se houve uma colisão da primeira parte com alguma outra.*/
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {

      clearInterval(jogo);      
      alert(`You lose :( \n \n Score: ${countScore}`);
      snake.length = 0;      
      countScore = 0;
    }
  }  

    criarBG();  
    criarSnake();  
    drawFood();
  
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
  
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
  
    //Será retirado a ultima posição da snake caso ela não esteja sobre a comida
    //Caso contrário será gerado uma nova comida aleatoriamente
    if (snakeX != food.x || snakeY != food.y) {
      snake.pop();    
  
    } else {
      countScore += 10;
      inputScore.value = countScore;

      food.x = Math.floor(Math.random() * 15 + 1) * box;
      food.y = Math.floor(Math.random() * 15 +1) * box;
    }
  
    //Cria um novo elemento na primeira posição da snake para gerar o movimento.
    let newHead = {
      x: snakeX,
      y: snakeY
    }
    snake.unshift(newHead);    
    
}

btStart.addEventListener('click',() => {      
  
  containerScore.className = "container-score";
  clearInterval(jogo);      
  snake.length = 0;      
  countScore = 0;
  inputScore.value = "";

  /*local de inicio do objeto*/
  snake[0] = {
    x: 8 * box,
    y: 8 * box
  }  

  /*Controle de dificuldade*/
  switch (nivelOption.value) {

    case "easy":                
      jogo = setInterval(iniciarJogo, 100);  
      break;                

    case "medium":        
      jogo = setInterval(iniciarJogo, 70);    
      break;

    case "hard":        
      jogo = setInterval(iniciarJogo, 30);    
      break;        
  }
});
