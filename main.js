const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const axios = require('axios');
const config = require('./config');
const temp = require('./template');
const id = config.CHANNEL;

let picture = `images/${config.CHANNEL}.jpg`;

app.get('/', async(req, res) => {
    res.send(await temp.plate(id, picture));
});

app.get('/images/:channel\.jpg', async (req, res) => {
    try {
        channel_id = req.params.channel;
        const result = await axios.get(`https://api.telegram.org/bot${config.BOT_API_KEY}/getChat?chat_id=@${channel_id}`);
        picture_id = result.data.result.photo.small_file_id;
        console.log(picture_id);
        const file_info_result = await axios.get(`https://api.telegram.org/bot${config.BOT_API_KEY}/getFile?file_id=${picture_id}`);
        console.log(file_info_result.data);
        const file_path = file_info_result.data.result.file_path;
        const file_result = await axios.get(`https://api.telegram.org/file/bot${config.BOT_API_KEY}/${file_path}`, {
            responseType: 'arraybuffer'
        });
        const image_data = file_result.data;
        res.send(Buffer.from(image_data, "binary"));
    } catch (err) {
        console.error(err.response);
        return;
    }
})

// app.use(express.static('public'));

setInterval(updateCount, 5000);

async function updateCount() {
    try {
        var subs_count = await axios.get(`https://api.telegram.org/bot${config.BOT_API_KEY}/getChatMembersCount?chat_id=@${id}`);
        io.emit(id, { 'subs': subs_count.data.result });
    } catch (err) {
        console.error(err.response);
    }
}


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Listening at Port: ${port}`)
});