module.exports.home = function(req,res){
    res.cookie = ('user_id',25);
    res.render('Home', {
        title: 'To-Do App'
    });
} 