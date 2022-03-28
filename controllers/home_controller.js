module.exports.home = function(req,res){
    res.render('Home', {
        title: 'To-Do App'
    });
}