module.exports.home = function(req,res){
    res.cookie = ('user_id',25);
    res.render('home', {
        title: 'To-Do App'
    });
} 
