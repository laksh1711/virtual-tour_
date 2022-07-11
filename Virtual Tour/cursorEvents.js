AFRAME.registerComponent('cursor-event', {
    schema : {
        selectorItemId : {default : '', type : 'string'}
        
    },  

    init: function (){
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
        this.handleClickEvents()
        console.log('hello')
    },

    handlePlacesListState : function(){
        const id = this.el.getAttribute('id')
        const placesId = ['taj-Mahal','budapest', 'eiffelTower', 'newYork']

        if (placesId.includes(id)){
            const placesContainer = document.querySelector('#places-container')
            placesContainer.setAttribute('cursor-event', {selectorItemId : id})

            this.el.setAttribute('material', { color : 'green', opacity : 1})
        }

    },

    handleMouseEnterEvents : function(){
        this.el.addEventListener('mouseenter', ()=>{
            const placeContainer = document.querySelector('#places-container')
            const {state} = placeContainer.getAttribute('tour')
            if(state === 'places-list'){    
                this.handlePlacesListState()
            }
        })
    },

    handleMouseLeaveEvents : function(){
        this.el.addEventListener('mouseleave', ()=>{
            const {selectorItemId} = this.data

            if(selectorItemId ){
                const el = document.querySelector(`#${selectorItemId}`)
                const id = el.getAttribute('id')
            

                if(id == selectorItemId){
                    el.setAttribute('material', {color : 'blue', opacity : 0.4})
                }
            }
        })
    },

                            

    handleClickEvents : function(){
        this.el.addEventListener('click', (evt)=>{
            const placesContainer = document.querySelector('#places-container')
            const {state} = placesContainer.getAttribute('tour')

            if(state === 'places-list'){
                const id = this.el.getAttribute('id')
                const placesId = ['tajMahal', 'budapest','effielTower', 'newyork']
                //console.log(id)

                if (placesId.includes(id)){
                    placesContainer.setAttribute('tour', {
                        state : 'view', 
                        selectedCard : id
                    })
                }
                
            }

            if ( state === 'view' ){
                this.handleViewState()
                
            }

            if (state === 'change-view'){
                this.handleViewState()
            }

            
            
        })
    },

    handleViewState : function (){
        //const el = this.el
        const id = this.el.getAttribute('id')
        //const id = el.getAttribute('id')
        console.log(this.el)
        
        const placesContainer = document.querySelector('#places-container')
        const {selectedItemId} = placesContainer.getAttribute('cursor-event')
        const sideViewPlacesId = ['place-1', 'place-2', 'place-3', 'place-4']
        if (sideViewPlacesId.includes(id)){
            placesContainer.setAttribute('tour', {
                state : 'change-view'
            })
            const skyEl = document.querySelector('#mainContainer')
            skyEl.setAttribute('material',{
                src : `assets/360_images/${selectedItemId}/${id}.jpg`,
                color : 'white'
            })
        } 
        console.log(selectedItemId)
       
        
    }

})