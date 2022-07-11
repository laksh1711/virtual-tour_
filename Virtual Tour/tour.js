AFRAME.registerComponent('tour',{

    schema : {
        state : {type : 'string', default : 'places-list'},
        selectedCard : {type : 'string', default : '#card1'}
    },
    
    init :function () {
        this.placeContainer = this.el 
        this.createCards()
        this.cameraEl = document.querySelector('#camera')
    },

    createCards : function () {
        const thumbnailsRef = [
            { 
                id : 'tajMahal',
                title : 'Taj Mahal',
                url : './assets/thumbnails/taj_mahal.png'
            },

            { 
                id : 'budapest',
                title : 'Budapest',
                url : './assets/thumbnails/budapest.jpg'
            },

            { 
                id : 'eiffelTower',
                title : 'Eiffel Tower',
                url : './assets/thumbnails/eiffel_tower.jpg'
            },

            { 
                id : 'newYork',
                title : 'New-York City',
                url : './assets/thumbnails/new_york_city.png'
            }
        ]

        var previousXPos = -60

        for (var item of thumbnailsRef){
            const posX = previousXPos + 25
            const posY = 10
            const posZ = -40

            const position = {x : posX , y : posY, z : posZ}

            previousXPos = posX

            const borderEl = this.createBorder(position, item.id)
            const thumbnailEl = this.createThumbnails(item)
            borderEl.appendChild(thumbnailEl)
            const titleEl = this.createTitle(position, item)
            borderEl.appendChild(titleEl)

            this.placeContainer.appendChild(borderEl)
        
        }

    },

    createBorder: function (position, id){
        const entityElement = document.createElement('a-entity')
        entityElement.setAttribute('id', id)
        entityElement.setAttribute('visible', true)

        entityElement.setAttribute('geometry', {
            primitive : 'ring',
            radiusInner : 9,
            radiusOuter : 10
        })
        entityElement.setAttribute('position', position)
        entityElement.setAttribute('material',{ color : 'blue', opacity : 0.4})
        entityElement.setAttribute('cursor-event', {})

        return entityElement

    },

    createThumbnails: function (item){
        const entityElement = document.createElement('a-entity')
        entityElement.setAttribute('visible', true)

        entityElement.setAttribute('geometry', {
            primitive : 'circle',
            radius : 9,
        })
        entityElement.setAttribute('material',{ src : item.url})

        return entityElement

    },

    createTitle: function (position, item){
        const entityElement = document.createElement('a-entity')


        entityElement.setAttribute('text', {
            font : 'exo2bold',
            align : 'center',
            width : 50,
            color : 'black',
            value : item.title
        })

        const elPosition = position
        elPosition.y = -20

        entityElement.setAttribute('position', elPosition)
        entityElement.setAttribute('visible', true)

        return entityElement

    },

    showView: function (){
        const {selectedCard} = this.data
        const skyel = document.querySelector('#mainContainer')
        skyel.setAttribute('material', {
            src : `assets/360_images/${selectedCard}/place-0.jpg`
        })


    },

    hideEl : function (elList){
        elList.map(el => {el.setAttribute('visible' , false)})
    },

    tick : function (){
        const {state} = this.el.getAttribute('tour')

        if (state === 'view'){
            this.hideEl([this.placeContainer])
            this.showView()
        }
    }
})