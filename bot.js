const { Telegraf, Scenes, session } = require('telegraf');
const db = require('./util/database');
const { bot_token } = require('./consts');

const User = class User {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    save() {
        return db.execute('INSERT INTO users (name, phone) VALUES (?, ?)',[this.name, this.phone]);
    }
};

const superWizard = new Scenes.WizardScene(
    'super-wizard',
    ctx => {
      ctx.reply("What's your name?");
      ctx.wizard.state.data = {};
      return ctx.wizard.next();
    },
    ctx => {
      ctx.wizard.state.data.name = ctx.message.text;
      ctx.reply('Enter your phone number');
      return ctx.wizard.next();
    },
    ctx => {
      ctx.wizard.state.data.phone = ctx.message.text;
      ctx.reply(`Your name is ${ctx.wizard.state.data.name}`);
      ctx.reply(`Your phone is ${ctx.wizard.state.data.phone}`);
      const user = new User(ctx.wizard.state.data.name, ctx.wizard.state.data.phone);
      user.save().catch(err => console.log(err));
      return ctx.scene.leave();
    }
);
const stage = new Scenes.Stage([superWizard]);

const bot = new Telegraf(bot_token.token);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
    ctx.reply('Welcome');
});

bot.command('id', ctx => {
    ctx.scene.enter('super-wizard');
});

bot.use((ctx) => {
    ctx.reply('use commands /start or /id');
});

bot.launch();
