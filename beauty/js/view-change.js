$(document).ready(function(){
	let h1 = $('.h-s__main-block>h1')
	h1.html(h1.html()+ '<span>< The COSMETICODE /></span>')


    const sections = [...$('section')]
    sections.forEach((section, index) => {
       if(section.getAttribute('data-scroll') !== 'header'){
            section.style.height = 'auto'
       }
    })


    const views = [...$('.view')]
    let clickebl = true
    $('.header-navigation>ul>li>div').on('click', (e)=>{
        clickebl = false
        let choosenView = $(e.target.getAttribute('data')).attr('class').split(' ')[1]

        navigate(e.target)
        if(choosenView !== 'view__visible'){
            if($(window).scrollTop() > 0){
                //then change page
                let elem = changeViewByID(views, e.target.getAttribute('data'), 'slide-up')
                setTimeout(()=>{
                    clickebl = true
                    elem.classList.remove('slide-up')
                }, 800)
            }else{
                let elem = changeViewByID(views, e.target.getAttribute('data'), 'slide-up')
                setTimeout(()=>{
                    clickebl = true
                    elem.classList.remove('slide-up')
                }, 800)
            }
        }
    })

    let scrollEbl = true
    document.querySelector('body').addEventListener('wheel', (e)=>{
        if(scrollEbl){
            if (e.deltaY > 0 && $(window).scrollTop() + $(window).height() === $(document).height()){
                // downscroll code
                scrollEbl = false
                changeViewByOrder(views, 1)
                setTimeout(()=>{
                    scrollEbl = true
                    $('body').css('overflow-y', 'scroll')
                }, 800)
            } else if(e.deltaY < 0 && !$(window).scrollTop()){
               // upscroll code
               scrollEbl = false
               changeViewByOrder(views, -1)
               setTimeout(()=>{
                    scrollEbl = true
               }, 800)
            } 
        }
    })
    
    // methods -----------------------------
    function navigate(target){
        const links = [...$('.header-navigation>ul>li>div')]
        links.forEach(link =>{
            link.classList.remove('active')
            target.classList.add('active')
        })
    }
    function changeViewByID(views, id, animation){
        let elem = null
        let v = null

        if(animation === 'slide-up'){
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 0);
        }

        views.forEach((view, index) => {
            if([...view.classList].find(elem => elem === 'view__visible') === 'view__visible'){
                view.classList.remove('view__visible')
                if(animation === 'slide-up'){
                    view.classList.add('temporary-visible')
                }
                v = view
            }
            if('#'+view.id === id){
                view.classList.add('view__visible')
                if(animation === 'slide-down'){
                    view.classList.add('fade-in')
                }else{
                    view.classList.add(animation)
                }
                elem = view
                i = index

                if(view.id !== 'header-section'){
                    $('#headerId').addClass('black-nav')
                }else{
                    $('#headerId').removeClass('black-nav') 
                }
            }
        })

        if(animation === 'slide-up'){
            v.classList.add('fade-out') 
            setTimeout(()=>{
                v.classList.remove('fade-out')
                v.classList.remove('temporary-visible')
            }, 800)
        }else{
            $("html, body").animate({ scrollTop: $(document).height() }, 800);
            v.classList.add('slide-down') 
            setTimeout(()=>{
                v.classList.remove('slide-down')
                v.classList.remove('temporary-visible')
            }, 800)
        }

        return elem
    }
    function changeViewByOrder(views, direction){
        for(let i = 0; i < views.length; i++){
            if([...views[i].classList].find(elem => elem === 'view__visible') === 'view__visible'){
                if(direction > 0 && i < views.length-1){
                    let id = '#'+views[i+1].id
                    navigate($(`div[data="${id}"]`)[0])
                    let elem = changeViewByID(views, id, 'slide-up')
                    setTimeout(()=>{
                        elem.classList.remove('slide-up')
                        elem.classList.remove('fade-in')
                    }, 800)
                }
                if(direction < 0 && i > 0){
                    let id = '#'+views[i-1].id
                    navigate($(`div[data="${id}"]`)[0])
                    let elem = changeViewByID(views, id, 'slide-down')
                    setTimeout(()=>{
                        elem.classList.remove('slide-down')
                        elem.classList.remove('fade-in')
                    }, 800)
                }

                return
            }
        }
    }
})
