# flappy-bird
<!DOCTYPE html>
<html>
<head>
    <title>Flappy Bird</title>
    <style>
        canvas {
            border: 1px solid #000;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="480" height="320"></canvas>
    <script>
        // Получаем элемент canvas
        const canvas = document.getElementById("gameCanvas");
        const context = canvas.getContext("2d");

        // Параметры игры
        const gravity = 0.5;
        const jumpForce = -7;
        let score = 0;

        // Создаем птичку
        const bird = {
            x: 50,
            y: canvas.height / 2,
            radius: 20,
            velocity: 0,
            draw: function() {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fillStyle = "#FF0000";
                context.fill();
                context.closePath();
            },
            update: function() {
                this.velocity += gravity;
                this.y += this.velocity;
            },
            jump: function() {
                this.velocity = jumpForce;
            },
            isColliding: function(pipe) {
                const birdTop = this.y - this.radius;
                const birdBottom = this.y + this.radius;
                const pipeTop = pipe.y;
                const pipeBottom = pipe.y + pipe.height;
                const pipeLeft = pipe.x;
                const pipeRight = pipe.x + pipe.width;

                return (
                    birdBottom > pipeTop &&
                    birdTop < pipeBottom &&
                    this.x + this.radius > pipeLeft &&
                    this.x - this.radius < pipeRight
                );
            }
        };

        // Создаем трубы
        const pipe = {
            x: canvas.width,
            y: 0,
            width: 50,
            height: 150,
            speed: 2,
            draw: function() {
                context.fillStyle = "#00FF00";
                context.fillRect(this.x, this.y, this.width, this.height);
            },
            update: function() {
                this.x -= this.speed;
            },
            isOffScreen: function() {
                return this.x + this.width < 0;
            }
        };

        // Обработчик события нажатия клавиши
        document.addEventListener("keydown", function(event) {
            if (event.keyCode === 32) {
                bird.jump();
            }
        });

        // Игровой цикл
        function gameLoop() {
            // Очистка canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Обновление и отрисовка птички
            bird.update();
            bird.draw();

            // Обновление и отрисовка трубы
            pipe.update();
            pipe.draw();

            // Проверка столкновений
            if (bird.isColliding(pipe)) {
                // Игра окончена
                alert("Game Over");
                return;
            }

            // Проверка выхода трубы за границу экрана
            if (pipe.isOffScreen()) {
                // Увеличение счета
                score++;
                // Создание новой трубы
                pipe.x = canvas.width;
                pipe.y =
