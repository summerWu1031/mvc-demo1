import $ from 'jquery'
import './app2.css'

const $tabBar = $('#app2 .bar-tab')
const $tabContent =$('#app2 .bar-content')

$tabBar.on('click','li',(e)=>{
    const $li = $(e.currentTarget)
    $li
        .addClass('selected')
        .siblings()
        .removeClass('selected')
    const index = $li.index()

    $tabContent
        .children()
        .eq(index)
        .addClass('active')
        .siblings()
        .removeClass('active')

})

$tabBar
    .children()
    .eq(0)
    .trigger('click')