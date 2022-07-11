AFRAME.registerComponent('side-view',{

    init : function (){
        this.createPlaces()
    },

    tick : function (){
        const placesContainer = document.querySelector('#places-container')
        const {state} = placesContainer.getAttribute('tour') 

        if(state === 'view' || state === 'change-view'){
            this.el.setAttribute('visible', true)
        }
        else{
            this.el.setAttribute('visible', false)
        }
    },

    createPlaceThumbnail : function(position , id){
        const entityEl = document.createElement('a-entity')
        entityEl.setAttribute('visible', true)
        entityEl.setAttribute('id', `place-${id}`)
        console.log(id)
        console.log(entityEl.getAttribute('id'))
        entityEl.setAttribute('geometry', {
            primitive : 'circle',
            radius : 2.5,
        })
        entityEl.setAttribute('material', {
            src : 'assets/helicopter.png',
            opacity : 0.9
        })
        entityEl.setAttribute('position', position)

        entityEl.setAttribute('cursor-event', {})

        return entityEl 


    },

    createPlaces : function(){
        const sideViewContainer = document.querySelector('#side-view-container')
        var previousXPos = -150
        var previousYPos = 30

        for (var i = 1; i<= 4; i++){    
            const position = {
                x : (previousXPos += 50),
                y : (previousYPos += 2),
                z : -40
            }

            const entityEl = this.createPlaceThumbnail(position, i)
            sideViewContainer.appendChild(entityEl)
        }
    }

})