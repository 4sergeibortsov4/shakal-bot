const { Telegraf } = require('telegraf')
const superagent = require('superagent')
const { get } = require('superagent')
const path = require('path')

// ТЕЛЕГРАММ БОТ
const bot = new Telegraf("~") //токен

///////////////////////////////////////////////
//Веб-сервер
//Прикручен чтобы heroku не выключал бота при привязке web порта
const express = require("express")
const app = express()
const PORT = process.env.PORT ?? 3000

app.get("/", function(request, response){
    response.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
    bot.launch() // запуск бота
}) 

///////////////////////////////////////////////

// всякие доп.функции для разной логики
function reversedate(str) {
    return str.split("-").reverse().join(".")
}


// базовые команды
bot.start((ctx) => ctx.reply('Здорова шакалы')) //ответ бота на команду /start

bot.help((ctx) => ctx.reply('Здорова, я есть шакал засёрыш, я тупой до усрачки, люблю какить также как и шакалы.\n\nСписок моих шакальных команд:\n/start - Начать общение с шакалом.\n/help - Описание бота.\n/salam - Поздороваться с рабом шакалом.\n/beaver - Призвать бобра.\n/jambo - Отдать честь ЧВК Вагнеру.\n/yasha - Взбесить Яшу.\n/idinaxep - Послать нахер через раба шакала.\n/dollar - Курс доллара на сегодня.\n/euro - Курс евро на сегодня.\n/weather - Узнать какая сегодня погода.\n/bomboleila - злиться в точности как "я есть Антон".')) //ответ бота на команду /help


// простые команды
bot.hears('/salam', (ctx) => ctx.replyWithHTML('Салам Алейкум шакалы!!! &#128115;'))
bot.hears('/salam@shakali_bot', (ctx) => ctx.replyWithHTML('Салам Алейкум шакалы!!! &#128115;'))

bot.hears('/beaver', (ctx) => ctx.replyWithHTML('Бобёр!!!!!!!! &#129451;'))
bot.hears('/beaver@shakali_bot', (ctx) => ctx.replyWithHTML('Бобёр!!!!!!!! &#129451;'))

bot.hears('/jambo', (ctx) => ctx.replyWithHTML('&#129305;'))
bot.hears('/jambo@shakali_bot', (ctx) => ctx.replyWithHTML('&#129305;'))

bot.hears('/yasha', (ctx) => ctx.replyWithHTML('Немцы делают машины, а японцы - &#128640;'))
bot.hears('/yasha@shakali_bot', (ctx) => ctx.replyWithHTML('Немцы делают машины, а японцы - &#128640;'))

bot.hears('/idinaxep', (ctx) => ctx.replyWithHTML('&#128405;'))
bot.hears('/idinaxep@shakali_bot', (ctx) => ctx.replyWithHTML('&#128405;'))

bot.hears('/bomboleila', (ctx) => ctx.replyWithHTML('&#128545;'))
bot.hears('/bomboleila@shakali_bot', (ctx) => ctx.replyWithHTML('&#128545;'))

// сложные команды 
bot.hears('/dollar', async(ctx) => await superagent.get('https://api.exchangerate.host/latest?base=USD&symbols=RUB').end(async(err, res) => {
    if (err) {
        console.log(err)
    } else {
        const data = JSON.parse(res.text)
        ctx.reply(`Курс доллара на ${reversedate(data.date)} равен ${data.rates['RUB'].toString().slice(0,5)} рублям, шакалы!`)
    }
}))
bot.hears('/dollar@shakali_bot', async(ctx) => await superagent.get('https://api.exchangerate.host/latest?base=USD&symbols=RUB').end(async(err, res) => {
    if (err) {
        console.log(err)
    } else {
        const data = JSON.parse(res.text)
        ctx.reply(`Курс доллара на ${reversedate(data.date)} равен ${data.rates['RUB'].toString().slice(0,5)} рублям, шакалы!`)
    }
}))

bot.hears('/euro', async(ctx) => await superagent.get('https://api.exchangerate.host/latest?base=EUR&symbols=RUB').end(async(err, res) => {
    if (err) {
        console.log(err)
    } else {
        const data = JSON.parse(res.text)
        ctx.reply(`Курс евро на ${reversedate(data.date)} равен ${data.rates['RUB'].toString().slice(0,5)} рублям, шакалы!`)
    }
}))
bot.hears('/euro@shakali_bot', async(ctx) => await superagent.get('https://api.exchangerate.host/latest?base=EUR&symbols=RUB').end(async(err, res) => {
    if (err) {
        console.log(err)
    } else {
        const data = JSON.parse(res.text)
        ctx.reply(`Курс евро на ${reversedate(data.date)} равен ${data.rates['RUB'].toString().slice(0,5)} рублям, шакалы!`)
    }
}))

bot.hears('/weather', async(ctx) => await superagent.get('https://api.openweathermap.org/data/2.5/weather?lat=52.60&lon=39.59&appid=c1e3bbe22f6c49a041c5e0065dadb1fb&lang=ru&units=metric').end(async(err, res) => {
    if (err) {
        console.log(err)
    } else {
        const data = JSON.parse(res.text)
        if(data.main.temp >= 10){
            ctx.reply(`Погода на сегодня, шакалы:\nОписание: ${data.weather[0].description}\nТемпература: ${data.main.temp.toString().slice(0,2)} °С\nСкорость ветра: ${data.wind.speed} м/с`)
        } else {
            ctx.reply(`Погода на сегодня, шакалы:\nОписание: ${data.weather[0].description}\nТемпература: ${data.main.temp.toString().slice(0,1)} °С\nСкорость ветра: ${data.wind.speed} м/с`)
        }
    }
}))
bot.hears('/weather@shakali_bot', async(ctx) => await superagent.get('https://api.openweathermap.org/data/2.5/weather?lat=52.60&lon=39.59&appid=c1e3bbe22f6c49a041c5e0065dadb1fb&lang=ru&units=metric').end(async(err, res) => {
    if (err) {
        console.log(err)
    } else {
        const data = JSON.parse(res.text)
        if(data.main.temp >= 10){
            ctx.reply(`Погода на сегодня, шакалы:\nОписание: ${data.weather[0].description}\nТемпература: ${data.main.temp.toString().slice(0,2)} °С\nСкорость ветра: ${data.wind.speed} м/с`)
        } else {
            ctx.reply(`Погода на сегодня, шакалы:\nОписание: ${data.weather[0].description}\nТемпература: ${data.main.temp.toString().slice(0,1)} °С\nСкорость ветра: ${data.wind.speed} м/с`)
        }
    }
}))
