const { Router } = require('express');
const Topic = require('../../../models/topic.model');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        })
        .post('/', (req, res) => {
            const topic = req.body;
            topic.author = req.user.username;
            topic.comments = [];

            return data.topics.create(topic)
                .then((top) => {
                    return res.redirect('/topics');
                })
                .catch((err) => {
                    return res.redirect('/form');
            });
        })
        .get('/form', (req, res) => {
            return res.render('topics/form');
        })
        .get('/:title', (req, res) => {
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
            return data.topics.findByTitle(title)
                .then((topic) => {
                    return res.render('topics/comments', {
                        topic: topic,
                    });
                });
            // get the comments about the topic here
        })
    // TODO add a comment route
        .post('/:title/comments', (req, res) => {
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
            const comment = {
                topic: title,
                content: req.body.comment,
                author: req.user.username,
            };

            return Promise.all([
                data.users.addComment(comment),
                data.topics.addComment(comment),
            ])
            .then(() => {
                return res.redirect(`/topics/:title=${title}`);
                });
        });

    app.use('/topics', router);
};

module.exports = { attachTo };
