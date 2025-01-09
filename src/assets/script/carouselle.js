/**
 * Permet de rajouter la navigation tactile pour le carousel. Et donc on va instancie une classe carousel et ce ce dernier qui a partir de ces options vera si ce necessaire d'utiliser cette class qui va rajouter la navigation tactile
 */
class CarouselTOuchPlugin{
    /**
     * Description
     * @param {Carousel} carousel //instance de la class carousel
     * @returns {any}
     */
    constructor(Carousel){
        Carousel.element.addEventListener('dragstart', (e) => { e.preventDefault() })
        Carousel.container.addEventListener('dragstart',e=>e.preventDefault())
        //start drag

        Carousel.container.addEventListener('mousedown', this.startDrag.bind(this))
        Carousel.container.addEventListener('touchstart', this.startDrag.bind(this))

        //moving
        window.addEventListener('mousemove', this.drag.bind(this))
        window.addEventListener('touchmove', this.drag.bind(this)) 
        //end of moving
        window.addEventListener('mouseup', this.endDrag.bind(this))
        window.addEventListener('touchend', this.endDrag.bind(this))
        window.addEventListener('touchcancel', this.endDrag.bind(this))
        
        this.Carousel = Carousel
    }
    /**
     * Description : 
     * Demare le deplacement au touché
     * @param {MouseEvent | TouchEvent} e - evenement
     * @returns {any}
     */
    startDrag(e) {   
        if (e.touches) {
            if (e.touches.length > 1) {
                return
            } else {
                e = e.touches[0]
            }
        }
        this.origine = {
            x: e.screenX,
            y: e.screenY
        }
        this.width = this.Carousel.containerWidth;
        this.Carousel.disableTransition(); 
    }
    /**
     * Description : 
     * Deplacement de la souri
     * @param {MouseEvent | TouchEvent} e - evenement
     * @returns {any}
     */
    drag(e) { 
        if (this.origine) { 

            let point = e.touches ? e.touches[0] : e

            let translate = {
                x : point.screenX - this.origine.x,
                y : point.screenY - this.origine.y
            }
            //si on n'est pas en infinie et que l'on est sur le premier ou dernier element on ne dois pas dragger
            if (this.Carousel.options.infinite === false && this.Carousel.currentItems === 0) {
                if (translate.x > 0) {
                    return
                }
            }
            if (this.Carousel.options.infinite === false && this.Carousel.currentItems === ((this.Carousel.items.length - this.Carousel.options.slidesVisible))) {
                if (translate.x < 0) {
                    return
                }
            } 
            if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
                e.preventDefault();
                e.stopPropagation();
            }
            let baseTranslate = (this.Carousel.currentItems * -100)/this.Carousel.items.length

            this.lastTranslate = translate

            this.Carousel.translate(baseTranslate + 100*translate.x / this.width)
        } 
    }
    /**
     * Description : 
     * Quand c'est la fin du deplacement de la souri
     * @param {MouseEvent | TouchEvent} e - evenement
     * @returns {any}
     */
    endDrag(e){ 
        //lastTranslate   
        if (this.origine && this.lastTranslate) {
            this.Carousel.enableTransition()
            let dragEcart = Math.abs(this.lastTranslate.x / this.Carousel.carouselWidth) 
            if ( dragEcart > 0.2) {
                if (this.lastTranslate.x < 0) {
                    this.Carousel.next()
                }else{
                    this.Carousel.prev()
                }
            }else{
                this.Carousel.gotoItem(this.Carousel.currentItems) 
            } 
            this.Carousel.isDragging = dragEcart > 0.1 ? true : false;  
        }
        this.lastTranslate = null
        this.origine = null
    }
}

class Carousel{
    /**
     * Ce callback
     * @callback moveCallback
     * @param {number} index 
     */
    /**
     * Description
     * @param {HTMLElement} element
     * @param {Object} options={}
     * @param {string} [options.slidesToScroll = 1] - nombre d'element a faire defiler
     * @param {String} [options.slidesVisible = 1] - nombre d'element visible dans un slide
     * @param {boolean} [options.loop = false] - dois-t on boucler en fin de carousel? 
     * @param {boolean} [options.pagination = false] - dois-t on afficher la pagination ou pas? 
     * @param {boolean} [options.navigation = true] - pour afficher ou pas les fleches de navigations 
     * @param {boolean} [options.infinite = false] - Pour rendre le carousel scrolable a l'infinie ou pas 
     * @param {boolean} [options.touch = false] - Supporter le touch ou pas
     * @param {boolean} [options.showOthers = false] - afficher les autres element en dehors des slidesVisibles
     * @returns {any}
     */
    constructor(element,options = {}){
        this.element = element;
        this.options = Object.assign({},{
            //options par defaut
            slidesVisible : 1,
            slidesToScroll : 1,
            loop : false,
            pagination : false,
            navigation : true,
            infinite : false,
            touch : false,
            responsive : true,
            showOthers : false
        },options);
        if (this.options.loop && this.options.infinite) {
            alert("un carousel ne peut être a la fois en boucle et a l\'infinie, mettez l'option loup ou infinite a false")
            throw new Error("un carousel ne peut être a la fois en boucle et a l\'infinie, mettez l'option loup ou infinite a false")
        }
        this.isDragging = false;
        let children = [].slice.call(element.children) 
        this.isMobile = false
        this.currentItems = 0; 
        this.moveCallbacks = []; 
        this.offset = 0;

        this.root = this.createDivWithClass('carousele')
        this.root.setAttribute('tabindex','0')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)

        

        this.items =children.map(child => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child) 
            return item
        });
        if (this.options.infinite) {
            //this.offset = this.options.slidesVisible * 2;
            this.offset = this.options.slidesVisible + this.options.slidesToScroll;
            this.items = [
                ...this.items.slice(this.items.length - this.offset).map(item =>item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item =>item.cloneNode(true))
            ]   
           this.gotoItem(this.offset,false)
        }
        this.items.forEach(item=>this.container.appendChild(item))
        
       
        this.setStyle()
        if (this.options.navigation) {
            this.createNavigation();
        }
        if (this.options.pagination) { 
            this.createPagination();
        }
        //evenement

        this.moveCallbacks.forEach(cb=>cb(this.currentItems))
        this.onWindowResize();
        window.addEventListener('resize',this.onWindowResize.bind(this))
        this.root.addEventListener('keyup',e=>{
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next();
            }else if(e.key === 'ArrowLeft' || e.key === 'Left'){
                this.prev();
            }
        })
        if (this.options.infinite) {
            this.container.addEventListener('transitionend',this.resetInfinit.bind(this))
        }
        //plugins
        if (this.options.touch) {
            new CarouselTOuchPlugin(this)
        }
    }
    /**
     * Description
     * @param {string} className - nom de la class a donné au div créé
     * @returns {HTMLElement}
     */
    createDivWithClass(className){
        let div = document.createElement('div');
        div.setAttribute('class',className);
        return div
    }

    disableTransition(){
        this.container.style.transition = 'none';
    }
    enableTransition(){
        this.container.style.transition = '';
    }
    /**
     * Description : 
     * Applique les bonnes dimensions aux elements du carousel
     * @returns {any}
     */
    setStyle(){ 
        let ration = this.items.length /this.slidesVisible  
        if (!this.options.showOthers) {        
            this.container.style.width = ration * 100 +'%';
            this.items.forEach(item => {
                item.style.width=((100/this.slidesVisible)/ration)+ "%"
            });
        }else{ 
            //le -1 est pour eviter les erreur de responsive, autant mieux que le container aie une grande largeur que d'en avoir pas assez
            let surplus = this.slidesVisible < 2 ? this.slidesVisible : this.slidesVisible - 1
            this.container.style.width = ((this.items.length * 100) / surplus ) + '%';
        }

    }

    /**
     * Description : 
     * Cree les deux fleches pour naviger sur le carousel
     * @returns {any}
     */
    createNavigation(){
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click',this.next.bind(this))
        prevButton.addEventListener('click',this.prev.bind(this))
        if (this.options.loop === true) {
            return
        }
        this.onMove(index=>{
            if(index===0){
                prevButton.classList.add('carousel__prev--hidden')
            }else{
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.items[this.currentItems + this.slidesVisible] === undefined ) {
                nextButton.classList.add('carousel__next--hidden')
            }else{
                nextButton.classList.remove('carousel__next--hidden')
            }
        })
    }
    /**
     * Description : 
     * Cree le point pour montre la pagination c'est a dire l'item sur le quel on est
     * @returns {any}
     */
    createPagination(){
        let pagination = this.createDivWithClass('carousel__pagination')
        let buttons = [];
        this.root.appendChild(pagination)
        let itemsLength = this.items.length - 2*this.offset
        for (let i = 0; i < itemsLength; i = i + this.options.slidesToScroll) {
            let button = this.createDivWithClass('carousel__pagination__button')
            button.addEventListener('click',()=>this.gotoItem(i + this.offset))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index=>{
            let activeButton = buttons[Math.floor(((index -this.offset)%itemsLength) /this.options.slidesToScroll)]
            if (activeButton) {
                buttons.forEach(button=> button.classList.remove('carousel__pagination__button--active'))
                activeButton.classList.add('carousel__pagination__button--active')
            } 
        })
    }
    /**
     * Description : 
     * Fait une transformation sur le container en pourcentage passé dans son paramettre
     * @param {number} persent -pourcentage
     * @returns {any}
     */
    translate(persent){
        this.container.style.transform='translate3d('+persent+'%,0,0)';
    }
    next(){  
        this.gotoItem(this.currentItems + this.slidesToScroll)    
    }
    prev(){
        this.gotoItem(this.currentItems - this.slidesToScroll)
    }
    /**
     * Description : 
     * Deplace le carousel vers l'element ciblé
     * @param {number} index - numero de l'element ciblé qui doit etre visible
     * @param {boolean} [animation = true ] - dois ou pas faire de transition sur les transforms
     * @returns {any}
     */
    gotoItem(index,animation = true){   
        index = parseInt(index) 
        if (index < 0) {
            if(this.options.loop){
                index  = this.items.length - this.slidesVisible
            }else{
                return
            }
            //si l'index est suoerieur aux nbr des items ou si 
        }else if(index >= this.items.length || (this.items[parseInt(this.currentItems) + parseInt(this.slidesVisible)] === undefined && index > this.currentItems) ){
            if(this.options.loop){ 
                index = 0
            }else{
                return
            }
        }

        let translateX = index * -100/ this.items.length;
        if (this.options.showOthers) {
            translateX = index * ((this.items[0].offsetWidth * -100) / this.containerWidth   )
        }
        if (animation === false) {
            this.disableTransition(); 
        } 

         // un item === combien de % du container ?? 
         
        this.translate(translateX);


        /*On recuper ce offsetHeight ci dessous, meme si ça ne va pas nous servir juste pour obliger le navigateur a reconstruire l'element et au final de ne pas mettre une animation si animation=false*/
        this.container.offsetHeight 
        if (animation === false) {
            this.enableTransition();
        }
        this.currentItems = index; 
        this.moveCallbacks.forEach(cb=>cb(index)) 
    }
    /**
     * Elle va Deplacer le container pour donner l'impression d'un slide infinie
     */
    resetInfinit(){
        /**
         * 1 2 3 4 5 6 7 
         * 3 4 5 6 7  | 1 2 3 4 5 6 7 | 1 2 3 4 5
         */
        if (this.currentItems <= this.options.slidesToScroll) {
            this.gotoItem(this.currentItems + (this.items.length - 2 * this.offset),false)   
        }else if(this.currentItems >= this.items.length-this.offset){
            this.gotoItem(this.currentItems - (this.items.length - 2 * this.offset),false)  
        }
    }
    /**
     * Description
     * @param {moveCallback} clb
     * @returns {any}
     */
    onMove(clb){ 
        this.moveCallbacks.push(clb)
    } 

    onWindowResize(){ 
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle();
            this.moveCallbacks.forEach(cb=>cb(this.currentItems))
        }
    }

     /**
     * Description
     * @param {moveCallback} clb
     * @returns {any}
     */
     changeOption(options){  
        this.options = Object.assign({},this.options,options);
        this.setStyle();
        this.moveCallbacks.forEach(cb=>cb(this.currentItems)) 
    } 
    /**
     * Description
     * @param {HTMLElement} carousel
     * @param {Array} itemsData
     * @returns {any}
     */
    resetItemsData(carousel,itemsData,offset){   
        let container = carousel.querySelector('.carousel__container')
        let children = [].slice.call(container.children)    
        for (let i = offset; i < children.length; i++) {//10 - 20
            if (itemsData[i - offset]) {
                let contenue =  itemsData[i - offset]['contenu'];
                if (itemsData[i - offset]['displayHtml']) {
                    contenue =  itemsData[i - offset]['displayHtml']
                }
                children[i].dataset.carousel_id = i 
                children[i].dataset.id = itemsData[i - offset]['id']
                children[i].innerHTML = contenue;
            }else{  
                children[i].remove()  
                this.items.splice(this.items.length - 1,1)  
                this.setStyle();   
                this.gotoItem(this.currentItems,false)  
            } 
        }  
    }
    /**
     * Description : cette methode s'utilise uniquement dans les cas des shorts, son role est d'ajouter des items bidons
     * qui vont montrer à l'utilisateur qu'il y a chargement, apres lorsque les vrais sont chargé le contenue de ces items
     * bidons serons remplacés par le contenue reçut, celà par d'autres methode
     * @param {HTMLElement} loader 
     * @returns {any}
     */
    addItems(loader){    
        for (let i = 0; i < 10; i++) { 
            let Cloneloader = loader.cloneNode(true)
            let newItem = this.createDivWithClass('carousel__item') 
            newItem.appendChild(Cloneloader)
            this.items.push(newItem)
            this.container.appendChild(newItem) 
        } 
        this.setStyle();   
        this.gotoItem(this.currentItems,false)  
    }
    /**
     * Description : son role sera de recevoir un string html qui reppresente un card ou un items et l'ajouter comme item à la carousel
     * @param {string || array } item : contenue html de l'items à ajouter.il peut egalement prendre un tableau des differents items et va les ajouters à la carousel 
     * @returns {any}
     */
    addVraieItems(item){   
        if (typeof item === 'string') {
            let newItem = this.createDivWithClass('carousel__item') 
            newItem.innerHTML = item
            this.items.push(newItem)
            this.container.appendChild(newItem) 
        }else{
            item.forEach(card => {
                let newItem = this.createDivWithClass('carousel__item') 
                newItem.innerHTML = card
                this.items.push(newItem)
                this.container.appendChild(newItem) 
            })
        } 
        this.setStyle();   
        this.gotoItem(this.currentItems,false)  
    }
    /**
     * Description
     * @returns {number}
     */
    get slidesToScroll(){
        return this.isMobile && this.options.responsive  ? 1:this.options.slidesToScroll
    }
    get slidesVisible(){  
        return this.isMobile && this.options.responsive ? 1:this.options.slidesVisible
    }
    /**
     * Description
     * @returns {number}
     */
    get carouselWidth(){
        return this.root.offsetWidth
    }
    /**
     * Description
     * @returns {number} largeur du container 
     */
    get containerWidth(){
        return this.container.offsetWidth
    }
}
 
export default Carousel;