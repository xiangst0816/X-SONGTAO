/**
 * Created by xiangsongtao on 16/7/10.
 */
(function () {
    angular.module('xstApp')
        .factory('API', [function () {
            //接口API根地址
            const url = CONFIG.url;
            //我的信息_id
            const MY_INFO_ID = CONFIG.MY_INFO_ID;
            //我对对评论进行回复的信息
            const MY = CONFIG.MY;
            const EMAIL = CONFIG.EMAIL;
            return {
                /**
                 * 用户、登录相关
                 * */
                MY_INFO_ID: MY_INFO_ID,
                MY: MY,
                EMAIL: EMAIL,
                //登录
                login: `${url}/api/login`,
                //获取我的信息
                getMyInfo: `${url}/api/user/${MY_INFO_ID}`,
                getMyInfoWithOriginal: `${url}/api/user/original/${MY_INFO_ID}`,
                postMyInfo: `${url}/api/user`,
                changePassword: `${url}/api/change_password`,
                imgUpload: `${url}/api/imgupload`,
                imgResource: `${url}/uploads/`,

                /**
                 * 文章相关
                 * */
                //获取最新的十条文章
                ArticleFrom: "0",
                ArticleTo: "10",
                newUpdateArticle: `${url}/api/articles/from_to`,
                //由文章id获取文章详情
                getArticleById: `${url}/api/article/id`,
                //获取文章历史记录
                getArticleHistoryWithStructure: `${url}/api/article_history`,
                //获取文章列表
                getArticleList: `${url}/api/articles`,
                //由文章id获取文章详情(原始markdown版本)
                getRawArticleById: `${url}/api/article/raw/id`,
                //新增(如果传入的_id不存在的电话)-修改文章,
                postArt: `${url}/api/article`,
                //delete 文章
                deleteArt: `${url}/api/article/id`,

                /**
                 * 标签相关
                 * */
                //获取标签列表(带有结构的)
                getTagsListWithStructure: `${url}/api/tags_with_structure`,
                //由标签id获取文章列表
                getArticlesWithTagId: `${url}/api/article_tag/id`,
                //获取标签列表(原始)
                getTagsList: `${url}/api/tags`,
                //增加 post
                addTag: `${url}/api/tag`,
                //修改 put
                editTag: `${url}/api/tag`,
                //删除 delete
                deleteTag: `${url}/api/tag/id`,


                /**
                 * 获取评论
                 * */
                getArticlesComments: `${url}/api/article/comments/article_id`,
                changeCommentState: `${url}/api/changeCommentState`,
                getCommentToArticleList: `${url}/api/commentToArticleList`,
                postComment: `${url}/api/comment`,
                //评论已阅读 post
                changeCommentReplyState: `${url}/api/changeCommentReplyState`,
                //评论审核状态 post
                changeAuthState: `${url}/api/changeCommentAuthState`,
                //删除评论 delete
                delComment: `${url}/api/comment/id`,
                //新增评论
                newComment: `${url}/api/comment`,
            }

        }])

})();