async function plate(id, picture) {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Live subscriber count for @${id}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />

    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            background: linear-gradient(to right, #1a14b8, #000000);
            font-family: "Roboto Mono", sans-serif;
            margin: 0;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            overflow: hidden;
        }
        
        .counter-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 30px 50px;
            text-align: center;
        }

        a {
            color: white;
        }
        
        .counter {
            font-size: 60px;
            margin-top: 10px;
        }

        .avatar {
            border-radius: 50%;
        }
        
        @media (max-width: 630px) {
            body {
                flex-direction: column;
            }
        }
    </style>

</head>

<body>
    <div class="counter-container">
        <img src="${picture}" class="avatar" />
        <div class="counter" id="subs"></div>
        <a href="https://t.me/${id}">@${id}</a>
    </div>
</body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js"></script>
<script>
    const socket = io();
    socket.on('${id}', function(on) {
        document.getElementById('subs').innerHTML = on.subs
    });
</script>

</html>
`
}

module.exports = {
    plate
}
