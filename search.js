var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword


        // TODO: lookup restaurants whose names contain the given keyword
        //var rs = [restaurants[6], restaurants[10]] // hardcoded for 'Pizza'

        function keywordFilter(element)
        {
            if (~element.name.indexOf(keyword))
            {
                return element
            }
        }

        var rs = restaurants.filter(keywordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :x
        // var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        function keywordFilter(element)
        {
            if (element['attributes'])
            {
                if (element['attributes']['Good For'])
                {
                    if (element['attributes']['Good For'][x] === true)
                    {
                        return element
                    }
                }
            }
        }

        var rs = restaurants.filter(keywordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        // var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        function keywordFilter(element)
        {
            if (element['attributes'])
            {
                if (element['attributes']['Ambience'])
                {
                    if (element['attributes']['Ambience'][x] === true)
                    {
                        return element
                    }
                }
            }
        }

        var rs = restaurants.filter(keywordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants belonging to category :x
        // var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        function keywordFilter(element)
        {
            if (element["categories"])
            {
                for (var i = 0; i < element['categories'].length; i ++)
                {
                    if (element['categories'][i] == x)
                    {
                        return element
                    }
                }
            }
        }

        var rs = restaurants.filter(keywordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        // TODO: lookup restaurants with starts higher or lower than :number
        // var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        function keywordFilter(element)
        {
            if (element['stars'])
            {
                if (relationship == 'below')
                {
                    return element
                }
                else
                {
                    if (element['stars'] >= number)
                    {
                        return element
                    }
                }
            }
        }

        var rs = restaurants.filter(keywordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        console.log('req.query: ', req.query)    
        
        // // TODO: lookup restaurants with the given query parameters
        // var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        function keywordFilter(element)
        {
            var catName = true
            var catStars = true
            var catCateg = true
            var catAmb = true

            if (name)
            {
                if (~element.name.indexOf(name))
                {
                    catName = true
                }
                else
                {
                    catName = false
                }
            }
            if (minStars)
            {
                if (element.stars < minStars)
                {
                    catStars = false
                }
            }
            if (category)
            {
                for (var i = 0; i < element.category.length; i++)
                {
                    if (element.categories[i] == category)
                    {
                        catCateg = true
                        break
                    }
                    else
                    {
                        catCateg = false
                    }
                }
            }
            if (ambience)
            {
                if (element['attributes'])
                {
                    if (element['attributes']['Ambience'])
                    {
                        if (element['attributes']['Ambience'][ambience] === false)
                        {
                            catAmb = false 
                        }
                    }
                }
            }
            if (catName && catStars && catCateg && catAmb)
            {
                return element
            }
        }

        var rs = restaurants.filter(keywordFilter)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}