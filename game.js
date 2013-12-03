$(document).ready(function(){
    var quest = [
        {
            _id: "aliens",
            complete: false,
            conversations: "Welcome to Disgusting Aliens planet! Locals are really disgusting, I heard they like cats... as main dish."},
        {
            _id: "weird",
            complete: false,
            conversations: "This is Something Weird planet. I smell something weird..."},
        {
            _id: "butt",
            complete: false,
            conversations: "Buttwings planet. Sounds dangerous."},
        {
            _id: "fairy",
            complete: false,
            conversations: "Awwwww, Fairy people planet! They are so cute, look at them!"},
        {
            _id: "man",
            complete: false,
            conversations: "Yummy! I think Cookie Man lives on this planet."},
        {
            _id:"default",
            conversations: "Come on, we should do this quest! Choose the planet and let's go!"
        }
    ];

    var yourhealth = 100;
    var enemyhealth = Math.floor((Math.random()*100)+50);
    function goToPlanet(){
        var _id  = $(this).attr("data-planet");
        for(var i = 0; i < quest.length; i++){
            if(quest[i]._id === _id){
                if(quest[i].complete == true){
                    return "We've been here, only monsters and nothing more."
                }
                else{
                    $(this).closest("div").addClass("hidden");
                    $("#" + _id).addClass("showed");
                    $("#speech").find("div").eq(1).find("span").text(quest[i].conversations);
                }
            }
        }
    }
    function fightmode(){
        var yourhit = Math.floor((Math.random()*10)+5);
        var enemyhit = Math.floor((Math.random()*10)+5);
        yourhealth =  healthcalculator(enemyhit, yourhealth);
        enemyhealth = healthcalculator(yourhit, enemyhealth);
        if(yourhealth <= 5){
            return "You are lose!";
        }
        else if(enemyhealth <= 0){
            return "You are win!";
        }
        else{
            return fightmode();
        }
    }
    function healthcalculator(hit, health){
        return health - hit;
    }
    function goToTheShip(){
        $(".planets").removeClass("showed");
        $("#mainpanel").find("div").removeClass("hidden");
        $("#speech").find("div").eq(1).find("span").text(quest[5].conversations);
    }
    function startAttack(){
        var start = null;
        var cat = $(".showed").find(".hero");
        function step(timestamp){
            debugger;
            var progress;
            if(start === null){
                start = timestamp;
            }
            progress = timestamp - start;
                $(cat).css("left", progress+100);
            if(progress < 500){
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
    $("#mainpanel").find("li").click(goToPlanet);
    $("#speech").find("li").eq(1).click(goToTheShip);
    $("#speech").find("li").eq(0).click(startAttack);
});
