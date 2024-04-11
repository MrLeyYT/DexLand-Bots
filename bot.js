const mineflayer = require('mineflayer'); // Установка MineFlayer
const config = require('./config.json'); // Данные конфига


const random = Math.floor(Math.random() * 10000000000); // Генерация рандомных чисел после ника
const botUsername = config.nickname + random; // Соединение ника из конфига и рандомных чисел
const number = config.number + 8; // Номер слота нужного выживания, чтобы выбрать его в меню выбора выживания
console.log(config)
const bot = mineflayer.createBot({
 host: config.ip,
 port: config.port,
 username: botUsername,
 version: config.version,
}); // Создание бота



bot.on('login', () => {
 bot.chat('/reg ' + config.password);
 console.log('Зашел!')
});

bot.on('spawn', () => {
 bot.chat('/surv'); // Открытие меню выбора выживания
 bot.once('windowOpen', (window) => {
   bot.clickWindow(number, 0, 0); // Выбор нужного выживания
   setInterval(() => {
	 bot.chat(config.message); 
  }, config.cooldown); // Отправка сообщения раз в указанную задержку
 });
});

bot.on('kicked', (reason, loggedIn) => {
 console.log(`Bot has been kicked! Reason: ${reason}`);
 process.exit(0);
}); // Вывод сообщения если бота кикнули


