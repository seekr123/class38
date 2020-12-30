class Game{
    constructor(){

    }
    getState(){
        database.ref('gameState').on('value',function(data){
            gameState=data.val();
        });
    }

    update(State){
        var updateStateRef=database.ref('/');
        updateStateRef.update({
            gameState:State
        })
    }

    async start(){
        if(gameState===0){
            player=new Player();
            var playerCountRef=await database.ref('playerCount').once('value');
            if(playerCountRef.exists()){
              playerCount=playerCountRef.val();
              player.getCount();
            }
            
            form=new Form();
            form.display();

 
        }
        car1=createSprite(100,200);
        car2=createSprite(300,200);
        car3=createSprite(500,200);
        car4=createSprite(700,200);
        cars=[car1,car2,car3,car4];

        car1.addImage(car1img);
        car2.addImage(car2img);
        car3.addImage(car3img);
        car4.addImage(car4img);

        
              


    }
    play(){
        form.hide();
        textSize(30);
        //text('Game Start',120,100);
        Player.getPlayerInfo();
        console.log(allPlayers);
        if(allPlayers!==undefined){
           background(ground);
           image(tracks,0,-displayHeight*4,displayWidth,displayHeight*5);
           var index=0;
           var x=200;
           var y;

            for(var plr in allPlayers){
                index+=1;
                x+=200;
                y=displayHeight-allPlayers[plr].distance;
                cars[index-1].x=x;
                cars[index-1].y=y;
                if(index==player.index){
                    cars[index-1].shapeColor='red';
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].position.y;

                }
              
                /*display_position+=20;       
                textSize(15);
                text(allPlayers[plr].name+': '+allPlayers[plr].distance,120,display_position);  */       
            }
        }
        if(keyIsDown(UP_ARROW)&& player.index!==null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>3650){
            gameState=2;            
        }
        drawSprites();

    }
    end(){
        console.log('game ended');
    }

}