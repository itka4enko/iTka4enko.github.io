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
                //scroll top
                $('html, body').animate({
                    scrollTop: $('body').offset().top
                }, 300);
                //then change page
                setTimeout(()=>{
                    let elem = changeViewByID(views, e.target.getAttribute('data'), 'slide-up')
                    setTimeout(()=>{
                        clickebl = true
                        elem.classList.remove('slide-up')
                    }, 800)
                }, 300)
            }else{
                let elem = changeViewByID(views, e.target.getAttribute('data'), 'slide-up')
                setTimeout(()=>{
                    clickebl = true
                    elem.classList.remove('slide-up')
                }, 800)
            }
        }
    })

    // let lastScrollTop = 0;
    // $(window).on('scroll', ()=>{
    //     let st = $(this).scrollTop();

    //     if($(window).scrollTop() + $(window).height() == $(document).height()){
    //         if (st > lastScrollTop){
    //             // downscroll code
    //             changeViewByOrder(views, 1)
    //         } else {
    //            // upscroll code
    //            changeViewByOrder(views, -1)
    //         } 
    //     }

    //     lastScrollTop = st;
    // })
    
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

        views.forEach((view, index) => {
            if(view.classList[1] === 'view__visible'){
                view.classList.remove('view__visible')
                view.classList.add('temporary-visible')
                v = view
            }
            if('#'+view.id === id){
                view.classList.add('view__visible')
                view.classList.add(animation)
                elem = view
                i = index
            }
        })

        v.classList.add('fade-out')
        setTimeout(()=>{
            v.classList.remove('fade-out')
            v.classList.remove('temporary-visible')
        }, 800)

        return elem
    }
    // function changeViewByOrder(views, direction){
    //     let index = null

    //     views.forEach((view, i) => {
    //         if(view.classList[1] === 'view__visible'){
    //             index = i
    //         }
    //         view.classList.remove('view__visible')
    //     })

    //     if(direction > 0 && index < views.length-1){
    //         views[index+1].classList.add('view__visible')
    //     }
    //     if(direction > 0 && index > views.length-1){
    //         views[index-1].classList.add('view__visible')
    //     }
    // }
})
