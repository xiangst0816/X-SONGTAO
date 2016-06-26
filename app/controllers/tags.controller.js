'use strict';
/**
 * Created by xiangsongtao on 16/3/4.
 */
let mongoose = require('mongoose');

//数据库查询同一错误处理
let DO_ERROR_RES = require('../utils/DO_ERROE_RES.js');
//MyInfo的数据模型
let Tags = mongoose.model('Tags');

module.exports = {
    get: function (req, res, next) {
        Tags.find({}, function (err, docs) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            res.status(200);
            res.send({
                tagLists: docs
            })
        })
    },
    getAllWithStructure: function (req, res, next) {
        Tags.find({}).sort('catalogue_name').exec(function (err, docs) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            let tagsArr = [];
            let cataObj = {};

            let nowCata = '';
            for (let i = 0, docLen = docs.length; docLen > i; i++) {
                let tplCata = docs[i].catalogue_name.toString();
                if (nowCata !== tplCata) {
                    if(nowCata !== ''){
                        tagsArr.push(cataObj);
                    }

                    nowCata = tplCata;
                    cataObj = {
                        "name": nowCata,
                        "data": []
                    };
                    cataObj.data.push(docs[i]);
                    if (docLen == i + 1) {
                        tagsArr.push(cataObj);
                    }
                }else{
                    cataObj.data.push(docs[i]);
                    if (docLen == i + 1) {
                        tagsArr.push(cataObj);
                    }
                }


            }


            res.status(200);
            res.send({
                tagLists: tagsArr
            })
        });
    },
    getById: function (req, res, next) {
        Tags.findOne({_id: req.params.id}, function (err, doc) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            if (!!doc) {
                res.status(200);
                res.send({
                    "code": "1",
                    "msg": `tag find success!`,
                    "data": doc
                });
            } else {
                res.status(200);
                res.send({
                    "code": "2",
                    "msg": `tag non-exist!`
                });
            }

        })
    },
    add: function (req, res, next) {
        Tags.findOne({name: req.body.name}, function (err, doc) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            if (!!doc) {
                res.status(200);
                res.send({
                    "code": "2",
                    "msg": "tags added failure, tag already exist!",
                    "data": doc._id
                })
            } else {
                //新增标签
                let {name, catalogue_name} =  req.body;
                let tagData = {
                    name: name,
                    catalogue_name: catalogue_name,
                    used_num: 0
                };
                let tag = new Tags(tagData);
                tag.save();
                tagData._id = tag._id;
                res.status(200);
                res.send({
                    "code": "1",
                    "msg": "tags add success!",
                    "data": tagData
                })
            }
        })
    },
    edit: function (req, res, next) {
        Tags.findOne({_id: req.body._id}, function (err, doc) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            if (!!doc) {
                doc.name = req.body.name;
                doc.markClass = req.body.markClass;
                doc.state = req.body.state;
                doc.save();
                res.status(200);
                res.send({
                    "code": "1",
                    "msg": "tag edit success!"
                });
            } else {
                res.status(200);
                res.send({
                    "code": "2",
                    "msg": "tag not exist!"
                });
            }
        });
    },
    delete: function (req, res, next) {
        Tags.remove({_id: req.params.id}, function (err) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            res.status(200);
            res.send({
                "code": "1",
                "msg": `tag ${req.params.id} delete success!`
            });

        });
    }
};






