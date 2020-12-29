import './app3.css'
import $ from 'jquery'

const $square=$('#app3 .square')

$square.on('click',()=>{
    $square.toggleClass('active')
    //class没有的时候添加，有的时候删去
})